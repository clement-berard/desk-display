### **README - Raspberry Pi 5 GPIO and Display Control**

This project consists of **two separate scripts**:
- **A Go server** (`display-control.go`) that provides an **HTTP API** to control a monitor's brightness and power using `ddcutil`.
- **A Python script** (`button-listener.py`) that **detects button presses on GPIO4** and sends an HTTP request.

---

## **📌 1. Go Server - Display Control**
### **📄 File: `display-control.go`**
This Go application runs a **REST API server** on port **3030**, allowing control of a monitor via `ddcutil`.

### **🔧 Features**
- `GET /api/low-brightness` → Sets monitor brightness to **0%**.
- `GET /api/standby` → Puts the monitor into **standby mode**.
- `GET /api/on` → Turns the monitor **on** and sets brightness to **50%**.

### **🚀 Setup & Execution**
#### **1. Install Dependencies**
Ensure `ddcutil` is installed:
```sh
sudo apt update
sudo apt install -y ddcutil
```

#### **2. Compile and Run**
```sh
go build -o display-control display-control.go
sudo ./display-control
```

#### **3. Test API Endpoints**
```sh
curl http://localhost:3030/api/low-brightness
curl http://localhost:3030/api/standby
curl http://localhost:3030/api/on
```

---

## **📌 2. Python Script - Button Listener**
### **📄 File: `button-listener.py`**
This Python script **monitors GPIO4** on **Raspberry Pi 5** and sends an HTTP request when the button is pressed.

### **🔧 Features**
- Listens for **button presses** on GPIO4.
- **Sends an HTTP request** to `http://base-api.com/api/test-btn` when pressed.
- **Prevents duplicate detections** with **debounce logic**.

### **🚀 Setup & Execution**
#### **1. Install Dependencies**
```sh
sudo apt update
sudo apt install -y python3-libgpiod python3-requests
```

#### **2. Run the script**
```sh
sudo python3 button-listener.py
```

#### **3. Press the button**
- Each press should trigger:
  ```sh
  🔘 Button detected! Sending API request...
  ✅ API Response: 200
  ```
- **Test manually** if the GPIO is responding:
  ```sh
  gpioget gpiochip0 4
  ```
    - `1` = **Button not pressed**
    - `0` = **Button pressed**

---

## **📌 Debugging & Troubleshooting**
### **🛠️ 1. Check if GPIO is detected**
```sh
gpiodetect
```
Expected output:
```
gpiochip0 [pinctrl-rp1] (54 lines)
```

### **🛠️ 2. Test GPIO4 manually**
```sh
gpioget gpiochip0 4
```
- If the button **does not change values (`1` → `0`)**, check wiring.

### **🛠️ 3. Set GPIO4 as input manually**
```sh
gpioset gpiochip0 4=0
```

### **🛠️ 4. Ensure user has GPIO access**
If running without `sudo` fails, add your user to the `gpio` group:
```sh
sudo usermod -aG gpio $(whoami)
```
Then **log out and log back in**.

---

## **📌 Summary**
| **Function**          | **Language** | **Purpose** |
|----------------------|-------------|-------------|
| `display-control.go`  | Go          | API to control monitor (brightness, standby, on/off) |
| `button-listener.py`  | Python      | Detects button presses and sends an HTTP request |

This setup ensures **separation of concerns**:
- **Go handles system commands (`exec.Command`) reliably**.
- **Python efficiently manages GPIO inputs (`gpiod`)**.

🔥 **Now your Raspberry Pi 5 is fully functional with button control & display management!** 🚀

