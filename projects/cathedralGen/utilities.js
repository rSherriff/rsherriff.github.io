//utilities.js


//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function find_point_on_circle( circle_origin,  radius,  angle)
{
  var result = new p5.Vector(0, 0);

  result.y = circle_origin.y + radius * sin( angle );
  result.x = circle_origin.x + radius * cos( angle );

  return result;
}

//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function draw_line( origin_x,  origin_y,  end_x,  end_y)
{    
    fill(210);
    strokeWeight(1);

    var offset = 5;

    beginShape();
    vertex(origin_x, origin_y);    

    vertex(end_x - offset, end_y - offset);
    
    vertex(end_x, end_y);
    vertex(origin_x + offset, origin_y + offset);
    endShape();    
}

function draw_ellipse( origin)
{
  fill(255,0,0);
      ellipse(origin.x, origin.y, 10,10);
      noFill();
}

function draw_ellipse( x,  y)
{
  draw_ellipse(new PVector(x,y));
}

function draw_ellipse( origin,  stroke_weight)
{
  strokeWeight(1);
  fill(255,0,0);
      ellipse(origin.x, origin.y, 10,10);
      noFill();
      strokeWeight(stroke_weight);
}

//-------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------
function move_towards( start,  end,  distance)
{
  var direction = p5.Vector.sub(end, start).normalize();

  return start.add(direction.mult(distance));
}