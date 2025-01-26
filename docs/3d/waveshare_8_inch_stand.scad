$fs=0.01;
$fn=100;

//0=left piece, 1=right piece
mirror_part = 0; //[0, 1]

main_rod_length = 100; //[90:130]
main_rod_width = 8; //[8:15]
main_rod_height = 5; //[5:10]
screw_outside_diameter = 5.7;
screw_outside_height = 4;
screw_hole_diameter = 1.5;

support_rod_length = 55; //[50:80]
support_rod_width = main_rod_width;
support_rod_height = main_rod_height;
support_rod_angle = 70; //[45:90]

mirror([mirror_part,0,0])
union() {
    //main rod
    cube([main_rod_width,main_rod_length,main_rod_height], center=false);

    //top screw 
    difference(){
        translate([main_rod_width,main_rod_length-10,0]){
            cube([9,10,main_rod_height], center=false);
        }
        translate([main_rod_width+7.5/2,main_rod_length-10+5,-1]){
            color("red") cylinder(h=screw_outside_height+1,d=screw_outside_diameter ,center=false);
        }
        translate([main_rod_width+7.5/2,main_rod_length-10+5,-1]){
            color("red") cylinder(h=main_rod_height+2,d=screw_hole_diameter,center=false);
        }
    }

    //bottom screw
    difference(){
        translate([main_rod_width,main_rod_length-10-65,0]){
            cube([9,10,main_rod_height], center=false);
        }
        translate([main_rod_width+7.5/2,main_rod_length-10-65+5,-1]){
            color("red") cylinder(h=screw_outside_height+1,d=screw_outside_diameter,center=false);
        }
        translate([main_rod_width+7.5/2,main_rod_length-10-65+5,-1]){
            color("red") cylinder(h=main_rod_height+2,d=screw_hole_diameter,center=false);
        }
    }

    //desk support rod
    rotate([support_rod_angle,0,0]) cube([support_rod_width,support_rod_length,support_rod_height], center=false);

}