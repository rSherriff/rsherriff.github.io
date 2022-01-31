 //<>//
//pier_generator.js

//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
var circle_pier = 0;
var diamond_pier = 1;
var outer_buttress = 2;
var crossing_pier = 3;
var num_pier_types = 4;
function draw_pier(origin,  pier_type,  pier_width)
{
  if (pier_type == circle_pier)
  {
    fill(0);
    ellipse(origin.x, origin.y, buttress_size, buttress_size);
    noFill();
  } else if (pier_type == diamond_pier)
  {
    fill(0);
    ellipse(origin.x, origin.y, buttress_size, buttress_size);
    noFill();
  } else if (pier_type == outer_buttress)
  {
    draw_crossing_pier(origin, pier_width);
  } else if (pier_type == crossing_pier)
  {
    draw_crossing_pier(origin, pier_width);
  }
}
function draw_random_pier( origin,  pier_width)
{
  draw_pier(origin, int(random(0, num_pier_types)), pier_width);
}

//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_large_pier( origin,  pier_width)
{    
  rect(origin.x, origin.y, pier_width, pier_width / 3);
  rect(origin.x, origin.y, pier_width / 3, pier_width);
  rect(origin.x, origin.y, pier_width * 0.7, pier_width * 0.5);
  rect(origin.x, origin.y, pier_width * 0.5, pier_width * 0.7);
}

//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
//Flat side = 1,2,3,4 starts top goes clockwise
function draw_flat_large_pier( origin,  pier_width,  flat_side)
{
  var mod1 = 0;
  var mod2 = 0;
  var mod3 = 0;
  var mod4 = 0;
  switch(flat_side)
  {
  case 3:
  case 1:
    mod1 = 3;
    mod2 = 2;
    mod3 = 0.5;
    mod4 = 0.7;    
    rect(origin.x, origin.y, pier_width / mod1, pier_width / mod2);
    rect(origin.x, origin.y, pier_width, pier_width / mod1);
    break;
  case 2:
  case 4:
    mod1 = 2;
    mod2 = 3;
    mod3 = 0.7;
    mod4 = 0.5; 
    rect(origin.x, origin.y, pier_width / mod1, pier_width / mod2);
    rect(origin.x, origin.y, pier_width / mod2, pier_width);
    break;
  } 

  rect(origin.x, origin.y, pier_width * mod3, pier_width * mod4);
  rect(origin.x, origin.y, pier_width * mod4, pier_width * mod3);
}

//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_flat_small_pier( origin,  pier_width,  flat_side)
{
  switch(flat_side)
  {
  case 1:
    rect(origin.x, origin.y + pier_width / 9, pier_width / 2, pier_width / 3);
    rect(origin.x, origin.y, pier_width / 3, pier_width / 2);
    break;
  case 2: 
    break;
  case 3:
    rect(origin.x, origin.y - pier_width / 9, pier_width / 2, pier_width / 3);
    rect(origin.x, origin.y, pier_width / 3, pier_width / 2);
    break;
  case 4:
    break;
  }
}

//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_outside_buttress( origin,  pier_width,  flat_side)
{     
  strokeWeight(buttress_size);
  strokeCap(PROJECT);

   buttress_end = new p5.Vector(0, 0);
   buttress_projection = new p5.Vector(0, 0);    

  if(outside_buttress_type == 1 || outside_buttress_type ==2)
  {
    strokeWeight(8);
  }
  else
  {
    strokeWeight(15);
  }

  if ((flat_side & 1) != 0)
  {    
    buttress_end = find_point_on_circle(origin, buttress_length, PI + HALF_PI);
    buttress_projection = move_towards(new p5.Vector(buttress_end.x, buttress_end.y), origin, -(buttress_length));
    draw_pier(new p5.Vector(origin.x, origin.y + 5), outside_buttress_type, 3);
  }
  if ((flat_side & 2) != 0)
  {
    buttress_end = find_point_on_circle(origin, buttress_length, PI);
    buttress_projection = find_point_on_circle(origin, buttress_length + (buttress_length / 2), PI);
    draw_pier(new p5.Vector(origin.x + 5, origin.y), outside_buttress_type, 3);
  }
  if ((flat_side & 4) != 0)
  {
    buttress_end = find_point_on_circle(origin, buttress_length, 0);
    buttress_projection = find_point_on_circle(origin, buttress_length + (buttress_length / 2), 0);
    draw_pier(new p5.Vector(origin.x - 5, origin.y ), outside_buttress_type, 3);
  }
  if ((flat_side & 8)!= 0)
  {
    buttress_end = find_point_on_circle(origin, buttress_length, HALF_PI);
    buttress_projection = find_point_on_circle(origin, buttress_length + (buttress_length), HALF_PI);
    draw_pier(new p5.Vector(origin.x, origin.y - 5), outside_buttress_type, 3);
  }

 strokeWeight(buttress_size);
  line(origin.x, origin.y, buttress_end.x, buttress_end.y);

  strokeWeight(buttress_size / 2);
  line(buttress_end.x, buttress_end.y, buttress_projection.x, buttress_projection.y);

  strokeWeight(1);
}


