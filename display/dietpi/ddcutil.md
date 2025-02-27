### Main commands

```shell
apt install ddcutil

ddcutil detect --verbose
```

- Activate I2C in dietpi-config

### Exemple :

    # Régler la luminosité à 75 %
    ddcutil setvcp 10 75

    # Régler le contraste à 50 %
    ddcutil setvcp 12 50

    # Changer le préréglage de couleur en 6500 K
    ddcutil setvcp 14 0x05

    # Ajuster le gain rouge à 80 %
    ddcutil setvcp 16 80

    # Ajuster le gain vert à 70 %
    ddcutil setvcp 18 70

    # Ajuster le gain bleu à 60 %
    ddcutil setvcp 1A 60

    # Changer la source d'entrée en HDMI-1
    ddcutil setvcp 60 0x11

    # Régler la netteté à 50 %
    ddcutil setvcp 87 50

    # Changer la langue de l'OSD en Français
    ddcutil setvcp CC 0x03

    # Éteindre l'écran
    ddcutil setvcp D6 0x05

    # Allumer l'écran
    ddcutil setvcp D6 0x01
    
    # Helpers
    ## Full Light 
    ddcutil setvcp 12 50 && ddcutil setvcp 10 30

    ## Min Light
    ddcutil setvcp 12 0 && ddcutil setvcp 10 0

### Autres fonctionnalités

Voici une liste des autres fonctionnalités VCP disponibles pour votre écran, mais sans détails spécifiques sur les valeurs possibles :

<table>

<thead>

<tr>

<th>Code VCP</th>

<th>Fonctionnalité</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>

<td>02</td>

<td>Nouvelle valeur de contrôle</td>

<td>Fonctionnalité spécifique au contrôle (détails non fournis).</td>

</tr>

<tr>

<td>04</td>

<td>Restaurer les paramètres d'usine</td>

<td>Restaure les paramètres d'usine de l'écran.</td>

</tr>

<tr>

<td>05</td>

<td>Restaurer la luminosité/contraste</td>

<td>Restaure les paramètres de luminosité et de contraste par défaut.</td>

</tr>

<tr>

<td>06</td>

<td>Restaurer la géométrie par défaut</td>

<td>Restaure les paramètres de géométrie par défaut.</td>

</tr>

<tr>

<td>08</td>

<td>Restaurer les couleurs par défaut</td>

<td>Restaure les paramètres de couleur par défaut.</td>

</tr>

<tr>

<td>0B</td>

<td>Incrément de température de couleur</td>

<td>Ajuste la température de couleur par incréments (détails non fournis).</td>

</tr>

<tr>

<td>0C</td>

<td>Demande de température de couleur</td>

<td>Affiche la température de couleur actuelle (détails non fournis).</td>

</tr>

<tr>

<td>52</td>

<td>Contrôle actif</td>

<td>Fonctionnalité spécifique au contrôle actif (détails non fournis).</td>

</tr>

<tr>

<td>AC</td>

<td>Fréquence horizontale</td>

<td>Ajuste la fréquence horizontale (détails non fournis).</td>

</tr>

<tr>

<td>AE</td>

<td>Fréquence verticale</td>

<td>Ajuste la fréquence verticale (détails non fournis).</td>

</tr>

<tr>

<td>B2</td>

<td>Disposition des sous-pixels</td>

<td>Ajuste la disposition des sous-pixels (détails non fournis).</td>

</tr>

<tr>

<td>B6</td>

<td>Type de technologie d'affichage</td>

<td>Affiche le type de technologie d'affichage (détails non fournis).</td>

</tr>

<tr>

<td>C6</td>

<td>Clé d'activation de l'application</td>

<td>Fonctionnalité spécifique à l'activation d'une application (détails non fournis).</td>

</tr>

<tr>

<td>C8</td>

<td>Type de contrôleur d'affichage</td>

<td>Affiche le type de contrôleur d'affichage (détails non fournis).</td>

</tr>

<tr>

<td>CA</td>

<td>Contrôle OSD/Bouton</td>

<td>Contrôle les boutons ou l'OSD de l'écran (détails non fournis).</td>

</tr>

<tr>

<td>DF</td>

<td>Version VCP</td>

<td>Affiche la version VCP supportée par l'écran.</td>

</tr>

<tr>

<td>FD</td>

<td>Fonctionnalité spécifique au fabricant</td>

<td>Fonctionnalité spécifique au fabricant (détails non fournis).</td>

</tr>

<tr>

<td>FF</td>

<td>Fonctionnalité spécifique au fabricant</td>

<td>Fonctionnalité spécifique au fabricant (détails non fournis).</td>

</tr>

</tbody>

</table>

### Remarques :

*   Les valeurs et fonctionnalités peuvent varier en fonction du modèle de l'écran. Les valeurs non spécifiées nécessitent une documentation supplémentaire du fabricant.
*   Pour obtenir des détails supplémentaires sur une fonctionnalité spécifique, vous pouvez utiliser la commande :

        ddcutil vcpinfo <code>

    Par exemple :

        ddcutil vcpinfo 60
