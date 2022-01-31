//vault_generator.js


//-------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
function draw_nave( origin,  n_width,  v_height,  num_vaults,  num_aisles,  m_aisle,  m_ribbing_type,  aisle_ribbing_type)
{    
  var current_nave_x = origin.x;
  var current_nave_y = origin.y;
  
  if(num_aisles > 1)
  {
    draw_outer_aisle(new p5.Vector(current_nave_x, current_nave_y), n_width, v_height, num_vaults, 1, 1, false, ribbing_normal);
    for (var i = 0; i < num_aisles - 2; i++)
    {
      if(i == m_aisle)
      {
        current_nave_y += v_height * 1.5;
        draw_vault_arcade(new p5.Vector(current_nave_x, current_nave_y), n_width, v_height * 2, num_vaults, false, m_ribbing_type);
  
        current_nave_y += v_height / 2;
      }
      else
      {
        current_nave_y += v_height;
        draw_vault_arcade(new p5.Vector(current_nave_x, current_nave_y), n_width, v_height, num_vaults, false,aisle_ribbing_type);
      }
    }
    current_nave_y += v_height;
    draw_outer_aisle(new p5.Vector(current_nave_x, current_nave_y), n_width, v_height, num_vaults, 8, 8, false, ribbing_normal);
  }
  else
  {
     draw_outer_aisle(new p5.Vector(current_nave_x, current_nave_y), n_width, v_height * 2, num_vaults, 0, 9, false, m_ribbing_type);
  }

}

//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_vault( origin, vault_width, vault_height, pier_placement, pier_width, pier_type, ribbing_type)
{
  var half_vault_width = vault_width / 2;
  var half_vault_height = vault_height / 2;
  var boss_radius = vault_width * 0.05;
  
  //Ellipse at center for the boss
  ellipse(origin.x, origin.y, boss_radius, boss_radius);

  //Container rectangles, outer, then inner
  rect(origin.x, origin.y, vault_width, vault_height);
  rect(origin.x, origin.y, vault_width - (inner_rectangle_inset_width * 2), vault_height - (inner_rectangle_inset_height * 2));

  draw_ribbing(ribbing_type, origin, vault_width, vault_height);
  
  //Piers
  //Pier placement is a bitmask. starts topleft and goes clockwise
  if ((pier_placement & 1) != 0)
  {
    draw_pier(new p5.Vector(origin.x - half_vault_width, origin.y - half_vault_height), pier_type, pier_width);
  }
  if ((pier_placement & 2) != 0)
  {
    draw_pier(new p5.Vector(origin.x + half_vault_width, origin.y - half_vault_height), pier_type, pier_width);
  }
  if ((pier_placement & 4) != 0)
  {
    draw_pier(new p5.Vector(origin.x + half_vault_width, origin.y + half_vault_height), pier_type, pier_width);
  }
  if ((pier_placement & 8)!= 0)
  {
    draw_pier(new p5.Vector(origin.x - half_vault_width, origin.y + half_vault_height), pier_type, pier_width);
  }
}

//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_vault_arcade(origin, arcade_width, arcade_height,  number_of_vaults,  vertical,  ribbing_type)
{
  var temp_vault_height;
  var temp_vault_width;
  var pier_type = circle_pier;
  var running_columns;
  var terminating_columns = 15;
  
  if(vertical)
  {
    temp_vault_height = arcade_height / number_of_vaults;
    temp_vault_width = arcade_width;
    running_columns = 3;
  }
  else
  {      
    temp_vault_width = arcade_width / number_of_vaults;
    temp_vault_height = arcade_height;
    running_columns = 9;
  }

  for (var i = 0; i < number_of_vaults - 1; i++)
  {
    draw_vault(origin, temp_vault_width, temp_vault_height, running_columns, pillar_width, pier_type, ribbing_type);
    if(vertical)
    {
      origin.y += temp_vault_height;
    }
    else
    {      
      origin.x += temp_vault_width;
    }
  }

  draw_vault(origin, temp_vault_width, temp_vault_height, terminating_columns, pillar_width, pier_type, ribbing_type);
}

//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_crossing_arcade( origin,  arcade_width,  arcade_height,  number_of_vaults,  vertical,  mid_vault,  m_ribbing_type,  aisle_ribbing_type)
{
  var temp_vault_height;
  var temp_vault_width;
  var pier_type; 
  if(mid_vault)
  {
    pier_type = crossing_pier;
  }
  else
  {
    pier_type = circle_pier;
  }
  
  var terminating_columns = 15;
  
  if(vertical)
  {
    temp_vault_height = arcade_height / number_of_vaults;
    temp_vault_width = arcade_width;
  }
  else
  {      
    temp_vault_width = arcade_width / number_of_vaults;
    temp_vault_height = arcade_height;
  }

  if(!mid_vault)
  {
    draw_vault(origin, temp_vault_width, temp_vault_height, terminating_columns, pillar_width, pier_type, m_ribbing_type);
  }
  else
  {
    if(temp_vault_width - temp_vault_height < 20 && temp_vault_width - temp_vault_height > -20)
    {
     draw_vault(origin, temp_vault_width, temp_vault_height, terminating_columns, pillar_width, pier_type, 4);
    }
    else
    {
      draw_vault(origin, temp_vault_width, temp_vault_height, terminating_columns, pillar_width, pier_type, m_ribbing_type);
    }
  }  
}

