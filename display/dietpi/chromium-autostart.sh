#!/bin/bash
# Autostart script for kiosk mode, based on @AYapejian: https://github.com/MichaIng/DietPi/issues/1737#issue-318697621

# Command line switches: https://peter.sh/experiments/chromium-command-line-switches/
# - Review and add custom flags in: /etc/chromium.d

# If you want tablet mode, uncomment the next line.
#CHROMIUM_OPTS="$CHROMIUM_OPTS --force-tablet-mode --tablet-ui"

CHROMIUM_OPTS=(
  --kiosk  # Mode kiosque plein écran
  --window-size=1600,600  # Taille adaptée à ton écran
  --window-position=0,0  # Position à l'origine
  --noerrdialogs  # Désactiver les boîtes de dialogue d'erreur
  --disable-infobars  # Supprimer les infobars
  --disable-translate  # Désactiver la traduction
  --disable-pinch  # Désactiver le zoom tactile (inutile en kiosque)
  --overscroll-history-navigation=0  # Désactiver le swipe back/forward
  --no-first-run  # Ignorer la configuration initiale
  --disable-notifications  # Désactiver les notifications
  --disable-crash-reporter  # Désactiver les rapports de crash
  --disable-domain-reliability  # Désactiver les rapports de fiabilité (inutile en kiosque)
  --disable-renderer-backgrounding  # Forcer les processus de rendu à rester actifs
  --disable-component-update  # Désactiver les mises à jour automatiques
  --disable-sync  # Désactiver la synchronisation
  --disable-default-apps  # Désactiver les applications Chromium par défaut
  --disable-extensions  # Désactiver les extensions (inutile en kiosque)
  --disable-hang-monitor  # Empêcher les alertes de processus bloqués
  --no-crash-upload
  --disable-breakpad
  --incognito
  --fast
  --fast-start
  --disk-cache-dir=/dev/null  # Désactiver le cache disque
  --disk-cache-size=1  # Réduire la taille du cache au minimum
  --password-store=basic  # Stockage simple des mots de passe (évite les popups)
  --start-fullscreen
  --hide-scrollbars
  --ignore-gpu-blocklist  # Activer l'accélération GPU même si elle est bloquée par Chromium
  --use-gl=egl  # Forcer OpenGL avec EGL
  --enable-gpu-rasterization  # Activer la rasterisation GPU pour les images
  #--enable-smooth-scrolling  # Améliorer le scrolling fluide
  --enable-gpu
  --force-tablet-mode  # Mode tablette forcé (pour le tactile)
  --tablet-ui  # Interface optimisée pour tablettes
  --disable-gpu-vsync  # Désactiver la synchronisation verticale (peut aider sur le tearing)
  --disable-frame-rate-limit  # Désactiver la limite de FPS
        )

# Home page
URL=$(sed -n '/^[[:blank:]]*SOFTWARE_CHROMIUM_AUTOSTART_URL=/{s/^[^=]*=//p;q}' /boot/dietpi.txt)

# RPi or Debian Chromium package
FP_CHROMIUM=$(command -v chromium-browser)
[ "$FP_CHROMIUM" ] || FP_CHROMIUM=$(command -v chromium)

# Use "startx" as non-root user to get required permissions via systemd-logind
STARTX='xinit'
[ "$USER" = 'root' ] || STARTX='startx'

#/root/display-api &
exec "$STARTX" "$FP_CHROMIUM" ${CHROMIUM_OPTS[@]} "${URL:-https://dietpi.com/}" -- -nocursor
