
//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_apse( origin)
{ 
  var apse_type = random(0, 100);

  if (apse_type < 50)
  {
    draw_circular_apse(origin, 7, vault_height);
  } else if (apse_type < 100)
  {
    draw_rectangular_apse(origin);
  }
}

//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_circular_apse( origin,  number_of_vaults,  apse_radius)
{ 
  var center_point = new p5.Vector(origin.x, origin.y);
  center_point.x += apse_radius * 0.2;
  fill(255);

  //Ellipse at center for the boss
  var boss_radius = vault_width * 0.05;
  fill(0);
  ellipse(center_point.x, center_point.y, boss_radius, boss_radius);
  noFill();

  var radians_to_progress = PI / number_of_vaults;
  var current_angle;

  var last_loop_pillars = [];

  var num_circles = int(number_of_choir_aisles / 2) + 1;

  for (var aisle = 1; aisle <= num_circles; aisle++)
  {    
    current_angle = radians(270);

    var current_point = find_point_on_circle(origin, apse_radius, current_angle);

    line(origin.x, origin.y, current_point.x, current_point.y);

    for (var i = 0; i < number_of_vaults + 2; i++)
    {
      if (i > 1)
      {
        draw_pier(new p5.Vector(current_point.x, current_point.y), 0, pillar_width);
      }

      var next_point = find_point_on_circle(origin, apse_radius, current_angle);

      if (aisle == num_circles && i < number_of_vaults + 1)
      {        
        if (i > 0)
        {
          var y_axis = new p5.Vector(1, 0);

          var side_chapel_origin = new p5.Vector((current_point.x + next_point.x) / 2, (current_point.y + next_point.y) / 2);
          var side_chapel_radius = p5.Vector.dist(current_point, next_point);
          var angle = p5.Vector.sub(current_point, next_point).angleBetween(y_axis);

          if (random(0, 100) > ambalatory_side_chapel_chance)
          { 
            draw_circular_side_chapel(side_chapel_origin, radians(194 - degrees(radians_to_progress)) + (i * radians_to_progress), side_chapel_radius /2);
          } else
          {
            strokeWeight(pillar_width);
            line(current_point.x, current_point.y, next_point.x, next_point.y);
            strokeWeight(1);
          }
        }

        line(current_point.x, current_point.y, next_point.x, next_point.y);
      } else if (i < number_of_vaults + 1)
      {
        line(current_point.x, current_point.y, next_point.x, next_point.y);
      }     

      if (aisle == 1 )
      {
        line(current_point.x, current_point.y, center_point.x, center_point.y);
        if (!last_loop_pillars[aisle]) last_loop_pillars[aisle] = []
        last_loop_pillars[aisle][i] = current_point;
      } else
      {        
        if (i > 1)
        {
          if (!last_loop_pillars[aisle]) last_loop_pillars[aisle] = []
          if (!last_loop_pillars[aisle-1]) last_loop_pillars[aisle-1] = []

          
          var vault_center = new p5.Vector(0, 0);
          vault_center.x = (current_point.x + last_loop_pillars[aisle][i - 1].x + last_loop_pillars[aisle - 1][i].x + last_loop_pillars[aisle - 1][i - 1].x) / 4;
          vault_center.y = (current_point.y + last_loop_pillars[aisle][i - 1].y + last_loop_pillars[aisle - 1][i].y + last_loop_pillars[aisle - 1][i - 1].y) / 4;

          var internal_vault_offset = -0.1;

          var direction_to_center = p5.Vector.sub(last_loop_pillars[aisle][i - 1], vault_center);
          var vault_top_left = p5.Vector.add(last_loop_pillars[aisle][i - 1], direction_to_center.mult(internal_vault_offset));

          direction_to_center = p5.Vector.sub(current_point, vault_center);
          var vault_top_right = p5.Vector.add(current_point, direction_to_center.mult(internal_vault_offset));

          direction_to_center = p5.Vector.sub(last_loop_pillars[aisle - 1][i - 1], vault_center);
          var vault_bottom_left = p5.Vector.add(last_loop_pillars[aisle - 1][i - 1], direction_to_center.mult(internal_vault_offset));

          direction_to_center = p5.Vector.sub(last_loop_pillars[aisle - 1][i], vault_center);
          var vault_bottom_right = p5.Vector.add(last_loop_pillars[aisle - 1][i], direction_to_center.mult(internal_vault_offset));

          quad(vault_top_left.x, vault_top_left.y, vault_top_right.x, vault_top_right.y, vault_bottom_right.x, vault_bottom_right.y, vault_bottom_left.x, vault_bottom_left.y); 

          //Vaulting
          line(current_point.x, current_point.y, vault_center.x, vault_center.y);
          line(last_loop_pillars[aisle][i - 1].x, last_loop_pillars[aisle][i - 1].y, vault_center.x, vault_center.y);
          line(last_loop_pillars[aisle - 1][i].x, last_loop_pillars[aisle - 1][i].y, vault_center.x, vault_center.y);
          line(last_loop_pillars[aisle - 1][i - 1].x, last_loop_pillars[aisle - 1][i - 1].y, vault_center.x, vault_center.y);

          //Ellipse at center for the boss
          fill(0);
          ellipse(vault_center.x, vault_center.y, boss_radius, boss_radius);
          noFill();
        }
        
        if (!last_loop_pillars[aisle]) last_loop_pillars[aisle] = []
        if (!last_loop_pillars[aisle-1]) last_loop_pillars[aisle-1] = []

        line(current_point.x, current_point.y, last_loop_pillars[aisle-1][i].x, last_loop_pillars[aisle-1][i].y);
        last_loop_pillars[aisle][i] = current_point;
      }

      current_point = next_point;
      current_angle += radians_to_progress;
    }

    apse_radius += vault_height;
  }
}