//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_outer_aisle( origin,  arcade_width,  arcade_height,  number_of_vaults,  pier_sides,  wall_sides,  vertical,  ribbing_type)
{

  var vault_width;
  var vault_height;  
  var pier_type = outer_buttress;
  
  var vault_wall_sides = 0;
  //Side Chapels!
  if(nave_side_chapels)
  {
    if(!vertical)
    {
      vault_wall_sides = 6;   
    }
  }
  
  if(vertical)
  {
    vault_height = arcade_height / number_of_vaults;
    vault_width = arcade_width;
  }
  else
  {      
    vault_width = arcade_width / number_of_vaults;
    vault_height = arcade_height;
  }
  
  for (var i = 0; i < number_of_vaults - 1; i++)
  {
    draw_walled_vault(origin, vault_width, vault_height, pier_sides, pillar_width, pier_type, vault_wall_sides, ribbing_type);
    if(vertical)
    {
      origin.y += vault_height;
    }
    else
    {      
      origin.x += vault_width;
    }
  }

  if (pier_sides == 1)
  {
    if(vertical)
    {
      draw_walled_vault(origin, vault_width, vault_height, 9, pillar_width, pier_type, vault_wall_sides, ribbing_type);
    }
    else
    {
      draw_walled_vault(origin, vault_width, vault_height, 3, pillar_width, pier_type, vault_wall_sides, ribbing_type);
    }
  } 
  else if (pier_sides == 8)
  {
    draw_walled_vault(origin, vault_width, vault_height, 12, pillar_width, pier_type, vault_wall_sides, ribbing_type);
  }
  else if (pier_sides == 2)
  {
    if(vertical)
    {
      draw_walled_vault(origin, vault_width, vault_height, 6, pillar_width, pier_type, vault_wall_sides, ribbing_type);
    }
  }
  else if(pier_sides == 0)
  {
    draw_walled_vault(origin, vault_width, vault_height, 0, pillar_width, pier_type, vault_wall_sides, ribbing_type);
  }
 //<>//
  fill(0);  
  if ((wall_sides & 1) != 0)
  {    
    draw_outisde_wall(new p5.Vector(origin.x - (arcade_width / 2) + (vault_width / 2), origin.y - (vault_height / 2)), arcade_width, pillar_width, number_of_vaults, 1, false);
  }
  if ((wall_sides & 2) != 0)
  {
    draw_outisde_wall(new p5.Vector(origin.x - (vault_width / 2), origin.y - (arcade_height / 2) + (vault_height / 2)), pillar_width, vault_height,number_of_vaults,2,true);
  }
  if ((wall_sides & 4) != 0)
  {
    draw_outisde_wall(new p5.Vector(origin.x + (vault_width / 2), origin.y - (arcade_height / 2) + (vault_height / 2)), pillar_width, vault_height, number_of_vaults,4,true);
  }
  if ((wall_sides & 8)!= 0)
  {
    draw_outisde_wall(new p5.Vector(origin.x - (arcade_width / 2) + (vault_width / 2), origin.y + (vault_height / 2)), arcade_width, pillar_width, number_of_vaults,8,false);
  }
  noFill();
}

//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_walled_vault( origin,  vault_width,  vault_height,  pier_placement,  pier_width,  pier_type,  wall_sides,  ribbing_type)
{
  if(wall_sides == 0)
  {
    draw_vault(origin, vault_width, vault_height, pier_placement, pier_width, pier_type, ribbing_type);
  }
  else
  {
    draw_vault(origin, vault_width, vault_height, pier_placement, pier_width, pier_type, ribbing_type);
  }
  
  fill(0);
  if ((wall_sides & 1) != 0)
  {    
    rect(origin.x - (vault_width / 2) + (interior_wall_width / 2), origin.y - (vault_height / 2), vault_width, interior_wall_width);
  }
  if ((wall_sides & 2) != 0)
  {
    rect(origin.x - (vault_width / 2), origin.y - (vault_height / 2) + (vault_height / 2), interior_wall_width, vault_height);
  }
  if ((wall_sides & 4) != 0)
  {
    rect(origin.x + (vault_width / 2), origin.y - (vault_height / 2) + (vault_height / 2), interior_wall_width, vault_height);
  }
  if ((wall_sides & 8)!= 0)
  {
    rect(origin.x - (vault_width / 2) + (vault_width / 2), origin.y + (vault_height / 2), vault_width, interior_wall_width);
  }
  noFill();
}


