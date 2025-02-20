import gpiod
import time
import requests

# Configuration
API_BASE_URL = "http://node-red.home/_api"
ENDPOINTS = {
    4: "/test-btn?n=4",
    17: "/test-btn?n=17"
}

# Configuration des GPIO
CHIP_NAME = "gpiochip0"
GPIO_PINS = [4, 17]  # Boutons surveillés

# Initialisation des GPIO
chip = gpiod.Chip(CHIP_NAME)
lines = {}

for pin in GPIO_PINS:
    line = chip.get_line(pin)
    line.request(consumer="button-listener", type=gpiod.LINE_REQ_DIR_IN, flags=gpiod.LINE_REQ_FLAG_BIAS_PULL_UP)
    lines[pin] = line

print("🔴 En attente d'un appui sur GPIO4 ou GPIO17...")

try:
    while True:
        for pin, line in lines.items():
            val = line.get_value()
            if val == 0:  # Bouton pressé (pull-up actif)
                endpoint = API_BASE_URL + ENDPOINTS[pin]
                print(f"🔘 Bouton sur GPIO{pin} détecté ! Envoi à {endpoint}...")

                try:
                    response = requests.get(endpoint)
                    print(f"✅ Réponse API ({pin}): {response.status_code}")
                except Exception as e:
                    print(f"❌ Erreur API ({pin}): {e}")

                # Attente du relâchement du bouton
                while line.get_value() == 0:
                    time.sleep(0.05)

                time.sleep(0.5)  # Anti-rebond

        time.sleep(0.01)  # Polling léger

except KeyboardInterrupt:
    print("\n🛑 Arrêt du programme...")
finally:
    for line in lines.values():
        line.release()
    chip.close()
