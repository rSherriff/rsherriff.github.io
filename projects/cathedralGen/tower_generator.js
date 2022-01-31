//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_west_end()
{    
  var west_end_types = 2;
  var type_percentage = 100 / (west_end_types );
  var west_end_chance = random(0,100); 
  var origin;
  
  if(number_of_aisles == 1)
  {
    draw_one_vault_end(new p5.Vector(nave_origin.x - (west_end_vault_width / 2) - (vault_width / 2), halfway_y));
    return;
  }
  
  if(west_end_chance < type_percentage)
  {
    west_end_aisles = number_of_aisles - 2;
        
    if (west_end_aisles > 1)
    {
      origin = new p5.Vector(nave_origin.x - (west_end_vault_width / 2) - (vault_width / 2), halfway_y - ((west_end_aisles * vault_height) /2));
    } 
    else
    {
      origin = new p5.Vector(nave_origin.x - (west_end_vault_width / 2) - (vault_width / 2), halfway_y - ((west_end_aisles * vault_height) /2) + (vault_height / 2));
    } 

    draw_towered_west_end(origin);
  }
  else if(west_end_chance < type_percentage * 2)
  {
    west_end_aisles = number_of_aisles;
    
    if (west_end_aisles > 1)
    {
      origin = new p5.Vector(nave_origin.x - (west_end_vault_width / 2) - (vault_width / 2), halfway_y - ((west_end_aisles * vault_height) /2) );
    } 
    else
    {
      origin = new p5.Vector(nave_origin.x - (west_end_vault_width / 2) - (vault_width / 2), halfway_y - ((west_end_aisles * vault_height) /2) + (vault_height / 2));
    }
    
    draw_curtained_west_end(origin, ribbing_normal);
  }
}

//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_towered_west_end( origin)
{
  var north_tower_origin = new p5.Vector(origin.x, origin.y);

  if (west_end_aisles > 1)
  {
    north_tower_origin.y -= west_end_vault_height - west_end_stick_out;
  } else
  {
    north_tower_origin.y -= west_end_vault_height * 1.5;
  }  
  draw_tower(north_tower_origin, west_end_vault_width, west_end_vault_height + (west_end_stick_out ), true);

  draw_nave(origin, west_end_vault_width, west_end_vault_height, 1, west_end_aisles, array_aisle_list[west_end_aisles], nave_ribbing_type, ribbing_normal );  

  var south_tower_origin = new p5.Vector(origin.x, origin.y);
  if (west_end_aisles > 1)
  {
    south_tower_origin.y += (west_end_vault_height * (west_end_aisles + 1));
  } 
  else
  {
    south_tower_origin.y += west_end_vault_height * 1.5;
  }  
  draw_tower(south_tower_origin, west_end_vault_width, west_end_vault_height, false);
}

//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_one_vault_end( origin)
{
   draw_tower(origin, vault_height * 2, vault_height * 2, true);
}

//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_curtained_west_end( origin,  ribbing_type)
{
  if(west_end_aisles == 3)
  {
    draw_nave_matching_west_end(origin, ribbing_type);
  }
  else
  {
    draw_nave_non_matching_west_end(origin, ribbing_type);
  }
}

//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_nave_matching_west_end( origin,  ribbing_type)
{
  var current_nave_x = origin.x;
  var current_nave_y = origin.y;
  var m_aisle = array_aisle_list[west_end_aisles];
  
  var pier_points = []
    
  if(west_end_aisles > 1)
  {
    draw_outer_aisle(new p5.Vector(current_nave_x, current_nave_y - west_end_stick_out), west_end_vault_width, west_end_vault_height + (west_end_stick_out * 2), 1, 1, 1, false, ribbing_type);
    pier_points.push(new p5.Vector(current_nave_x - (west_end_vault_width / 2), current_nave_y - ((west_end_vault_height + (west_end_stick_out * 2)) / 2) - west_end_stick_out));
    for (var i = 0; i < 1; i++)
    {
      if(i == m_aisle)
      {
        current_nave_y += west_end_vault_height * 1.5;
        draw_vault_arcade(new p5.Vector(current_nave_x, current_nave_y), west_end_vault_width, west_end_vault_height * 2, 1, false, 0);
  
        pier_points.push(new p5.Vector(current_nave_x - (west_end_vault_width / 2), current_nave_y + west_end_vault_height));
        pier_points.push(new p5.Vector(current_nave_x - (west_end_vault_width / 2), current_nave_y - west_end_vault_height));
        
        current_nave_y += west_end_vault_height / 2;
      }
      else
      {
        current_nave_y += west_end_vault_height;
        draw_vault_arcade(new p5.Vector(current_nave_x, current_nave_y), west_end_vault_width, west_end_vault_height, 1, false, 0);
        
        if(i > m_aisle)
        {
          pier_points.push(new p5.Vector(current_nave_x - (west_end_vault_width / 2), current_nave_y + (west_end_vault_height / 2)));
        }
        else
        {
          pier_points.push(new p5.Vector(current_nave_x - (west_end_vault_width / 2), current_nave_y - (west_end_vault_height / 2)));
        }
      }
    }
    current_nave_y += west_end_vault_height;
    draw_outer_aisle(new p5.Vector(current_nave_x, current_nave_y + west_end_stick_out), west_end_vault_width, west_end_vault_height + (west_end_stick_out * 2), 1, 8, 8, false, ribbing_type);
    pier_points.push(new p5.Vector(current_nave_x - (west_end_vault_width / 2), current_nave_y + ((west_end_vault_height + (west_end_stick_out * 2)) / 2) + west_end_stick_out));
  }
  else
  {
     draw_vault_arcade(new p5.Vector(current_nave_x, current_nave_y), west_end_vault_width, west_end_vault_height * 2, 1, false, 0);
     pier_points.push(new p5.Vector(current_nave_x - (west_end_vault_width / 2), current_nave_y + (west_end_vault_height / 2)));
     pier_points.push(new p5.Vector(current_nave_x - (west_end_vault_width / 2), current_nave_y - (west_end_vault_height / 2)));
  }
  
 draw_west_end_piers(pier_points);
}

