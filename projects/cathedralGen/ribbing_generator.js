//ribbing_generator.js

//Ribbing types
var ribbing_normal = 1;
var ribbing_quadripartite = 2;
var ribbing_tierceron = 3;
var ribbing_lierne = 4;

function draw_ribbing( type,  origin,  vault_width,  vault_height)
{
  if(type == ribbing_normal || type == 0)
  {
    draw_normal_ribbing( origin, vault_width, vault_height);
  }
  else if(type == ribbing_quadripartite)
  {
    draw_quadripartite_ribbing( origin, vault_width, vault_height);
  }
  else if(type == ribbing_tierceron)
  {
    draw_tierceron_ribbing( origin, vault_width, vault_height);
  }
  else if(type == ribbing_lierne)
  {
    draw_lierne_ribbing( origin, vault_width, vault_height);
  }
}

function draw_normal_ribbing(  origin,  vault_width,  vault_height)
{
  var half_vault_width = vault_width / 2;
  var half_vault_height = vault_height / 2;
  var boss_radius = vault_width * 0.05;
  
  ne_line_terminus = find_point_on_circle(origin, boss_radius / 2, PI + QUARTER_PI);
  nw_line_terminus = find_point_on_circle(origin, boss_radius / 2, PI + HALF_PI + QUARTER_PI);
  se_line_terminus = find_point_on_circle(origin, boss_radius / 2, QUARTER_PI);
  sw_line_terminus = find_point_on_circle(origin, boss_radius / 2, HALF_PI + QUARTER_PI);
  
  line(origin.x - half_vault_width, origin.y - half_vault_height, ne_line_terminus.x, ne_line_terminus.y);
  line(origin.x + half_vault_width, origin.y - half_vault_height, nw_line_terminus.x, nw_line_terminus.y);
  line(origin.x + half_vault_width, origin.y + half_vault_height, se_line_terminus.x, se_line_terminus.y);
  line(origin.x - half_vault_width, origin.y + half_vault_height, sw_line_terminus.x, sw_line_terminus.y);
}

function draw_quadripartite_ribbing(  origin,  vault_width,  vault_height)
{
  var half_vault_width = vault_width / 2;
  var half_vault_height = vault_height / 2;
  var boss_radius = vault_width * 0.05;
  ne_line_terminus = find_point_on_circle(origin, boss_radius / 2, PI + QUARTER_PI);
  nw_line_terminus = find_point_on_circle(origin, boss_radius / 2, PI + HALF_PI + QUARTER_PI);
  se_line_terminus = find_point_on_circle(origin, boss_radius / 2, QUARTER_PI);
  sw_line_terminus = find_point_on_circle(origin, boss_radius / 2, HALF_PI + QUARTER_PI);
  
  line(origin.x - half_vault_width, origin.y - half_vault_height, ne_line_terminus.x, ne_line_terminus.y);
  line(origin.x + half_vault_width, origin.y - half_vault_height, nw_line_terminus.x, nw_line_terminus.y);
  line(origin.x + half_vault_width, origin.y + half_vault_height, se_line_terminus.x, se_line_terminus.y);
  line(origin.x - half_vault_width, origin.y + half_vault_height, sw_line_terminus.x, sw_line_terminus.y);
  line(origin.x - half_vault_width, origin.y, origin.x + half_vault_width, origin.y);
  line(origin.x, origin.y + half_vault_height, origin.x, origin.y - half_vault_height);  
}

