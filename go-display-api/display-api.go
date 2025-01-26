package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os/exec"
)

type Command struct {
	Cmd string `json:"cmd"`
}

func executeCommand(w http.ResponseWriter, r *http.Request) {
	log.Println("Received request to execute command")

	var cmd Command
	body, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(body, &cmd)

	log.Printf("Executing command: %s\n", cmd.Cmd)

	out, err := exec.Command("sh", "-c", cmd.Cmd).Output()
	if err != nil {
		log.Printf("Error executing command: %s\n", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	log.Printf("Command executed successfully: %s\n", cmd.Cmd)
	w.WriteHeader(http.StatusOK)
	w.Write(out)
}

func main() {
	port := ":3030"
	http.HandleFunc("/api/cmd", executeCommand)
	log.Printf("Server started and listening on port %s\n", port)
	log.Fatal(http.ListenAndServe(port, nil))
}
