package main

import (
    "fmt"
    "log"
    "net/http"
    "os"
    "os/exec"
    "strconv"
    "strings"
)

const (
    // HTTP server port
    PORT = ":3030"
)

// executeCommand executes a system command and logs the error if necessary
func executeCommand(command string, args ...string) error {
    cmd := exec.Command(command, args...)
    if err := cmd.Run(); err != nil {
       log.Printf("Error executing command: %s\n", err.Error())
       return err
    }
    log.Printf("Command executed successfully: %s %v\n", command, args)
    return nil
}

// API handlers to control the screen
func lowBrightnessHandler(w http.ResponseWriter, r *http.Request) {
    log.Println("Setting low brightness")
    _ = executeCommand("ddcutil", "setvcp", "12", "0")
    _ = executeCommand("ddcutil", "setvcp", "10", "0")
    w.WriteHeader(http.StatusOK)
}

func standbyHandler(w http.ResponseWriter, r *http.Request) {
    log.Println("Entering standby mode")
    if err := executeCommand("ddcutil", "setvcp", "D6", "0x04"); err != nil {
       http.Error(w, "Failed to enter standby", http.StatusInternalServerError)
       return
    }
    w.WriteHeader(http.StatusOK)
}

func onHandler(w http.ResponseWriter, r *http.Request) {
    log.Println("Turning screen on")
    _ = executeCommand("ddcutil", "setvcp", "D6", "0x01")
    _ = executeCommand("ddcutil", "setvcp", "12", "50")
    _ = executeCommand("ddcutil", "setvcp", "10", "50")
    w.WriteHeader(http.StatusOK)
}

func cpuTemperatureHandler(w http.ResponseWriter, r *http.Request) {
    data, err := os.ReadFile("/sys/class/thermal/thermal_zone0/temp")
    if err != nil {
        http.Error(w, "Failed to read CPU temperature", http.StatusInternalServerError)
        log.Printf("Error reading temperature: %s\n", err.Error())
        return
    }

    millidegrees, err := strconv.Atoi(strings.TrimSpace(string(data)))
    if err != nil {
        http.Error(w, "Failed to parse temperature", http.StatusInternalServerError)
        return
    }

    temp := float64(millidegrees) / 1000.0
    w.Header().Set("Content-Type", "application/json")
    fmt.Fprintf(w, `{"temperature_celsius": %.2f}`, temp)
}

func main() {
    // Start HTTP server
    http.HandleFunc("/api/low-brightness", lowBrightnessHandler)
    http.HandleFunc("/api/standby", standbyHandler)
    http.HandleFunc("/api/on", onHandler)
    http.HandleFunc("/api/temperature", cpuTemperatureHandler)

    log.Printf("Server started on port %s\n", PORT)
    log.Fatal(http.ListenAndServe(PORT, nil))
}
