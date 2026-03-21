$fs=0.01;
$fn=100;

// --- PARAMÈTRES DU SOCLE ---
longueur_socle = 238;
decalage_gauche = 48;          // <-- CORRIGÉ : Passé à 48 pour décaler de 2 mm vers la GAUCHE
extension_arriere = 30;

// --- PARAMÈTRES DE LA CARTE ---
entraxe_vertical = 65;
entraxe_horizontal_bas = 101;
degagement_usb_droite = 12;

// --- PARAMÈTRES DE STRUCTURE EXISTANTS ---
main_rod_length = 110;
main_rod_width = 8;
main_rod_height = 5;
screw_outside_diameter = 6.4;
screw_outside_height = 4;
screw_hole_diameter = 2.5;

support_rod_length = 55;
support_rod_width = main_rod_width;
support_rod_height = main_rod_height;
support_rod_angle = 70;

// --- PARAMÈTRES DU PANNEAU BOUTONS ---
hauteur_panneau = 22;
epaisseur_panneau = 15;
decalage_avant = -10;

diametre_trou = 8.4;
diametre_lamage = 16;
epaisseur_fixation = 5;

ecart_bord = 10;
entraxe_centre = 30;

// --- PARAMÈTRES ESP32 ---
esp_entraxe_x = 47;
esp_entraxe_y = 23;
esp_elevation = 6;
esp_insert_diametre = 4.2;
esp_insert_profondeur = 5.5;
esp_plot_diametre = 8;

// --- CALCULS DE L'EXTENSION À L'AVANT ---
allonge_avant = -decalage_avant / sin(support_rod_angle);
y_socle_avant = -allonge_avant * cos(support_rod_angle);

// --- MODULE FIXATION ESP32 ---
module esp32_mount() {
    difference() {
        union() {
            for(x = [-esp_entraxe_x/2, esp_entraxe_x/2]) {
                for(y = [-esp_entraxe_y/2, esp_entraxe_y/2]) {
                    translate([x, y, 0])
                        cylinder(h=esp_elevation, d=esp_plot_diametre);
                }
            }
        }
        for(x = [-esp_entraxe_x/2, esp_entraxe_x/2]) {
            for(y = [-esp_entraxe_y/2, esp_entraxe_y/2]) {
                translate([x, y, esp_elevation - esp_insert_profondeur + 0.1])
                    cylinder(h=esp_insert_profondeur + 1, d=esp_insert_diametre);
            }
        }
    }
}

// --- DÉFINITION D'UNE BRANCHE (AVEC GESTION DE L'ALLONGEMENT DES PATTES) ---
module branche(extension_pattes = 0) {
    union() {
        // Le tronc principal
        cube([main_rod_width, main_rod_length, main_rod_height], center=false);

        // Patte du haut
        difference(){
            translate([main_rod_width, main_rod_length-10, 0]){
                cube([9 + extension_pattes, 10, main_rod_height], center=false);
            }
            translate([main_rod_width + 7.5/2 + extension_pattes, main_rod_length-10+5, -1]){
                color("red") cylinder(h=screw_outside_height+1, d=screw_outside_diameter, center=false);
            }
            translate([main_rod_width + 7.5/2 + extension_pattes, main_rod_length-10+5, -1]){
                color("red") cylinder(h=main_rod_height+2, d=screw_hole_diameter, center=false);
            }
        }

        // Patte du bas
        difference(){
            translate([main_rod_width, main_rod_length-10-entraxe_vertical, 0]){
                cube([9 + extension_pattes, 10, main_rod_height], center=false);
            }
            translate([main_rod_width + 7.5/2 + extension_pattes, main_rod_length-10-entraxe_vertical+5, -1]){
                color("red") cylinder(h=screw_outside_height+1, d=screw_outside_diameter, center=false);
            }
            translate([main_rod_width + 7.5/2 + extension_pattes, main_rod_length-10-entraxe_vertical+5, -1]){
                color("red") cylinder(h=main_rod_height+2, d=screw_hole_diameter, center=false);
            }
        }

        rotate([support_rod_angle,0,0]) cube([support_rod_width, support_rod_length, support_rod_height], center=false);
    }
}

// --- CALCUL DES POSITIONS ---
position_gauche = decalage_gauche;
offset_trou_branche = main_rod_width + 7.5/2;
position_droite = position_gauche + entraxe_horizontal_bas + (offset_trou_branche * 2);

// --- ASSEMBLAGE FINAL ---
union() {
    // 1. LE SOCLE PRINCIPAL
    rotate([support_rod_angle, 0, 0]) {
        color("LightGray")
            translate([0, -allonge_avant, 0])
                cube([longueur_socle, support_rod_length + allonge_avant + extension_arriere, support_rod_height]);

        // Fixation ESP32
        color("DarkSlateGray")
            translate([longueur_socle / 2, support_rod_length + extension_arriere / 2 - 8, 0])
                mirror([0, 0, 1])
                    esp32_mount();
    }

    // 2. Branche Gauche
    translate([position_gauche, 0, 0])
        branche(extension_pattes = 0);

    // 3. Branche Droite
    translate([position_droite + degagement_usb_droite, 0, 0])
        mirror([1,0,0])
            branche(extension_pattes = degagement_usb_droite);

    // 4. Panneau des boutons
    translate([0, 0, decalage_avant]) {
        difference() {
            cube([longueur_socle, hauteur_panneau, epaisseur_panneau]);

            for (x = [
                ecart_bord,
                        longueur_socle/2 - entraxe_centre,
                    longueur_socle/2,
                        longueur_socle/2 + entraxe_centre,
                    longueur_socle - ecart_bord
                ]) {
                translate([x, hauteur_panneau / 2, -1])
                    cylinder(h = epaisseur_panneau + 2, d = diametre_trou);

                translate([x, hauteur_panneau / 2, epaisseur_fixation])
                    cylinder(h = epaisseur_panneau, d = diametre_lamage);
            }
        }
    }

    // 5. REMPLISSAGE DE L'ESPACE À L'AVANT
    color("DimGray")
        translate([0, y_socle_avant, decalage_avant])
            cube([longueur_socle, abs(y_socle_avant), epaisseur_panneau]);
}
