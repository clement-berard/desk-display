# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

desk-display is a DIY touchscreen dashboard: a Raspberry Pi 5 driving a Waveshare 9.3" display, running a Nuxt app in Chromium kiosk mode, that surfaces Home Assistant / Node-RED / NocoDB data (weather, lights, radios, media player) and can control the screen's power/brightness via I2C (`ddcutil`).

The repo has three independent parts:
- `frontend/` — the Nuxt 4 app (the only part with an automated build/lint/test pipeline; this is almost always where changes happen)
- `display/api/` — a small Go HTTP API (`display-control.go`) run on the Pi that shells out to `ddcutil` to set brightness/standby, plus a Python script (`button-listener.py`) that watches a GPIO button and calls that API
- `display/dietpi/`, `display/esphome/`, `display/3d-model/` — OS setup notes, ESPHome config, and 3D-printable stand files for the physical build; not code that gets built/tested

## Commands (run from `frontend/`)

```bash
pnpm install
pnpm dev              # nuxt dev (TMPDIR=/tmp)
pnpm build            # nuxt build
pnpm lint:ci          # biome ci — what CI runs (.github/workflows/test.yml)
pnpm lint:check        # biome check
pnpm lint              # biome lint
pnpm format             # biome format
pnpm deploy:nas        # scp ./.output/* to the NAS Docker host
pnpm b-and-d            # build then deploy:nas
```

There is no test suite/runner configured. CI (`static-checks-frontend`) only runs `pnpm lint:ci` then `pnpm build`.

For the Go API (`display/api/`), cross-compile for the Pi:
```bash
GOOS=linux GOARCH=arm64 go build -o display-control display-control.go
```

## Architecture

### Data flow
Home Assistant, NocoDB, and other home-lab services sit behind **Node-RED**, which is the frontend's single integration point for both pushing commands and streaming state:
- Outbound commands go through Nuxt server routes (`server/api/**`) which call provider clients in `core/providers/` (`ha-api.ts`, `node-red.ts`, `noco-db.ts` — thin `ky` instances configured from env vars) via service functions in `core/services/`.
- Inbound state arrives over a **raw WebSocket to Node-RED** (`VITE_NODE_RED_WS_URL`, connected client-side in `composables/useWsNodeRed.ts` / `services/ws/node-red-ws.services.ts`). Every message is `{ key, value }`; `useWsNodeRedStore` (a persisted Pinia store) keeps the latest value per key in `dataWsNodeRed`, typed by the `WsNodeRedKeys` map in `stores/wsNodeRedStore.ts`. `node-red-ws-matcher.services.ts` transforms/routes values by key before they're stored. Components read live state via `storeToRefs(useWsNodeRedStore())`, not by calling Node-RED directly.
- Physical display control (brightness/standby/on) is a separate path: `services/display/display.services.ts` hits the Nuxt server route `server/api/node-red/desk-display-api.ts`, which forwards an `action_hard_display` command through Node-RED to the Go API on the Pi (`display/api/display-control.go`), which runs `ddcutil` over I2C.

### Screen/idle state machine
`stores/displayStore.ts` owns whether the display shows the main UI or the idle screen, driven by two `@vueuse/core` `useIdle` timers (short → dim, medium → standby) combined with flags pushed from Node-RED (`desk_display_config.prevent_standby`, `force_low_brightness`, `force_brightness_nightshift`, `button_reset_standby`). `APP_CONFIG.FORCE_IDLE_MODE` in `config.ts` can force idle mode for local testing regardless of idle state.

### Panel/UI system
The on-screen navigation is a custom entity model in `core/entities/UI/` (`Panels` → `Panel` → `Page`/`PageItem`), not Nuxt pages/routing. `composables/Panels/useInitPanels.ts` builds the panel group from `useRadiosPanel`, `useLightsPanel`, `useMiscPanel` composables at layout mount (`layouts/screen.vue`); `globalStore.currentPanel` tracks which one is active, rendered by `components/UI-Panel/UI-Panel.vue`. `pages/screen.vue` (the kiosk view, `layout: 'screen'`) is the real app entry; `pages/desktop.vue`/`components/Screens/Desktop/*` is a secondary non-kiosk view.

### Explicit imports — no auto-import
`nuxt.config.ts` sets `imports.autoImport: false`. Nuxt/Vue APIs (`ref`, `computed`, `defineStore`, `defineEventHandler`, `useXStore`, etc.) must be imported explicitly from `#imports` (Nuxt's virtual auto-import module) rather than relied on implicitly — see any file under `pages/`, `stores/`, or `server/api/` for the pattern. This is a deliberate deviation from Nuxt's default; don't "fix" missing imports by re-enabling auto-import.

### shadcn-vue / ui components
`components/ui/**` is shadcn-vue-generated (style `new-york`, no prefix, `components.json` config) and excluded from Biome linting — treat it as vendored, edit sparingly, and prefer regenerating via the shadcn-vue CLI over hand-editing when possible.

### Env vars (`frontend/.env`, see `.env.dist` for the full list)
`HA_API_TOKEN`, `HA_BASE_API_URL` (Home Assistant), `NOCODB_API_TOKEN`, `NOCODB_API_URL`, `NOCODB_URL`, `NOCODB_DB_DESK_DISPLAY`, `NODE_RED_API_PREFIX_URL`, `VITE_LOCAL_API_STATIC_SERVER`, `VITE_NODE_RED_WS_URL`. Server-only vars are read via `process.env`; client-visible ones are prefixed `VITE_`.

### Frame layout constants
The physical display is a fixed 1600×600 canvas; `constants/app.constants.ts` derives header/body/side-content/side-footer pixel heights as percentages of that frame and is used throughout layout components instead of relative/responsive units — the UI is designed for exactly this screen, not to be responsive.
