//sketch.js 

 //<>//
 var window_width = 300;
 var window_height = 250;
 var main_arch_height = 200;

 var my_width = 1700;
 var my_height = 1000;
 var halfway_x = my_width / 2;
 var halfway_y = my_height / 2;

 var bg_colour

 //-------------------------------------------------------------------------------
 //
 //-------------------------------------------------------------------------------
 function setup() {
   imageMode(CENTER);
   rectMode(CENTER);
   createCanvas(1500, 1500);
   stroke(0);
   noFill();

   bg_colour = color(242, 239, 234);

   //draw_pier(new p5.Vector(100, halfway_y), 2, 1000);
   //draw_vault(new var(100, halfway_y), 100, 100,  8, 15, 0);
   //draw_cloister(new var(300,300), 1, vault_width * cloister_vaults, vault_width * cloister_vaults, cloister_vaults, cloister_vaults - 2);
   //draw_chapter_house(new var(width/2, height/2), 8, 100, 0);

   setup_cathedral();
    push();
     translate(0, 0);
    translate(0, 200);
    scale(random(0.5,0.5));
     draw_cathedral();

     pop();
 }

 var array_aisle_list = [0, 0, 0, 0, 0, 1, 0, 2, 2, 2, 2];
 var num_possible_aisles = 3;
 var possible_aisles = [1, 3, 5];

 var num_possible_choir_aisles = 4;
 var possible_choir_aisles = [1, 3, 5, 7];

 var transept_aisle_list = [0, 0, 0, 1, 0, 2];
 var possible_transepts = [1, 3, 5];
 var num_possible_transepts = 3

 var number_of_aisles;
 var mid_aisle;

 var number_of_choir_aisles = 0;
 var mid_choir_aisle;

 var nave_height = number_of_aisles * 100;
 var nave_width = 350;

 var choir_width = nave_width / 2;

 var inner_rectangle_inset_width = 5;
 var inner_rectangle_inset_height = 5;

 var number_of_vaults = 0;
 var vault_height = nave_height / (number_of_aisles + 1);
 var vault_width = nave_width / number_of_vaults;

 var pillar_width = inner_rectangle_inset_height * 3;
 var buttress_size = 0;
 var buttress_length = 0;

 var number_of_choir_vaults;

 var number_transpet_vault;
 var vaults_wide_transpet;
 var vaults_high_crossing;
 var mid_transept_aisle;

 var west_end_height = nave_height;
 var west_end_vault_height = vault_height;
 var west_end_vault_width = vault_width;
 var west_end_stick_out

 var ambalatory_side_chapel_chance = 50;
 var aisle_side_chapel_chance = 50;

 var nave_origin;
 var cloister_origin;
 var crossing_origin;
 var choir_origin;
 var apse_origin;
 var north_transept_origin;
 var south_transept_origin;
 var chapter_house_origin;

 var transept_number_chance;
 var transept_number;

 var interior_wall_width = 8;

 var west_end_aisles;

 var cloister_vaults;

 var chapter_house_radius;
 var chapter_house_door_vaults;
 var chapter_house_chance = 50;
 var nave_side_chapels;

 var outside_buttress_type = 0;

 var nave_ribbing_type = -1;

 //-------------------------------------------------------------------------------
 //
 //-------------------------------------------------------------------------------
 function setup_cathedral() {
   transept_number_chance = int(random(0, 100));
   if (transept_number_chance < 40) {
     transept_number = 1;
   } else if (transept_number_chance < 80) {
     transept_number = 2;
   } else if (transept_number_chance < 100) {
     transept_number = 3;
   }

   west_end_stick_out = random(10, 35);

   number_of_aisles = int(possible_aisles[int(random(0, num_possible_aisles))]);
   mid_aisle = array_aisle_list[number_of_aisles];

   while (number_of_choir_aisles < number_of_aisles) {
     number_of_choir_aisles = possible_choir_aisles[3]; //var(random(0, num_possible_choir_aisles))];   
     mid_choir_aisle = array_aisle_list[number_of_choir_aisles];
   }

   number_of_vaults = int(random(3, 8));

   nave_height = number_of_aisles * int(random(70, 110));
   nave_width = number_of_vaults * int(random(40, 70));

   vault_height = nave_height / (number_of_aisles + 1);
   vault_width = nave_width / number_of_vaults;

   pillar_width = inner_rectangle_inset_height * 3;
   buttress_size = random(10, 17);
   buttress_length = random(10, vault_width / 3);

   number_of_choir_vaults = int(number_of_vaults / 2);
   choir_width = vault_width * number_of_choir_vaults;

   number_transpet_vault = int(random(1, 3)) + int(min(number_of_aisles, number_of_choir_aisles) / 2);
   vaults_wide_transpet = possible_transepts[int(random(0, num_possible_transepts))];
   vaults_high_crossing = vaults_wide_transpet;
   mid_transept_aisle = transept_aisle_list[vaults_wide_transpet];

   west_end_height = nave_height;
   west_end_vault_height = vault_height;
   west_end_vault_width = vault_width * 2;
   west_end_stick_out = int(random(10, 35));

   ambalatory_side_chapel_chance = 50;
   aisle_side_chapel_chance = 0;

   if (number_of_aisles > 1) {
     nave_origin = new p5.Vector(250, halfway_y - ((number_of_aisles * vault_height) / 2));
   } else {
     nave_origin = new p5.Vector(250, halfway_y);
   }

   cloister_origin = new p5.Vector(nave_origin.x, nave_origin.y + nave_height + vault_height);
   crossing_origin = new p5.Vector((nave_origin.x + nave_width) + int((vaults_wide_transpet * vault_width) / 2), halfway_y);
   choir_origin = new p5.Vector(crossing_origin.x + (((vaults_wide_transpet) * vault_width) / 2) + vault_width, halfway_y - ((number_of_choir_aisles * vault_height) / 2));
   apse_origin = new p5.Vector(choir_origin.x + ((number_of_choir_vaults) * vault_width), crossing_origin.y);

   if (vaults_wide_transpet > 1) {
     north_transept_origin = new p5.Vector((nave_origin.x + number_of_vaults * vault_width), crossing_origin.y - ((vaults_high_crossing * vault_height) / 2) - (number_transpet_vault * vault_height));
   } else {
     north_transept_origin = new p5.Vector((nave_origin.x + (number_of_vaults * vault_width) + (vault_width / 2)), crossing_origin.y - ((vaults_high_crossing * vault_height) / 2) - (number_transpet_vault * vault_height));
   }
   south_transept_origin = new p5.Vector(north_transept_origin.x, crossing_origin.y + ((vaults_high_crossing * vault_height) / 2) + (number_transpet_vault * vault_height));

   if (nave_width < 250) {
     chapter_house_radius = 0;
   } else {
     chapter_house_radius = random(80, 100);
   }

   chapter_house_door_vaults = int(random(2, 5));


   if (number_of_aisles > 1) {
     chapter_house_origin = new p5.Vector(nave_origin.x + (vault_width * (number_of_vaults / 2)), nave_origin.y + (nave_height - (vault_height / 2)) + chapter_house_radius + (vault_height * chapter_house_door_vaults));
   } else {
     chapter_house_origin = new p5.Vector(nave_origin.x + (vault_width * (number_of_vaults / 2)), nave_origin.y + vault_height + chapter_house_radius + (vault_height * chapter_house_door_vaults));
   }


   cloister_vaults = number_of_vaults - 1;

   nave_side_chapels = false;
   if (number_of_aisles > 1) {
     if (random(0, 100) < 30) {
       nave_side_chapels = true;
     }
   }

   outside_buttress_type = int(random(1, 4));

   nave_ribbing_type = int(random(1, 4));

   number_transpet_vault = int(random(1, 3)) + int(Math.min(number_of_aisles, number_of_choir_aisles) / 2);
 }

 function draw() {
   // keep draw() here to continue looping while waiting for keys
 }
 var sides = 5;
 //-------------------------------------------------------------------------------
 //
 //-------------------------------------------------------------------------------
 function keyPressed() {
   if (key == 0) {
     background(bg_colour);
     setup_cathedral();

     push();
     translate(0, 0);
    translate(170, height/2 + 390);
    scale(random(0.5,0.5));
    rotate(radians(270));
    
     draw_cathedral();
     pop();

     //push();
     //translate(0,  0);
     //translate(width/2,  height/2);
     //rotate(radians(var(random(0,360))));
     //draw_chapter_house(new var(0,0), var(random(6, 10)), 100, 0);
     //pop();
   }
 }

 //-------------------------------------------------------------------------------
 //
 //-------------------------------------------------------------------------------
 function draw_cathedral() {
   print("nave_height:  " + nave_height);
   print("vault_height: " + vault_height);
   print("west_end_vault_height: " + west_end_vault_height);
   print("vault_width: " + vault_width);
   print("number_of_aisles: " + number_of_aisles);
   print("mid_aisle: " + mid_aisle);
   print("number_transpet_vault: " + number_transpet_vault);
   print("number_of_choir_vaults: " + number_of_choir_vaults);
   print("number_of_vaults: " + number_of_vaults);

   //West End
   draw_west_end();

   //Nave
   draw_nave(nave_origin, nave_width, vault_height, number_of_vaults, number_of_aisles, mid_aisle, nave_ribbing_type, ribbing_normal);

   for (var i = 1; i <= transept_number; i++) {
     if (transept_number == 1) {
       while (number_transpet_vault < number_of_choir_aisles) {
         number_transpet_vault += int(random(0 - number_transpet_vault, 2));
       }
     }

     north_transept_origin.y = crossing_origin.y - ((vaults_high_crossing * vault_height) / 2) - (number_transpet_vault * vault_height);
     south_transept_origin.y = crossing_origin.y + ((vaults_high_crossing * vault_height) / 2) + (number_transpet_vault * vault_height);

     var extra_nave_origin;
     if (number_of_aisles > 1) {
       extra_nave_origin = new p5.Vector(choir_origin.x, halfway_y - ((number_of_aisles * vault_height) / 2));
     } else {
       extra_nave_origin = new p5.Vector(choir_origin.x, halfway_y);
     }

     //Cloister
     if (cloister_vaults >= 3) {
       //draw_cloister(cloister_origin, 1, vault_width * cloister_vaults, vault_width * cloister_vaults, cloister_vaults, cloister_vaults - 2);
     }

     var final_transpet = i == transept_number;

     //Crossing
     draw_crossing(crossing_origin, final_transpet, nave_ribbing_type, ribbing_normal);

     //North Transept  
     draw_north_transept(north_transept_origin, final_transpet);

     //South Transept
     draw_south_transept(south_transept_origin, final_transpet); 

     if (i == transept_number) {
       //Choir
       draw_nave(choir_origin, choir_width, vault_height, number_of_choir_vaults, number_of_choir_aisles, mid_choir_aisle, nave_ribbing_type, ribbing_normal);
       apse_origin.x = choir_origin.x + ((number_of_choir_vaults - 0.5) * vault_width);
       break;
     } else {
       //Another nave
       var this_nave_vaults = int(random(2, 5));
       var this_nave_width = vault_width * this_nave_vaults;
       draw_nave(extra_nave_origin, this_nave_width, vault_height, this_nave_vaults, number_of_aisles, mid_aisle, nave_ribbing_type, ribbing_normal);

       north_transept_origin.x += (vaults_wide_transpet * vault_width) + this_nave_width + vault_width;
       south_transept_origin.x += (vaults_wide_transpet * vault_width) + this_nave_width + vault_width;
       crossing_origin.x += (vaults_wide_transpet * vault_width) + this_nave_width + vault_width;
       choir_origin.x += (vaults_wide_transpet * vault_width) + this_nave_width + vault_width;
       apse_origin.x = (vaults_wide_transpet * vault_width) + this_nave_width + vault_width;
       extra_nave_origin.x += (vaults_wide_transpet * vault_width) + this_nave_width + vault_width;
     }


     while (number_transpet_vault < number_of_choir_aisles) {
       number_transpet_vault += int(random(0 - number_transpet_vault, 3));
     }
   }

   //Ambulatory
   draw_apse(apse_origin);

   //Chapter House
   if (random(0, 100) < chapter_house_chance && chapter_house_radius > 0) {
     push();
     translate(0, 0);
     translate(chapter_house_origin.x, chapter_house_origin.y);
     rotate(radians(180));
     //draw_chapter_house(new p5.Vector(0, 0), int(random(6, 10)), chapter_house_radius, 0, vault_width, chapter_house_door_vaults);
     pop();
   }
 }

 //-------------------------------------------------------------------------------
 //
 //-------------------------------------------------------------------------------
 function draw_crossing(crossing_origin, final_transept, m_ribbing_type, aisle_ribbing_type) {
   var current_crossing_povar = new p5.Vector(crossing_origin.x, crossing_origin.y);

   
   if (vaults_high_crossing > 1) {
     
     current_crossing_povar.x = crossing_origin.x - int(vaults_high_crossing / 2) * vault_width;
     current_crossing_povar.x -= vault_width / 2;
   }

   for (var j = 0; j < vaults_high_crossing; j++) {
     if (vaults_high_crossing > 1) {
       current_crossing_povar.y = crossing_origin.y - int(vaults_high_crossing / 2) * vault_height;
       current_crossing_povar.y -= vault_height / 2;
     }

     var transept_vault_width;
     if (j == mid_transept_aisle) {
       transept_vault_width = vault_width * 2;
     } else {
       transept_vault_width = vault_width;
     }

     for (var i = 0; i < vaults_wide_transpet; i++) {
       if (i == mid_transept_aisle) {
         var mid_vault = j == mid_transept_aisle;
         draw_crossing_arcade(current_crossing_povar, transept_vault_width, vault_height * 2, 1, false, mid_vault, m_ribbing_type, aisle_ribbing_type);
         current_crossing_povar.y += vault_height * 1.5;
       } else {
         draw_vault_arcade(current_crossing_povar, transept_vault_width, vault_height, 1, false, aisle_ribbing_type);

         if (j == 0) {
           if (current_crossing_povar.y < nave_origin.y || current_crossing_povar.y > (nave_origin.y + nave_height - vault_height)) {
             draw_wall(new p5.Vector(current_crossing_povar.x - (transept_vault_width / 2), current_crossing_povar.y), pillar_width, vault_height);
           }
         } else if (j == vaults_wide_transpet - 1) {
           var height_to_use = 0;
           if (final_transept) {
             height_to_use = choir_origin.y + ((number_of_choir_aisles - 1) * vault_height) + (vault_height * 2);

             if (current_crossing_povar.y < choir_origin.y || current_crossing_povar.y > (height_to_use - vault_height)) {
               draw_wall(new p5.Vector(current_crossing_povar.x + (transept_vault_width / 2), current_crossing_povar.y), pillar_width, vault_height);
             }
           } else {
             height_to_use = nave_origin.y + nave_height;

             if (current_crossing_povar.y < nave_origin.y || current_crossing_povar.y > (height_to_use - vault_height)) {
               draw_wall(new p5.Vector(current_crossing_povar.x + (transept_vault_width / 2), current_crossing_povar.y), pillar_width, vault_height);
             }
           }
         }

         if ((i + 1) == mid_transept_aisle) {
           current_crossing_povar.y += vault_height * 1.5;
         } else {
           current_crossing_povar.y += vault_height;
         }
       }
     }

     if ((j + 1) == mid_transept_aisle) {
       current_crossing_povar.x += transept_vault_width * 1.5;
     } else if (j == mid_transept_aisle) {
       current_crossing_povar.x += transept_vault_width * 0.75;
     } else {
       current_crossing_povar.x += transept_vault_width;
     }
   }
 }

 //-------------------------------------------------------------------------------
 //
 //-------------------------------------------------------------------------------
 function render_full_screen() {
   var cathedral_width = 20;
   var row_height = 50;
   for (var i = cathedral_width; i < height; i += row_height) {
     for (var j = cathedral_width; j < width; j += cathedral_width) {
       background(bg_colour);
       setup_cathedral();

       push();
       translate(0, 0);
       translate(170, height / 2 + 390);
       scale(random(0.5, 0.5));
       rotate(radians(270));
       draw_cathedral();
       pop();
     }
   }
 }

 //-------------------------------------------------------------------------------
 //
 //-------------------------------------------------------------------------------
 function draw_arch(origin, win_width, win_height, arch_height) {
   var right_vertical_origin = new p5.Vector(origin.x + win_width, origin.y);

   line(origin.x, origin.y, origin.x, origin.y + win_height);
   line(right_vertical_origin.x, right_vertical_origin.y, right_vertical_origin.x, right_vertical_origin.y + win_height);

   var right_arch_angle = atan((win_width * 0.86) / (win_width / 2));

   arc(origin.x, origin.y, win_width * 2.0, arch_height, TWO_PI - right_arch_angle, TWO_PI);
   arc(right_vertical_origin.x, right_vertical_origin.y, win_width * 2.0, arch_height, PI, PI + right_arch_angle);

   line(origin.x, origin.y + win_height, origin.x + win_width, origin.y + win_height);

   //line(origin.x + (win_width/2), origin.y - arch_height, origin.x+(win_width/2), origin.y + win_height);
   //line(origin.x, origin.y, origin.x + win_width, origin.y);
 }


 //-------------------------------------------------------------------------------
 //
 //-------------------------------------------------------------------------------
 //Foils real width is 2(passed value) + 2(15.1)
 function draw_quatrefoil(origin, foil_width) {
   arc(origin.x - foil_width, origin.y, foil_width * 1.51, foil_width * 1.51, HALF_PI - (QUARTER_PI / 2), PI + HALF_PI + (QUARTER_PI / 2));
   arc(origin.x + foil_width, origin.y, foil_width * 1.51, foil_width * 1.51, PI + HALF_PI - (QUARTER_PI / 2), TWO_PI + HALF_PI + (QUARTER_PI / 2));
   arc(origin.x, origin.y - foil_width, foil_width * 1.51, foil_width * 1.51, PI - (QUARTER_PI / 2), TWO_PI + (QUARTER_PI / 2));
   arc(origin.x, origin.y + foil_width, foil_width * 1.51, foil_width * 1.51, 0 - (QUARTER_PI / 2), PI + (QUARTER_PI / 2));
 }

 //-------------------------------------------------------------------------------
 //
 //-------------------------------------------------------------------------------
 //Foils real width is passed value + 2(passed value * 1.51)
 function draw_trefoil(origin, foil_width) {
   arc(origin.x - (foil_width / 2), origin.y + foil_width, foil_width * 1.51, foil_width * 1.51, HALF_PI - (QUARTER_PI), PI + HALF_PI);
   arc(origin.x + (foil_width / 2), origin.y + foil_width, foil_width * 1.51, foil_width * 1.51, PI + HALF_PI, TWO_PI + HALF_PI + (QUARTER_PI));
   arc(origin.x, origin.y - (foil_width / 4), foil_width * 1.51, foil_width * 1.51, PI - (QUARTER_PI), TWO_PI + (QUARTER_PI));
 }