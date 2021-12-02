
//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_north_transept( origin,  final_transept)
{
  var x_origin = origin.x;  
  var y_origin = origin.y;

  draw_north_transept_end(origin);
  
  y_origin += vault_height;
      
  for(var j = 0; j < number_transpet_vault - 1; j++)
  {
    for(var i = 0; i < vaults_wide_transpet; i++)
    {
      var transept_vault_width;
      if(i == mid_transept_aisle)
      {
        transept_vault_width = vault_width * 2;
      }
      else
      {
        transept_vault_width = vault_width;
      }
            
      var wall_sides =0;      
      if(i == 0 && y_origin < nave_origin.y - 15)
      {
        wall_sides += 2;
      }
      
      if(final_transept)
      {
        if (i == vaults_wide_transpet - 1 && y_origin < choir_origin.y - 15)
        {
          wall_sides += 4;
        }
      }
      else
      {
        if (i == vaults_wide_transpet - 1 && y_origin < nave_origin.y - 15)
        {
          wall_sides += 4;
        }
      }
      
      var pier_side = 2;
      if(i == vaults_wide_transpet - 1)
      {
        pier_side = 0;
      }
      
      draw_outer_aisle(new p5.Vector(x_origin,y_origin), transept_vault_width, vault_height,1, pier_side, wall_sides, true, 0);
              
      if( (i + 1) == mid_transept_aisle)
      {
         x_origin +=  vault_width * 1.5;
      }
      else if ( i == mid_transept_aisle)
      {
         x_origin +=   vault_width *1.5;
      }
      else
      {
          x_origin += vault_width;
      }         
    }
    
    y_origin += vault_height;
    x_origin = origin.x;
  }
}



//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_south_transept( origin,  final_transept)
{
  var x_origin = origin.x;  
  var y_origin = origin.y;
  
  draw_south_transept_end(origin);
  
  y_origin -= vault_height;
  
  var meet_nave_row = number_transpet_vault - ((number_of_aisles - 1) / 2);
  var meet_choir_row = 0;
  
  if(number_of_aisles != 1)
  {
   meet_choir_row = meet_nave_row + ((number_of_aisles - number_of_choir_aisles) / 2);
  }
  else
  {
    meet_choir_row = meet_nave_row + ((number_of_aisles - number_of_choir_aisles));
  }
      
  if(vaults_wide_transpet == 1)
  {
    meet_nave_row--;
    meet_choir_row--;
  }  
  
  if(!final_transept)
  {
    meet_choir_row = meet_nave_row;
  }
  
  for(var j = 0; j < number_transpet_vault - 1; j++)
  {
    for(var i = 0; i < vaults_wide_transpet; i++)
    {
      var transept_vault_width;
      if(i == mid_transept_aisle)
      {
        transept_vault_width = vault_width * 2;
      }
      else
      {
        transept_vault_width = vault_width;
      }
            
      var wall_sides =0;      
      if(i == 0 && y_origin > nave_origin.y + nave_height - vault_height + 15)
      {
        wall_sides += 2;
      }
      
      if(final_transept)
      {
        var choir_height = ((number_of_choir_aisles - 1) * vault_height) + (vault_height * 2);
        if (i == vaults_wide_transpet - 1 && y_origin > (choir_origin.y + choir_height - vault_height + 15))
        {
          wall_sides += 4;
        }
      }
      else
      {
        if (i == vaults_wide_transpet - 1 && y_origin > (nave_origin.y + nave_height - vault_height + 15))
        {
          wall_sides += 4;
        }
      }
      
      var pier_side = 2;
      if(i == vaults_wide_transpet - 1)
      {
        pier_side = 0;
      }

      draw_outer_aisle(new p5.Vector(x_origin,y_origin), transept_vault_width, vault_height, 1, pier_side, wall_sides, true, 0);
               
      if( (i + 1) == mid_transept_aisle)
      {
         x_origin +=  vault_width * 1.5;
      }
      else if ( i == mid_transept_aisle)
      {
         x_origin +=   vault_width *1.5;
      }
      else
      {
          x_origin += vault_width;
      }         
    }
    
    y_origin -= vault_height;
    x_origin = origin.x;
  }
}

//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_north_transept_end( origin)
{
  var x_origin = origin.x;  
  var y_origin = origin.y;
  for(var i = 0; i < vaults_wide_transpet; i++)
    {
      var transept_vault_width;
      if(i == mid_transept_aisle)
      {
        transept_vault_width = vault_width * 2;        
      }
      else
      {
        transept_vault_width = vault_width;
      }      
            
      if(i == 0)
      {
        draw_wall(new p5.Vector(x_origin - (transept_vault_width / 2) ,y_origin), pillar_width, vault_height);
      }
      if( i == (vaults_wide_transpet - 1))
      {
         draw_wall(new p5.Vector(x_origin + (transept_vault_width / 2) ,y_origin), pillar_width, vault_height);
      }
      draw_wall(new p5.Vector(x_origin, origin.y - (vault_height /2)), transept_vault_width + (pillar_width), pillar_width);
            
      var wall_sides = 1;
      if(i == 0)
      {
        wall_sides += 2;
      }
      
      if(i == vaults_wide_transpet - 1)
      {
        wall_sides += 4;
      }      
      
      draw_vault(new p5.Vector(x_origin,y_origin), transept_vault_width, vault_height, 0, 0, 1,0);
              
      if( (i + 1) == mid_transept_aisle)
      {
         x_origin +=  vault_width * 1.5;
      }
      else if ( i == mid_transept_aisle)
      {
         x_origin +=   vault_width *1.5;
      }
      else
      {
          x_origin += vault_width;
      }
    }
}

//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_south_transept_end( origin)
{
  var x_origin = origin.x;  
  var y_origin = origin.y;
  
  for(var i = 0; i < vaults_wide_transpet; i++)
    {
      var transept_vault_width;
      if(i == mid_transept_aisle)
      {
        transept_vault_width = vault_width * 2;       
      }
      else
      {
        transept_vault_width = vault_width;
      }
      
      if(i == 0)
      {
        draw_wall(new p5.Vector(x_origin - (transept_vault_width / 2) ,y_origin), pillar_width, vault_height);
      }
      if( i == (vaults_wide_transpet - 1))
      {
         draw_wall(new p5.Vector(x_origin + (transept_vault_width / 2) ,y_origin), pillar_width, vault_height);
      }
       draw_wall(new p5.Vector(x_origin, origin.y + (vault_height /2)), transept_vault_width + (pillar_width), pillar_width);
            
      var wall_sides = 8;
      if(i == 0)
      {
        wall_sides += 2;
      }
      
      if(i == vaults_wide_transpet - 1)
      {
        wall_sides += 4;
      }      
      
      draw_vault(new p5.Vector(x_origin,y_origin), transept_vault_width, vault_height, 0, 0, 1,0);
      
      if( (i + 1) == mid_transept_aisle)
      {
         x_origin +=  vault_width * 1.5;
      }
      else if ( i == mid_transept_aisle)
      {
         x_origin +=   vault_width *1.5;
      }
      else
      {
          x_origin += vault_width;
      }
    } 
}