# Firefox Kiosk (alternative à Chromium)

⚠️ Testé suite à des problèmes de fluidité/glitchs avec Chromium en mode kiosk sur RPi 5 + écran Waveshare 9.3". Résultat : légèrement mieux mais pas de miracle — le goulot semble plus côté rendu de l'app Nuxt (scroll, CSS) que côté navigateur/GPU pur (validé avec une démo WebGL indépendante, ~48fps stable avec 500 objets animés).

## Pourquoi tester Firefox

Chromium en kiosk sur ce setup ramait / glitchait malgré les flags GPU (`--use-gl=egl`, `--enable-gpu-rasterization`, etc.). Firefox-ESR est disponible nativement en arm64 sur Debian/DietPi et permet une comparaison rapide sans changer le reste du stack.

## Installation

Firefox-ESR est en général déjà présent sur DietPi (paquet Debian bookworm) :

```bash
which firefox-esr
apt-cache policy firefox-esr
```

Sinon :

```bash
sudo apt-get update && sudo apt-get install -y firefox-esr
```

## Policies (équivalent des flags Chromium `--no-first-run`, `--disable-component-update`, etc.)

⚠️ Point important : sur le paquet **firefox-esr** de Debian, le fichier de policies **n'est pas** lu depuis `/etc/firefox/policies/policies.json` (ça c'est pour le paquet Mozilla générique `firefox`). Il faut le placer dans le dossier de distribution du paquet ESR :

```bash
sudo mkdir -p /usr/lib/firefox-esr/distribution
sudo nano /usr/lib/firefox-esr/distribution/policies.json
```

Contenu :

```json
{
  "policies": {
    "DisableAppUpdate": true,
    "DisableTelemetry": true,
    "DisableFirefoxStudies": true,
    "DisablePocket": true,
    "DisableFeedbackCommands": true,
    "DontCheckDefaultBrowser": true,
    "NoDefaultBookmarks": true,
    "OverrideFirstRunPage": "",
    "OverridePostUpdatePage": "",
    "DisableProfileImport": true,
    "DisableSetDesktopBackground": true,
    "DisableFormHistory": true,
    "PasswordManagerEnabled": false,
    "UserMessaging": {
      "ExtensionRecommendations": false,
      "FeatureRecommendations": false,
      "WhatsNew": false
    }
  }
}
```

Vérifier que le paquet ne fournit pas déjà un symlink vers `/etc/firefox/` avant de dupliquer inutilement :
```bash
ls -la /usr/lib/firefox-esr/distribution/
```

## `chromium-autostart.sh` adapté

Le script d'autostart DietPi (`/var/lib/dietpi/dietpi-software/installed/chromium-autostart.sh`) est câblé au boot via l'autologin sur `tty1` + `dietpi-autostart`. Le plus simple pour tester est d'éditer ce même fichier en place (en gardant une sauvegarde) plutôt que de re-router le mécanisme DietPi.

Sauvegarde d'abord :
```bash
sudo cp /var/lib/dietpi/dietpi-software/installed/chromium-autostart.sh \
        /var/lib/dietpi/dietpi-software/installed/chromium-autostart.sh.bak
```

Contenu adapté pour Firefox :

```bash
#!/bin/bash
# Autostart script for kiosk mode — Firefox variant, adapted from the original Chromium autostart

# Home page
URL=$(sed -n '/^[[:blank:]]*SOFTWARE_CHROMIUM_AUTOSTART_URL=/{s/^[^=]*=//p;q}' /boot/dietpi.txt)

FP_FIREFOX=$(command -v firefox-esr)
[ "$FP_FIREFOX" ] || FP_FIREFOX=$(command -v firefox)

# Use "startx" as non-root user to get required permissions via systemd-logind
STARTX='xinit'
[ "$USER" = 'root' ] || STARTX='startx'

/root/display-control &
# python3 /root/button-listener.py &
exec "$STARTX" "$FP_FIREFOX" --kiosk "${URL:-https://dietpi.com/}" -- -nocursor
```

`-nocursor` est un paramètre X (passé après `--`), pas un flag navigateur — il s'applique donc pareil avec Firefox qu'avec Chromium.

## Revenir à Chromium

```bash
sudo cp /var/lib/dietpi/dietpi-software/installed/chromium-autostart.sh.bak \
        /var/lib/dietpi/dietpi-software/installed/chromium-autostart.sh
sudo reboot
```

## Debug / tests manuels en kiosk via SSH

Le mode kiosk tourne sur `tty1` via autologin — pour tester manuellement en SSH sans reboot complet, il faut libérer ce VT :

```bash
# libère le VT1 (occupé par le getty autologin DietPi)
sudo systemctl stop getty@tty1

# tue le kiosk en cours si besoin
sudo pkill -f firefox   # ou chromium

# lance un test manuel
sudo openvt -c 1 -s -w -f -- startx /usr/bin/firefox-esr --kiosk "URL_ICI" -- -nocursor
```

⚠️ Ne pas oublier de réactiver le getty après les tests, sinon plus d'autostart au prochain boot :
```bash
sudo systemctl start getty@tty1
```

Pour checker que le GPU (V3D sur RPi5) est bien utilisé par X/Mesa (indépendamment du navigateur) :
```bash
sudo apt-get install -y mesa-utils
sudo XAUTHORITY=/root/.Xauthority DISPLAY=:0 glxinfo | grep -i "renderer\|direct rendering"
# attendu : "direct rendering: Yes" + "OpenGL renderer string: V3D x.x.x.x"
```

## Fix WiFi power-save (coupures SSH intermittentes)

Sans rapport direct avec le kiosk, mais rencontré pendant ces tests : le power-save WiFi du RPi5 peut couper les connexions SSH par intermittence.

```bash
sudo apt-get install -y iw   # généralement déjà présent
sudo iw dev wlan0 set power_save off
```

Rendre permanent avec un service systemd :

```bash
sudo tee /etc/systemd/system/wifi-powersave-off.service > /dev/null <<'EOF'
[Unit]
Description=Disable WiFi power save
After=network.target

[Service]
Type=oneshot
ExecStart=/usr/sbin/iw dev wlan0 set power_save off

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable --now wifi-powersave-off.service
```

## Conclusion (à date)

- Le rendu GPU brut (WebGL) est correct sous Firefox sur ce setup (~48fps, 500 objets animés).
- Le scroll de l'app Nuxt reste perfectible sous Firefox comme sous Chromium — le goulot d'étranglement semble donc plus probablement côté app (CSS coûteux, re-renders liés au websocket) que côté choix de navigateur.
- Pistes non explorées à ce stade : profiling `about:processes` / devtools distant pendant le scroll, `contain`/`will-change` CSS, fréquence des updates websocket.