function draw_tierceron_ribbing( origin, vault_width, vault_height)
{
  var half_vault_width = vault_width / 2;
  var half_vault_height = vault_height / 2;
  var boss_radius = vault_width * 0.05;  
  
  ne_line_terminus = find_point_on_circle(origin, boss_radius / 2, PI + QUARTER_PI);
  nw_line_terminus = find_point_on_circle(origin, boss_radius / 2, PI + HALF_PI + QUARTER_PI);
  se_line_terminus = find_point_on_circle(origin, boss_radius / 2, QUARTER_PI);
  sw_line_terminus = find_point_on_circle(origin, boss_radius / 2, HALF_PI + QUARTER_PI);
  
  //Cross ribs
    line(origin.x - half_vault_width, origin.y, origin.x + half_vault_width, origin.y);
    line(origin.x, origin.y + half_vault_height, origin.x, origin.y - half_vault_height);
    
    var top_bosses =  [new p5.Vector(0,0), new p5.Vector(0,0)]
    var bottom_bosses =   [new p5.Vector(0,0), new p5.Vector(0,0)]
    var left_bosses =   [new p5.Vector(0,0), new p5.Vector(0,0)]
    var right_bosses =   [new p5.Vector(0,0), new p5.Vector(0,0)]
    
    var vertical_rib_section_length = vault_height / 6;
    top_bosses[0] = new p5.Vector(origin.x, origin.y - vertical_rib_section_length);
    top_bosses[1] = new p5.Vector(origin.x, origin.y - (vertical_rib_section_length * 2));
      
    bottom_bosses[0] = new p5.Vector(origin.x, origin.y + vertical_rib_section_length);
    bottom_bosses[1] = new p5.Vector(origin.x, origin.y + (vertical_rib_section_length * 2));
      
    var horizontal_rib_section_length = vault_width / 4;
    left_bosses[0] = new p5.Vector(origin.x - horizontal_rib_section_length, origin.y);
    left_bosses[1] = new p5.Vector(origin.x - (horizontal_rib_section_length * 2), origin.y);
      
    right_bosses[0] = new p5.Vector(origin.x + horizontal_rib_section_length, origin.y);
    right_bosses[1] = new p5.Vector(origin.x + (horizontal_rib_section_length * 2), origin.y);
    
    for(var i = 0; i < 2; i++)
    {
      line(origin.x - half_vault_width, origin.y - half_vault_height, top_bosses[i].x, top_bosses[i].y);
      line(origin.x + half_vault_width, origin.y - half_vault_height, top_bosses[i].x, top_bosses[i].y);
      
      line(origin.x - half_vault_width, origin.y + half_vault_height, bottom_bosses[i].x, bottom_bosses[i].y);
      line(origin.x + half_vault_width, origin.y + half_vault_height, bottom_bosses[i].x, bottom_bosses[i].y);
      
      line(origin.x - half_vault_width, origin.y - half_vault_height, left_bosses[i].x, left_bosses[i].y);      
      line(origin.x - half_vault_width, origin.y + half_vault_height, left_bosses[i].x, left_bosses[i].y);
      
      line(origin.x + half_vault_width, origin.y - half_vault_height, right_bosses[i].x, right_bosses[i].y);      
      line(origin.x + half_vault_width, origin.y + half_vault_height, right_bosses[i].x, right_bosses[i].y);
      
      line(origin.x - half_vault_width, origin.y - half_vault_height, ne_line_terminus.x, ne_line_terminus.y);
      line(origin.x + half_vault_width, origin.y - half_vault_height, nw_line_terminus.x, nw_line_terminus.y);
      line(origin.x + half_vault_width, origin.y + half_vault_height, se_line_terminus.x, se_line_terminus.y);
      line(origin.x - half_vault_width, origin.y + half_vault_height, sw_line_terminus.x, sw_line_terminus.y);
      
      draw_boss(top_bosses[i], boss_radius);
      draw_boss(bottom_bosses[i], boss_radius);
      draw_boss(left_bosses[i], boss_radius);
      draw_boss(right_bosses[i], boss_radius);
    }
}

