# DietPi on Raspberry Pi 5

## `config.txt`

```shell
vi /boot/config.txt
```

```sh
# from https://www.waveshare.com/wiki/9.3inch_1600x600_LCD
hdmi_group=2
hdmi_mode=87
hdmi_cvt=1600 600 60 6 0 0 0

# improve GPU mem
gpu_mem_256=256
gpu_mem_512=256
gpu_mem_1024=256

arm_64bit=1
dtoverlay=vc4-kms-v3d

# to deliver enouth current to display
max_usb_current=1
usb_max_current_enable=1 # for rpi 5

# In order to use `ddcutil` with `i2c` add: 
dtparam=i2c2_iknowwhatimdoing
```

## `chromium-autostart.sh`

```shell
vim /var/lib/dietpi/dietpi-software/installed/chromium-autostart.sh
```

[chromium-autostart.sh](.dietpi/chromium-autostart.sh)

## Misc

### Timezone

```shell
# show TZ
date +%Z

# set new TZ
timedatectl set-timezone Europe/Paris
```

## Manage display screen

[ddcutil.md](ddcutil.md)

## Nightly Chromium restart (watchdog)

Chromium runs unsupervised from boot with no process manager restarting it, and its rendering gets janky the longer the session has been up. Until the root causes are all fixed app-side, force a clean nightly restart via cron so the kiosk self-heals daily instead of degrading indefinitely. DietPi's autostart (the `startx`/`xinit` wrapper running `chromium-autostart.sh`) automatically respawns Chromium when the process dies, so simply killing it is enough.

```shell
crontab -e
```

```cron
# restart the kiosk browser every night at 4am so it doesn't degrade over long uptimes
0 4 * * * pkill -f chromium
```
