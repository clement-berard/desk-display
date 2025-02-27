package main

import (
	"log"
	"net/http"
	"os/exec"
)

const (
	// Port du serveur HTTP
	PORT = ":3030"
)

// executeCommand exécute une commande système et log l'erreur si nécessaire
func executeCommand(command string, args ...string) error {
	cmd := exec.Command(command, args...)
	if err := cmd.Run(); err != nil {
		log.Printf("Erreur lors de l'exécution de la commande : %s\n", err.Error())
		return err
	}
	log.Printf("Commande exécutée avec succès : %s %v\n", command, args)
	return nil
}

// Handlers API pour contrôler l’écran
func lowBrightnessHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("Réglage de la luminosité basse")
	_ = executeCommand("ddcutil", "setvcp", "12", "0")
	_ = executeCommand("ddcutil", "setvcp", "10", "0")
	w.WriteHeader(http.StatusOK)
}

func standbyHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("Passage en mode veille")
	if err := executeCommand("ddcutil", "setvcp", "D6", "0x04"); err != nil {
		http.Error(w, "Échec de la mise en veille", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}

func onHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("Allumage de l'écran")
	_ = executeCommand("ddcutil", "setvcp", "D6", "0x01")
	_ = executeCommand("ddcutil", "setvcp", "12", "50")
	_ = executeCommand("ddcutil", "setvcp", "10", "50")
	w.WriteHeader(http.StatusOK)
}

func main() {
	// Démarrer le serveur HTTP
	http.HandleFunc("/api/low-brightness", lowBrightnessHandler)
	http.HandleFunc("/api/standby", standbyHandler)
	http.HandleFunc("/api/on", onHandler)

	log.Printf("Serveur démarré sur le port %s\n", PORT)
	log.Fatal(http.ListenAndServe(PORT, nil))
}