//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_crossing_pier( origin,  pier_width)
{      
  fill(0);

  push();
  translate(origin.x, origin.y);
  rotate(radians(45));
  rect(0, 0, pier_width, pier_width);
  pop();

  rect(origin.x, origin.y, pier_width * 0.9, pier_width * 0.9);

  noFill();
}

//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_west_end_pier( top_pier,  bottom_pier)
{
  fill(0);

  var west_end_pier_types = 2;
  var type_percentage = 100 / (west_end_pier_types );
  var west_end_pier_chance = random(0, 100); 

  //NotreDame/Laon Style
  if (west_end_pier_chance < type_percentage)
  {
    var pier_height = random(25, 50);
    var base_width = random(10, 20);
    var triangle_width = random(25, 40);
    var buttress_chance = random(0, 100); 

    for (var j = 0; j <= 1; j++)
    {    
      var current_pier;
      if (j == 0)
      {
        current_pier = top_pier;
      } else
      {
        current_pier = bottom_pier;
      }

      rect(current_pier.x, current_pier.y, base_width, pier_height);

      var triangle_top = new p5.Vector(current_pier.x - (base_width / 2), current_pier.y - (pier_height / 2));
      var triangle_meeting = new p5.Vector(current_pier.x - triangle_width, current_pier.y );
      var triangle_bottom = new p5.Vector(current_pier.x - (base_width / 2), current_pier.y + (pier_height / 2));
      triangle(triangle_top.x, triangle_top.y, triangle_meeting.x, triangle_meeting.y, triangle_bottom.x, triangle_bottom.y);

      var number_vaults = (random(5, 8));
      var top_vault;
      var bottom_vault;
      var line_length = p5.Vector.sub(triangle_top, triangle_meeting).mag();
      var move_radius = line_length / number_vaults;
      var vault_radius = move_radius * 0.8;
      for (var i = 0; i < number_vaults; i++)
      {
        top_vault = move_towards(triangle_top, triangle_meeting, move_radius );
        bottom_vault = move_towards(triangle_bottom, triangle_meeting, move_radius );
        ellipse(top_vault.x, top_vault.y, vault_radius, vault_radius);
        ellipse(bottom_vault.x, bottom_vault.y, vault_radius, vault_radius);
      }

      if (buttress_chance < 25)
      {
        var half_buttress_length = random((triangle_width / 2) * 0.5, triangle_width / 2);
        var butress_origin = new p5.Vector(current_pier.x - triangle_width, current_pier.y);

        rect(butress_origin.x, butress_origin.y, half_buttress_length * 2, pier_height / 3);
      }
    }
  } else if (west_end_pier_chance < type_percentage * 2)
  {
    var num_images = 3;      
    var image_number = (random(1, num_images+1));

    var dimensions = random(75, 90);

    for (var j = 0; j <= 1; j++)
    {    
      var current_pier;      
      var pier_image;

      pier_image = loadImage("west_end_pier_" + image_number + ".png");
      push();

      if (j == 0)
      {
        current_pier = top_pier;
        translate(current_pier.x, current_pier.y);   
        image(pier_image, 0, 0, dimensions, dimensions);
      } else
      {
        current_pier = bottom_pier;
        scale(1, -1);
        translate(current_pier.x, -current_pier.y);    
        image(pier_image, 0, 0, dimensions, -dimensions);
      }  

      pop();
    }
  }
  //Salisbury/Worchester Style
  else
  {
    var max_width_height = 50;
    var min_width_height = 40;

    var west_end_pier_width = random(min_width_height, max_width_height);
    var west_end_pier_height = random(min_width_height, max_width_height);
    var shape_count = int(random(1, 5));
    var master_current_width = random(min_width_height * 0.7, min_width_height);

    var shape_origins = []
    var shape_chances = []
    for (var i = 0; i < shape_count; i++)
    {
      shape_chances[i] = random(0, 100);
      shape_origins.add(new p5.Vector(random(-max_width_height + master_current_width, max_width_height - master_current_width), random(-max_width_height + master_current_width, max_width_height - master_current_width)));
    }

    for (var j = 0; j <= 1; j++)
    {
      var current_width = master_current_width;
      var scaler;
      var current_pier;
      if (j == 0)
      {
        scaler = 1;
        current_pier = top_pier;
      } else
      {
        scaler = -1;
        current_pier = bottom_pier;
      }
      push();
      translate(current_pier.x, current_pier.y);
      rect(0, 0, west_end_pier_width, 20);
      rect(0, 0, 20, west_end_pier_height);  


      var shape_number = 4;
      var shape_percentage = 100 / (shape_number );       

      for (var i = 0; i < shape_count; i++)
      {
        var shape_chance = shape_chances[i];

        var shape_origin = shape_origins.get(i);
        shape_origin.y *= scaler;

        if (shape_chance < shape_percentage)
        {
          rect(shape_origin.x, shape_origin.y, current_width, current_width * scaler);
        } else if (shape_chance < shape_percentage * 2)
        {
          ellipse(shape_origin.x, shape_origin.y, current_width, current_width* scaler);
        } else if (shape_chance < shape_percentage * 3)
        {
          rect(shape_origin.x, shape_origin.y, random(0, current_width), random(0, current_width)* scaler);
        } else if (shape_chance < shape_percentage * 4)
        {
          rect(shape_origin.x, shape_origin.y, current_width, current_width);
        }

        current_width *= 0.9;
      }    
      pop();
    }
  }

  noFill();
}

