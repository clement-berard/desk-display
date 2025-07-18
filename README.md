# desk-display

⚠️ WIP Project

<img src="https://m.media-amazon.com/images/I/615R1XOqbkL._AC_SL1500_.jpg" height="400px">

## Goals

My project is to create a customizable DIY tablet that meets my specific needs. 

It will be more versatile than a typical stream deck, featuring a larger touchscreen for improved usability. The goal is to design a device where I can integrate whatever tools or functions I want, tailored to my workflow.

Additionally, I'll be repurposing a Raspberry Pi that's been sitting unused in my drawer, making the project both practical and sustainable.

## Materials

- [Waveshare 9.3inch Capacitive Touch Display](https://www.waveshare.com/product/raspberry-pi/displays/lcd-oled/9.3inch-1600x600-lcd.htm)
- [Wiki Waveshare 9.3inch](https://www.waveshare.com/wiki/9.3inch_1600x600_LCD#Resource)
- ~~[RaspberryPi 3B](https://www.raspberrypi.com/products/raspberry-pi-3-model-b/)~~ (too old, bad performance)
- [RaspberryPi 5 4GB](https://www.raspberrypi.com/products/raspberry-pi-5/)
- [Support / Stand 3D Model](https://www.thingiverse.com/thing:6439195)


## Stack

- Nuxt 3
- Node-RED
- Home Assistant
- PocketBase
- NocoDB
- Golang / Python
- ...

## Communication

### Architecture
```mermaid
graph TD
    classDef nuxtStyle fill:#90EE90,color:#000
    classDef displayStyle fill:#FFFFE0,color:#000
    classDef rpiStyle fill:#FFFFE0,color:#000

    subgraph Display["📺 Display"]
        WD["🖥️ Waveshare display<br/><a href='https://www.waveshare.com/product/raspberry-pi/displays/lcd-oled/9.3inch-1600x600-lcd.htm'>Waveshare 9.3inch</a>"]:::displayStyle
        
        subgraph RPI5["Raspberry Pi 5"]
            DI2C["golang API to manage I2C"]:::rpiStyle
            GPIO["python to manage GPIO"]:::rpiStyle
            NCK["Nuxt App on Chromium Kiosk Mode"]:::nuxtStyle
        end
    end

    RPI5 -->|"I2C"| WD
```

```mermaid
graph TD
%% Styling
    classDef nodeRedStyle fill:#8B4513,color:#fff
    classDef nuxtStyle fill:#90EE90,color:#000

%% Main components
    subgraph Homelab["🏠 Homelab"]
        HA["Home Assistant"]
        DB["NocoDb / Pocket DB"]
        Other["Other services..."]
    end

    NR["node-red"]:::nodeRedStyle
    ND["Nuxt App on Docker"]:::nuxtStyle

    Homelab <-->|"/api"| NR
    ND -->|"/api"| NR
    NR -->|"/web socket"| ND
```

There is a small API written in Golang running on a Raspberry Pi using the DietPi OS.

This API is designed to execute commands to control the screen, leveraging tools like ddcutil.

It allows for tasks such as adjusting the screen brightness or turning the screen off. [See this file](docs/ddcutil.md)

Additionally, this API serves as a bridge to integrate with tools like Node-RED, enabling seamless integration into automation scenarios.

## Docs

- [DietPi](display/dietpi/README.md)
- [Display Api's](display/api/README.md)
- [3D models](display/3d-model/README.md)
- [Frontend Nuxt](frontend/README.md)

## Photos

![IMG_8459.JPG](docs/photos/IMG_8459.JPG)
![IMG_8468.JPG](docs/photos/IMG_8468.JPG)
![IMG_8556.JPG](docs/photos/IMG_8556.JPG)
![IMG_8782.JPG](docs/photos/IMG_8782.JPG)
![IMG_8478.JPG](docs/photos/IMG_8478.JPG)