//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_rectangular_apse( origin)
{ 
  var number_of_apse_aisles = number_of_choir_aisles - (2 * int(random(1, 2)));
  if(number_of_apse_aisles < 0)
    return;
  var mid_apse_aisle = array_aisle_list[number_of_apse_aisles];
  var number_apse_vaults = int(random(1, 4));
  var apse_width =vault_width * number_apse_vaults;
  var apse_height = (vault_height * 2) + (vault_height * (number_of_apse_aisles - 1));
  var diff_between_choir = number_of_choir_aisles - number_of_apse_aisles;

  if(diff_between_choir > 1)
  {
    for(var i =1; i <= diff_between_choir; i++)
    {
      if(i % 2==0)
      {
        draw_outisde_wall( new p5.Vector(origin.x, origin.y - (apse_height/ 2) - (vault_height/2)), pillar_width, vault_height, 1, 4, true);
      }
      else
      {
        draw_outisde_wall( new p5.Vector(origin.x, origin.y + (apse_height/ 2) + (vault_height/2)), pillar_width, vault_height, 1, 4, true);
      }
    }
  } 

  draw_outisde_wall( new p5.Vector(origin.x + (number_apse_vaults * vault_width), origin.y), pillar_width, apse_height, number_of_apse_aisles, 4, true);
 
  origin.x += vault_width /2;

  if (number_of_apse_aisles > 1)
  {
    origin.y -= (vault_height * int((number_of_apse_aisles) / 2)) + int(vault_height / 2);
  }

  draw_nave(origin, apse_width, vault_height, number_apse_vaults, number_of_apse_aisles, mid_apse_aisle, nave_ribbing_type, ribbing_normal); 
}

//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_circular_side_chapel( origin,  starting_angle,  radius)
{
  var radians_to_progress = PI / number_of_vaults;
  var current_angle = starting_angle;

  var center_point = find_point_on_circle(origin, radius * 0.2, starting_angle + HALF_PI);

  var current_point = find_point_on_circle(origin, radius, current_angle);
  for (var i = 0; i < number_of_vaults + 2; i++)
  {      
    //draw_pier(new PVector(current_point.x, current_point.y), 0, pillar_width);

    var next_point = find_point_on_circle(origin, radius, current_angle);

    if (i < number_of_vaults + 1)
    {
      strokeWeight(pillar_width - 3);
      line(current_point.x, current_point.y, next_point.x, next_point.y);
      strokeWeight(1);
    }

    line(center_point.x, center_point.y, current_point.x, current_point.y);

    current_point = next_point;
    current_angle += radians_to_progress;
  }
}