//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_west_end_corner_pier( top_pier,  bottom_pier)
{
  fill(0);

  var west_end_pier_types = 2;
  var type_percentage = 100 / (west_end_pier_types );
  var west_end_pier_chance = random(0, 100); 

  //NotreDame/Laon Style
  if (west_end_pier_chance < 0)
  {
    var pier_height = random(25, 50);
    var base_width = random(10, 20);
    var triangle_width = random(25, 40);
    var buttress_chance = random(0, 100); 

    for (var j = 0; j <= 1; j++)
    {    
      var current_pier;
      if (j == 0)
      {
        current_pier = top_pier;
      } else
      {
        current_pier = bottom_pier;
      }

      rect(current_pier.x, current_pier.y, base_width, pier_height);

      var triangle_top = new p5.Vector(current_pier.x - (base_width / 2), current_pier.y - (pier_height / 2));
      var triangle_meeting = new p5.Vector(current_pier.x - triangle_width, current_pier.y );
      var triangle_bottom = new p5.Vector(current_pier.x - (base_width / 2), current_pier.y + (pier_height / 2));
      triangle(triangle_top.x, triangle_top.y, triangle_meeting.x, triangle_meeting.y, triangle_bottom.x, triangle_bottom.y);

      var number_vaults = (random(5, 8));
      var top_vault;
      var bottom_vault;
      var line_length = p5.Vector.sub(triangle_top, triangle_meeting).mag();
      var move_radius = line_length / number_vaults;
      var vault_radius = move_radius * 0.8;
      for (var i = 0; i < number_vaults; i++)
      {
        top_vault = move_towards(triangle_top, triangle_meeting, move_radius );
        bottom_vault = move_towards(triangle_bottom, triangle_meeting, move_radius );
        ellipse(top_vault.x, top_vault.y, vault_radius, vault_radius);
        ellipse(bottom_vault.x, bottom_vault.y, vault_radius, vault_radius);
      }

      if (buttress_chance < 25)
      {
        var half_buttress_length = random((triangle_width / 2) * 0.5, triangle_width / 2);
        var butress_origin = new p5.Vector(current_pier.x - triangle_width, current_pier.y);

        rect(butress_origin.x, butress_origin.y, half_buttress_length * 2, pier_height / 3);
      }
    }
  }
  //Salisbury/Worchester Style
  else if (west_end_pier_chance < type_percentage * 2)
  {
    var num_images = 2;      
    var image_number = (random(1, num_images+1));

    var dimensions = random(100, 150);

    for (var j = 0; j <= 1; j++)
    {    
      var current_pier;      
      var pier_image;

      pier_image = loadImage("west_end_corner_" + image_number + ".png");
      push();

      if (j == 0)
      {
        current_pier = top_pier;
        translate(current_pier.x - (dimensions * 0.25), current_pier.y);   
        image(pier_image, 0, 0, dimensions, dimensions);
      } else
      {
        current_pier = bottom_pier;
        scale(1, -1);
        translate(current_pier.x - (dimensions * 0.25), -current_pier.y );    
        image(pier_image, 0, 0, dimensions, -dimensions);
      }  

      pop();
    }
  }

  noFill();
}