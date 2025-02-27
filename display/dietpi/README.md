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
