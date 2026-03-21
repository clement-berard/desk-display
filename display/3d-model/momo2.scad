$fs=0.01;
$fn=100;

// --- PARAMÈTRES DU SOCLE ---
longueur_socle = 238;    // Longueur totale du socle (adapté à l'écran de 239mm)
// Ajustez uniquement ce décalage pour faire glisser l'écran à gauche/droite sur le socle
decalage_gauche = 50;

// --- PARAMÈTRES DE LA CARTE (Tirés du plan officiel) ---
entraxe_vertical = 68.5;       // Distance verticale entre les trous (72.00 - 3.50)
entraxe_horizontal_bas = 104;  // Distance horizontale entre les trous du bas (108.00 - 4.00)
decalage_trou_haut_droit = 0;  // Décalage interne du trou haut-droit (0 car les trous externes forment un rectangle parfait)

// --- PARAMÈTRES DE STRUCTURE EXISTANTS ---
main_rod_length = 100; //[90:130]
main_rod_width = 8; //[8:15]
main_rod_height = 5; //[5:10]
screw_outside_diameter = 6.4;
screw_outside_height = 4;
screw_hole_diameter = 2.5;

support_rod_length = 55; //[50:80]
support_rod_width = main_rod_width;
support_rod_height = main_rod_height;
support_rod_angle = 70; //[45:90]

// --- DÉFINITION D'UNE BRANCHE ---
// Ajout d'un paramètre pour gérer l'asymétrie du trou supérieur
module branche(offset_x_haut = 0) {
    union() {
        // main rod
        cube([main_rod_width, main_rod_length, main_rod_height], center=false);

        // top screw
        difference(){
            translate([main_rod_width, main_rod_length-10, 0]){
                // On allonge l'attache de la taille de l'offset pour que le trou reste dans le plastique
                cube([9 + offset_x_haut, 10, main_rod_height], center=false);
            }
            translate([main_rod_width + 7.5/2 + offset_x_haut, main_rod_length-10+5, -1]){
                color("red") cylinder(h=screw_outside_height+1, d=screw_outside_diameter, center=false);
            }
            translate([main_rod_width + 7.5/2 + offset_x_haut, main_rod_length-10+5, -1]){
                color("red") cylinder(h=main_rod_height+2, d=screw_hole_diameter, center=false);
            }
        }

        // bottom screw (entraxe ajusté via la variable)
        difference(){
            translate([main_rod_width, main_rod_length-10-entraxe_vertical, 0]){
                cube([9, 10, main_rod_height], center=false);
            }
            translate([main_rod_width + 7.5/2, main_rod_length-10-entraxe_vertical+5, -1]){
                color("red") cylinder(h=screw_outside_height+1, d=screw_outside_diameter, center=false);
            }
            translate([main_rod_width + 7.5/2, main_rod_length-10-entraxe_vertical+5, -1]){
                color("red") cylinder(h=main_rod_height+2, d=screw_hole_diameter, center=false);
            }
        }

        // desk support rod
        rotate([support_rod_angle,0,0]) cube([support_rod_width, support_rod_length, support_rod_height], center=false);
    }
}

// --- CALCUL DES POSITIONS POUR GARANTIR L'AJUSTEMENT ---
position_gauche = decalage_gauche;

// La distance entre l'origine de la branche et le centre de son trou de fixation est :
offset_trou_branche = main_rod_width + 7.5/2;

// On calcule la position de la branche droite pour garantir un entraxe parfait de 104mm :
position_droite = position_gauche + entraxe_horizontal_bas + (offset_trou_branche * 2);

// --- ASSEMBLAGE FINAL ---
union() {
    // 1. Le socle principal (qui repose sur le bureau)
    color("LightGray")
        rotate([support_rod_angle, 0, 0])
            cube([longueur_socle, support_rod_length, support_rod_height]);

    // 2. Branche Gauche (standard)
    translate([position_gauche, 0, 0])
        branche(offset_x_haut = 0);

    // 3. Branche Droite (mise en miroir + application du décalage pour le trou haut-droit)
    translate([position_droite, 0, 0])
        mirror([1,0,0])
            branche(offset_x_haut = decalage_trou_haut_droit);
}