//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_nave_non_matching_west_end( origin,  ribbing_type)
{
  west_end_stick_out =0;
  
  var current_nave_x = origin.x;
  var current_nave_y = origin.y;
  var m_aisle = array_aisle_list[west_end_aisles];
  
  var pier_points = []
  
  draw_outer_aisle(new p5.Vector(current_nave_x, current_nave_y + (west_end_vault_height * 0.5)), west_end_vault_width, west_end_vault_height * 2, 1, 1, 1, false, ribbing_type);
  pier_points.push(new p5.Vector(current_nave_x - (west_end_vault_width / 2), current_nave_y - ((west_end_vault_height + (west_end_stick_out * 2)) / 2) - west_end_stick_out));
 
  current_nave_y += west_end_vault_height  * 2.5;
  draw_vault_arcade(new p5.Vector(current_nave_x, current_nave_y), west_end_vault_width, west_end_vault_height * 2, 1, false, 0);

  pier_points.push(new p5.Vector(current_nave_x - (west_end_vault_width / 2), current_nave_y + west_end_vault_height));
  pier_points.push(new p5.Vector(current_nave_x - (west_end_vault_width / 2), current_nave_y - west_end_vault_height));
  
  current_nave_y += west_end_vault_height;
   
  current_nave_y += west_end_vault_height;
  draw_outer_aisle(new p5.Vector(current_nave_x, current_nave_y + west_end_stick_out), west_end_vault_width, west_end_vault_height * 2, 1, 8, 8, false, ribbing_type);
  pier_points.push(new p5.Vector(current_nave_x - (west_end_vault_width / 2), current_nave_y + (west_end_vault_height / 2)));
  
  draw_west_end_piers(pier_points);
}

//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_west_end_piers( piers)
{
  var mid_point = piers.length / 2;
  var count = 1;
  for(var i = 0; i < piers.length; i++)
  {
    if(count == 1)
    {
      draw_west_end_corner_pier(piers[i], piers[(piers.length - 1)]);
    }
    else if(count == mid_point)
    {
      draw_west_end_pier(piers[i], piers[(i+1)]);
    }
    else if(count < mid_point)
    {
      draw_west_end_pier(piers[i], piers[(piers.length - 1 - i)]);
    }
    count++;
  }  
}

//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_tower( origin,  tower_width,  tower_height,  northern)
{
  var half_width = tower_width / 2;
  var half_height = tower_height /2;

  rect(origin.x, origin.y, tower_width, tower_height);
  rect(origin.x, origin.y, tower_width - (inner_rectangle_inset_width * 2), tower_height - (inner_rectangle_inset_height * 2));

  //Lines for vaulting
  line(origin.x - half_width, origin.y - half_height, origin.x, origin.y);
  line(origin.x + half_width, origin.y - half_height, origin.x, origin.y);
  line(origin.x + half_width, origin.y + half_height, origin.x, origin.y);
  line(origin.x - half_width, origin.y + half_height, origin.x, origin.y);

  fill(0);  

  var wall_thickness = 10;

  var top_left = new p5.Vector(origin.x - half_width, origin.y - half_height);
  var top_right = new p5.Vector(origin.x + half_width, origin.y - half_height);
  var bottom_left = new p5.Vector(origin.x - half_width, origin.y + half_height );
  var bottom_right = new p5.Vector(origin.x + half_width, origin.y + half_height );

  var pier_width = 35;

  draw_large_pier(bottom_left, pier_width);
  draw_large_pier(top_right, pier_width);
  draw_large_pier(top_left, pier_width);
  draw_large_pier(bottom_right, pier_width);

  draw_flat_large_pier(new p5.Vector(top_left.x, top_left.y + half_height), pier_width, 4);

  if (northern)
  {      
    draw_flat_large_pier(new p5.Vector(top_left.x + half_width, top_left.y), pier_width, 1);
    draw_flat_small_pier(new p5.Vector(bottom_left.x + half_width, bottom_left.y), pier_width, 3);
  } else
  {      
    draw_flat_large_pier(new p5.Vector(bottom_left.x + half_width, bottom_left.y), pier_width, 3);      
    draw_flat_small_pier(new p5.Vector(top_left.x + half_width, top_left.y), pier_width, 1);
  }

  var mid_right = new p5.Vector(top_right.x, top_right.y);
  mid_right.y += half_height;    
  rect(mid_right.x, mid_right.y, wall_thickness, tower_height);

  noFill();
}