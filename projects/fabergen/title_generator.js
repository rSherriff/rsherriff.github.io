
var num_subtitle_generators = 2;
var cannabis_chance = 11;
var titan_chance = 10;
var god_chance = 5;
var crayola_chance = 16;
var apple_chance = 13;
var passage_chance = 5;
var tube_chance = 5;
var river_chance = 8;
var eggcorn_chance = 8;
var emoji_chance = 8;
var operation_chance = 8;
var wrestling_chance = 8;


function generate_title()
{
  var title_chance = random(0,100);
  var title = "";
    
  if(title_chance < cannabis_chance)
  {
    title =  generate_cannabis_title();
  }
  else if(title_chance < cannabis_chance + titan_chance)
  {
    title =  generate_titan_name();
  }
  else if(title_chance < cannabis_chance + titan_chance + god_chance)
  {
    title =  generate_hebrew_god_title();
  }
  else if(title_chance < cannabis_chance + titan_chance + god_chance  + crayola_chance)
  {
    title =  generate_crayola_title();
  }
  else if(title_chance < cannabis_chance + titan_chance + god_chance + crayola_chance + apple_chance)
  {
    title =  generate_apple_name_title();
  }
  else if(title_chance <  cannabis_chance + titan_chance + god_chance  + crayola_chance + apple_chance)
  {
    title =  generate_passage_name();
  }
  else if(title_chance < cannabis_chance + titan_chance + god_chance  + crayola_chance + apple_chance + tube_chance)
  {
    title = generate_tube_title();
  }
  else if(title_chance < cannabis_chance + titan_chance + god_chance  + crayola_chance+apple_chance + tube_chance + river_chance)
  {
    title = generate_river_title();
  }
  else if(title_chance < cannabis_chance + titan_chance + god_chance  + crayola_chance+apple_chance + tube_chance + river_chance + eggcorn_chance)
  {
    title = generate_eggcorn_title();
  }
  else if(title_chance < cannabis_chance + titan_chance + god_chance  + crayola_chance+apple_chance + tube_chance + river_chance + eggcorn_chance + emoji_chance)
  {
    title = generate_emoji_title();
  }
  else if(title_chance < cannabis_chance + titan_chance + god_chance  + crayola_chance+apple_chance + tube_chance + river_chance + eggcorn_chance + emoji_chance + operation_chance)
  {
    title = generate_operation_title();
  }
  else if(title_chance < cannabis_chance + titan_chance + god_chance  + crayola_chance+apple_chance + tube_chance + river_chance + eggcorn_chance + emoji_chance + operation_chance + wrestling_chance)
  {
    title = generate_wrestling_title();
  }
  
  var subtitle_thresholds = 100 / num_subtitle_generators;
  var subtitle_chance = random(0,100);
  if(subtitle_chance < 25)
  {
    var res = title.split(" ");
    if(res.length == 1)
    {
      title += " and other Poems";
    }
  }
  else if(subtitle_chance < subtitle_thresholds * 2)
  {
  }
  
  return title;
}


function generate_cannabis_title()
{     
  var index = int(random(0, cannabis_json.cannabis.length));
  return cannabis_json.cannabis[index]
}

function generate_titan_name()
{
  var index = int(random(0, titan_json.greek_titans.length));
  return titan_json.greek_titans[index];
}

function generate_hebrew_god_title()
{
  var index = int(random(0, god_json.names.length));
  return god_json.names[index].meaning;
}

function generate_crayola_title()
{
  var index = int(random(0, crayola_json.colors.length));
  return crayola_json.colors[index].color;
}

function generate_apple_name_title()
{
  var index = int(random(0, apple_json.cultivars.length));
  return apple_json.cultivars[index];
}

function generate_passage_name()
{
  var passage_index = int(random(0, passage_json.passages.length));
  var passage_string = passage_json.passages[passage_index];
  passage_string += " to ";
  
  var ism_index = int(random(0, ism_json.isms.length));
  passage_string += ism_json.isms[ism_index];
  
  return passage_string;
}

function generate_tube_title()
{
  var index = int(random(0, tube_json.stations.length));
  return tube_json.stations[index].name
}

function generate_river_title()
{
  var index = int(random(0, river_json.rivers.length));
  return river_json.rivers[index].name
}

function generate_eggcorn_title()
{
  var index = int(random(0, eggcorn_json.eggcorns.length));
  return eggcorn_json.eggcorns[index].mistakes[0]
}

function generate_emoji_title()
{
  var index = int(random(0, emoji_json.cuteKaomoji.length));
  return emoji_json.cuteKaomoji[index]
}

function generate_operation_title()
{
  var index = int(random(0, operation_json.operations.length));
  return operation_json.operations[index]
}

function generate_wrestling_title()
{
  var title;
  var list = [];
  
  do
  {
     var index = int(random(0, wrestling_json.moves.length));
     title = wrestling_json.moves[index]
     list= split(title, ' ');
  }
  while(title.length > 0 && list.length > 0 && list.length > 3);
  
  return title;
}