function draw_lierne_ribbing( origin, vault_width, vault_height)
{
  var half_vault_width = vault_width / 2;
  var half_vault_height = vault_height / 2;
  var boss_radius = vault_width * 0.05;
  
  ne_line_terminus = find_point_on_circle(origin, boss_radius / 2, PI + QUARTER_PI);
  nw_line_terminus = find_point_on_circle(origin, boss_radius / 2, PI + HALF_PI + QUARTER_PI);
  se_line_terminus = find_point_on_circle(origin, boss_radius / 2, QUARTER_PI);
  sw_line_terminus = find_point_on_circle(origin, boss_radius / 2, HALF_PI + QUARTER_PI);
  
  line(origin.x - half_vault_width, origin.y - half_vault_height, ne_line_terminus.x, ne_line_terminus.y);
    line(origin.x + half_vault_width, origin.y - half_vault_height, nw_line_terminus.x, nw_line_terminus.y);
    line(origin.x + half_vault_width, origin.y + half_vault_height, se_line_terminus.x, se_line_terminus.y);
    line(origin.x - half_vault_width, origin.y + half_vault_height, sw_line_terminus.x, sw_line_terminus.y);
    line(origin.x - half_vault_width, origin.y, origin.x + half_vault_width, origin.y);
    line(origin.x, origin.y + half_vault_height, origin.x, origin.y - half_vault_height);
    
    var current_angle = 0;
    var adjust_angle = radians(360 / 8);
    boss_point = find_point_on_circle(origin, vault_width/4, current_angle);
    current_angle += adjust_angle;
    draw_boss(boss_point, boss_radius);
    line(boss_point.x, boss_point.y, origin.x + half_vault_width, origin.y - half_vault_height);
    line(boss_point.x, boss_point.y, origin.x + half_vault_width, origin.y + half_vault_height);
    
    new_boss_point = find_point_on_circle(origin, vault_width/4, current_angle);
    line(new_boss_point.x, new_boss_point.y, boss_point.x, boss_point.y);
    boss_point = new_boss_point;
    current_angle += adjust_angle;
    draw_boss(boss_point, boss_radius);
    
    new_boss_point = find_point_on_circle(origin, vault_width/4, current_angle);
    line(new_boss_point.x, new_boss_point.y, boss_point.x, boss_point.y);
    boss_point = new_boss_point;
    current_angle += adjust_angle;
    draw_boss(boss_point, boss_radius);
    line(boss_point.x, boss_point.y, origin.x + half_vault_width, origin.y + half_vault_height);
    line(boss_point.x, boss_point.y, origin.x - half_vault_width, origin.y + half_vault_height);
    
    new_boss_point = find_point_on_circle(origin, vault_width/4, current_angle);
    line(new_boss_point.x, new_boss_point.y, boss_point.x, boss_point.y);
    boss_point = new_boss_point;
    current_angle += adjust_angle;
    draw_boss(boss_point, boss_radius);
    
    new_boss_point = find_point_on_circle(origin, vault_width/4, current_angle);
    line(new_boss_point.x, new_boss_point.y, boss_point.x, boss_point.y);
    boss_point = new_boss_point;
    current_angle += adjust_angle;
    draw_boss(boss_point, boss_radius);
    line(boss_point.x, boss_point.y, origin.x - half_vault_width, origin.y + half_vault_height);
    line(boss_point.x, boss_point.y, origin.x - half_vault_width, origin.y - half_vault_height);
    
    new_boss_point = find_point_on_circle(origin, vault_width/4, current_angle);
    line(new_boss_point.x, new_boss_point.y, boss_point.x, boss_point.y);
    boss_point = new_boss_point;
    current_angle += adjust_angle;
    draw_boss(boss_point, boss_radius);
    
    new_boss_point = find_point_on_circle(origin, vault_width/4, current_angle);
    line(new_boss_point.x, new_boss_point.y, boss_point.x, boss_point.y);
    boss_point = new_boss_point;
    current_angle += adjust_angle;
    draw_boss(boss_point, boss_radius);
    line(boss_point.x, boss_point.y, origin.x - half_vault_width, origin.y - half_vault_height);
    line(boss_point.x, boss_point.y, origin.x + half_vault_width, origin.y - half_vault_height);
    
    new_boss_point = find_point_on_circle(origin, vault_width/4, current_angle);
    line(new_boss_point.x, new_boss_point.y, boss_point.x, boss_point.y);
    boss_point = new_boss_point;
    current_angle += adjust_angle;
    draw_boss(boss_point, boss_radius);
    
    new_boss_point = find_point_on_circle(origin, vault_width/4, current_angle);
    line(new_boss_point.x, new_boss_point.y, boss_point.x, boss_point.y);
    boss_point = new_boss_point;
    current_angle += adjust_angle;
    draw_boss(boss_point, boss_radius);
}