//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_cloister( origin,  start_pos,  cloister_width, cloister_height, number_of_vaults_wide,  number_of_vaults_high )
{  
  var current_pos = start_pos;
  var current_vector = new p5.Vector(origin.x, origin.y);
  for(var i = 0; i < 4; i++)
  {
    if(current_pos == 1)
    {
      if(start_pos != 1)
      {
        draw_ellipse(current_vector); 
      }
      draw_cloister_aisle(current_vector, cloister_width, vault_height, number_of_vaults_wide, 8, 1,  false, (cloister_height / number_of_vaults_high));
      current_vector.y += (vault_height) / 2;
    }
    else if (current_pos == 2)
    {
      if(start_pos != 2)
      {
        current_vector.y += (cloister_height /number_of_vaults_high) / 2;
      }

      draw_cloister_aisle(current_vector, vault_width, cloister_height,  number_of_vaults_high, 8, 4, true, (cloister_width / number_of_vaults_wide));
      current_vector.y += ((cloister_height / number_of_vaults_high) / 2) + (vault_height / 2);
    }
    else if(current_pos == 3)
    {
      if(start_pos != 3)
      {
        current_vector.x -= cloister_width - (cloister_width /number_of_vaults_wide);
      }
      draw_cloister_aisle(current_vector, cloister_width, vault_height, number_of_vaults_wide, 8, 8, false, (cloister_height / number_of_vaults_high));
      current_vector.y -= (vault_height) / 2;
      current_vector.x -= cloister_width - (cloister_width / number_of_vaults_wide);
    }
    else if (current_pos == 4)
    {      
      if(start_pos != 4)
      {
        current_vector.y -= cloister_height - ((cloister_height /number_of_vaults_high) / 2);
      }
      draw_cloister_aisle(current_vector, vault_width, cloister_height,  number_of_vaults_high, 8, 2, true, (cloister_width / number_of_vaults_wide));
      
    }
    
    if(current_pos == 4)
    {
      current_pos = 1;
    }
    else
    {
      current_pos++;
    }
  }
  
}

//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_cloister_aisle(origin, arcade_width, arcade_height, number_of_vaults, pier_sides,  wall_sides,  vertical,  perpendicular_aisle_offset)
{
  var vault_width;
  var vault_height;  
  var pier_type = outer_buttress;
  
  var vault_wall_sides = 0;
  
  if(vertical)
  {
    vault_height = arcade_height / number_of_vaults;
    vault_width = arcade_width;
  }
  else
  {      
    vault_width = arcade_width / number_of_vaults;
    vault_height = arcade_height;
  }
  
  for (var i = 0; i < number_of_vaults - 1; i++)
  {
    draw_walled_vault(origin, vault_width, vault_height, pier_sides, pillar_width, pier_type, vault_wall_sides, ribbing_normal);
    if(vertical)
    {
      origin.y += vault_height;
    }
    else
    {      
      origin.x += vault_width;
    }
  }

  if (pier_sides == 1)
  {
    if(vertical)
    {
      draw_walled_vault(origin, vault_width, vault_height, 16, pillar_width, pier_type, vault_wall_sides, ribbing_normal);
    }
    else
    {
      draw_walled_vault(origin, vault_width, vault_height, 16, pillar_width, pier_type, vault_wall_sides, ribbing_normal);
    }
  } 
  else if (pier_sides == 8)
  {
    draw_walled_vault(origin, vault_width, vault_height, 16, pillar_width, pier_type, vault_wall_sides, ribbing_normal);
  }
  else if (pier_sides == 2)
  {
    if(vertical)
    {
      draw_walled_vault(origin, vault_width, vault_height, 16, pillar_width, pier_type, vault_wall_sides, ribbing_normal);
    }
  }
  
  fill(0);  
  if ((wall_sides & 1) != 0)
  {    
    draw_outisde_wall(new p5.Vector(origin.x - (arcade_width / 2) + (vault_width / 2), origin.y - (vault_height / 2)), arcade_width, pillar_width, number_of_vaults, wall_sides, false);
  }
  if ((wall_sides & 2) != 0)
  {
     wall_origin = new p5.Vector(origin.x - (vault_width / 2), origin.y - ((arcade_height / number_of_vaults) /2) * (number_of_vaults -1));
    draw_outisde_wall(wall_origin, pillar_width, arcade_height + (perpendicular_aisle_offset * 3),number_of_vaults,wall_sides,true);
  }
  if ((wall_sides & 4) != 0)
  {
     wall_origin = new p5.Vector(origin.x + (vault_width / 2), origin.y - ((arcade_height / number_of_vaults) /2) * (number_of_vaults -1));
     draw_outisde_wall(wall_origin, pillar_width, arcade_height + (perpendicular_aisle_offset * 3), number_of_vaults,wall_sides,true);
  }
  if ((wall_sides & 8)!= 0)
  {
    draw_outisde_wall(new p5.Vector(origin.x - (arcade_width / 2) + (vault_width / 2), origin.y + (vault_height / 2)), arcade_width, pillar_width, number_of_vaults,wall_sides,false);
  }
  noFill();
}

//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_boss( origin,  radius)
{
  fill(bg_colour);

  ellipse(origin.x, origin.y, radius, radius);
  
  noFill();
}