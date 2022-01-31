//wall_generator.js


//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_wall( origin,  wall_width,  wall_height)
{
  fill(0);

  rect(origin.x, origin.y, wall_width, wall_height);
  
  noFill();
}

//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_outisde_wall( origin,  wall_width,  wall_height,  number_of_vaults,  wall_side,  vertical)
{
  var vault_width;
  var vault_height;  
 
  draw_wall(origin, wall_width, wall_height);
   
  if(vertical)
  {
    vault_height = wall_height / number_of_vaults;
    vault_width = wall_width;
  }
  else
  {      
    vault_width = wall_width / number_of_vaults;
    vault_height = wall_height;
  }
  
  fill(0);
   var buttress_origin;
  if(vertical)
  {
    buttress_origin = new p5.Vector(origin.x, origin.y - (wall_height / 2));
    if ((wall_side & 2) != 0)
    {  
      buttress_origin.x -= wall_width;
    }
    if ((wall_side & 4) != 0)
    {  
      buttress_origin.x += wall_width; 
    }
  }
  else
  {   
     buttress_origin = new p5.Vector(origin.x - vault_width, origin.y);
    buttress_origin.x -= (wall_width / 2) - vault_width;
    if ((wall_side & 1) != 0)
    {  
      buttress_origin.y -= wall_height;
    }
    if ((wall_side & 8) != 0)
    {  
      buttress_origin.y += wall_height;

    }
  }
  
  for (var i = 0; i < number_of_vaults + 1; i++)
  {  
    draw_outside_buttress(buttress_origin, buttress_size, wall_side);
    if(vertical)
    {
      buttress_origin.y += vault_height;
    }
    else
    {      
      buttress_origin.x += vault_width;
    }
  }
  
  noFill();
}