FROM mcr.microsoft.com/devcontainers/javascript-node:20

WORKDIR /app

ENV PNPM_HOME=/app/pnpm
# RUN corepack enable pnpm

COPY pnpm-lock.yaml ./

# optional: only needed if you've patched any packages
# COPY patches patches    

# pre-loads required packages from pnpm-lock.yaml into the store,
# ready to be installed with `pnpm install`
RUN pnpm fetch