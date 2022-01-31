var max_colours = 46;

var bg_colours = []
var name_colours = []
var title_colours = []
var default_line_space = 100;
var line_space = default_line_space;
var start_y = 0;

var faber_logo;
var json_data;
var author_json ={}
var cannabis_json = {}
var titan_json = {}
var god_json = {}
var crayola_json = {}
var apple_json = {}
var passage_json ={}
var ism_json = {}
var tube_json = {}
var river_json = {}
var eggcorn_json = {}
var emoji_json = {}
var operation_json = {}
var wrestling_json = {}

var book_width = 400;
var book_height = 600;

var default_font_size = 100;
var margin_size = 10;
var num_books = 1;


function preload() {
  author_json = loadJSON('poets.json' )
  cannabis_json = loadJSON("https://raw.githubusercontent.com/dariusk/corpora/master/data/plants/cannabis.json")
  titan_json = loadJSON("https://raw.githubusercontent.com/dariusk/corpora/master/data/mythology/greek_titans.json")
 god_json = loadJSON("https://raw.githubusercontent.com/dariusk/corpora/master/data/mythology/hebrew_god.json")
  crayola_json = loadJSON("https://raw.githubusercontent.com/dariusk/corpora/master/data/colors/crayola.json")
  apple_json = loadJSON("https://raw.githubusercontent.com/dariusk/corpora/master/data/foods/apple_cultivars.json")
  passage_json =loadJSON("https://raw.githubusercontent.com/dariusk/corpora/master/data/architecture/passages.json")
  ism_json = loadJSON("https://raw.githubusercontent.com/dariusk/corpora/master/data/art/isms.json")
  tube_json = loadJSON("https://raw.githubusercontent.com/dariusk/corpora/master/data/geography/london_underground_stations.json")
  river_json = loadJSON("https://raw.githubusercontent.com/dariusk/corpora/master/data/geography/rivers.json")
  eggcorn_json = loadJSON("https://raw.githubusercontent.com/dariusk/corpora/master/data/words/eggcorns.json")
  emoji_json = loadJSON("https://raw.githubusercontent.com/dariusk/corpora/master/data/words/emoji/cute_kaomoji.json")
  operation_json = loadJSON("https://raw.githubusercontent.com/dariusk/corpora/master/data/governments/us_mil_operations.json")
  wrestling_json = loadJSON("https://raw.githubusercontent.com/dariusk/corpora/master/data/games/wrestling_moves.json")
}

function setup(){

  colorMode(HSB);

  createCanvas(book_width, book_height);

  var font;
  font = textFont("times", default_font_size);
  background(0);
  noStroke()
  textFont(font);

  bg_colours[0] = color('#f54222 ');
  name_colours[0] = color('#925840   ');
  title_colours[0] = color('#face63  ');
  bg_colours[1] = color('#fda13a  ');
  name_colours[1] = color('#f15d37   ');
  title_colours[1] = color('#e4f1e8 ');
  bg_colours[2] = color('#f7dd6c  ');
  name_colours[2] = color('#f2573b   ');
  title_colours[2] = color('#a63837  ');
  bg_colours[3] = color('#5b3c8c  ');
  name_colours[3] = color('#d6b54a   ');
  title_colours[3] = color('#cf5e3e  ');
  bg_colours[4] = color('#334d5e  ');
  name_colours[4] = color('#f1f1e7   ');
  title_colours[4] = color('#e93639  ');
  bg_colours[5] = color('#949ecf  ');
  name_colours[5] = color('#edd74e   ');
  title_colours[5] = color('#bb1112  ');
  bg_colours[6] = color('#979fd0  ');
  name_colours[6] = color('#e5e7d2   ');
  title_colours[6] = color('#9c8c7d  ');
  bg_colours[7] = color('#791924  ');
  name_colours[7] = color('#d3a62f   ');
  title_colours[7] = color('#926b2a  ');
  bg_colours[8] = color('#3b221b  ');
  name_colours[8] = color('#dce5e4   ');
  title_colours[8] = color('#e05133  ');
  bg_colours[9] = color('#5092aa  ');
  name_colours[9] = color('#e8c1a0   ');
  title_colours[9] = color('#e8e3e7  ');
  bg_colours[10] = color('#015cb9  ');
  name_colours[10] = color('#e8c1a0  ');
  title_colours[10] = color('#fff6ec  ');
  bg_colours[11] = color('#3b431a  ');
  name_colours[11] = color('#e4e3ce  ');
  title_colours[11] = color('#a27c33  ');
  bg_colours[12] = color('#dcd674  ');
  name_colours[12] = color('#2c5338  ');
  title_colours[12] = color('#817f08  ');
  bg_colours[13] = color('#6b2a7b  ');
  name_colours[13] = color('#f79422  ');
  title_colours[13] = color('#e30c8c  ');
  bg_colours[14] = color('#efec5c  ');
  name_colours[14] = color('#2e2861  ');
  title_colours[14] = color('#45c9f5  ');
  bg_colours[15] = color('#bdb2a7  ');
  name_colours[15] = color('#e54852  ');
  title_colours[15] = color('#424343  ');
  bg_colours[16] = color('#968036  ');
  name_colours[16] = color('#33433b  ');
  title_colours[16] = color('#efe591  ');
  bg_colours[17] = color('#dae4e2  ');
  name_colours[17] = color('#0c8343  ');
  title_colours[17] = color('#a72b40  ');
  bg_colours[18] = color('#312f2d  ');
  name_colours[18] = color('#dae4e2  ');
  title_colours[18] = color('#cadc44  ');
  bg_colours[19] = color('#82aabd  ');
  name_colours[19] = color('#eceef0  ');
  title_colours[19] = color('#ef4423  ');
  bg_colours[20] = color('#4d3a15  ');
  name_colours[20] = color('#fbeb78  ');
  title_colours[20] = color('#cf4449  ');
  bg_colours[21] = color('#13533e  ');
  name_colours[21] = color('#6acad0  ');
  title_colours[21] = color('#f7ef38  ');
  bg_colours[22] = color('#063449  ');
  name_colours[22] = color('#94d6da  ');
  title_colours[22] = color('#fef3e5  ');
  bg_colours[23] = color('#15677b  ');
  name_colours[23] = color('#ffffff  ');
  title_colours[23] = color('#203137  ');
  bg_colours[24] = color('#c2beb4  ');
  name_colours[24] = color('#f6efec  ');
  title_colours[24] = color('#ed3f97  ');
  bg_colours[25] = color('#da4040  ');
  name_colours[25] = color('#eff0f1  ');
  title_colours[25] = color('#fdddcc  ');
  bg_colours[26] = color('#112013  ');
  name_colours[26] = color('#94c840  ');
  title_colours[26] = color('#fbe30a  ');
  bg_colours[27] = color('#bebcb6  ');
  name_colours[27] = color('#3a3845  ');
  title_colours[27] = color('#d7652c  ');
  bg_colours[28] = color('#063c2c  ');
  name_colours[28] = color('#968036  ');
  title_colours[28] = color('#decd80  ');
  bg_colours[29] = color('#b0a899  ');
  name_colours[29] = color('#ca203c  ');
  title_colours[29] = color('#faea2a  ');
  bg_colours[30] = color('#fec013  ');
  name_colours[30] = color('#855622  ');
  title_colours[30] = color('#dd533a  ');
  bg_colours[31] = color('#302f83  ');
  name_colours[31] = color('#f0522d  ');
  title_colours[31] = color('#fae80c  ');
  bg_colours[32] = color('#f8f5a5  ');
  name_colours[32] = color('#937b2e  ');
  title_colours[32] = color('#d8c347  ');
  bg_colours[33] = color('#c5ba91  ');
  name_colours[33] = color('#99514f  ');
  title_colours[33] = color('#4c301e  ');
  bg_colours[34] = color('#3e3437  ');
  name_colours[34] = color('#bdb2a7  ');
  title_colours[34] = color('#ee3226  ');
  bg_colours[35] = color('#bee4dd  ');
  name_colours[35] = color('#7e4364  ');
  title_colours[35] = color('#ef3f7c  ');
  bg_colours[36] = color('#f2ebc1  ');
  name_colours[36] = color('#82ab9d  ');
  title_colours[36] = color('#1e5f5f  ');
  bg_colours[37] = color('#dec798  ');
  name_colours[37] = color('#1c83c6  ');
  title_colours[37] = color('#f99d20  ');
  bg_colours[38] = color('#f9f154  ');
  name_colours[38] = color('#1f9847  ');
  title_colours[38] = color('#ee2f3e  ');
  bg_colours[39] = color('#1d8bcc  ');
  name_colours[39] = color('#d2c4b8  ');
  title_colours[39] = color('#ec1565  ');
  bg_colours[40] = color('#ef492f  ');
  name_colours[40] = color('#4d4948  ');
  title_colours[40] = color('#fcdf07  ');
  bg_colours[41] = color('#dde5ee  ');
  name_colours[41] = color('#958673  ');
  title_colours[41] = color('#444a4f  ');
  bg_colours[42] = color('#f6e7ba  ');
  name_colours[42] = color('#807446  ');
  title_colours[42] = color('#a29a45  ');
  bg_colours[43] = color('#8e194a  ');
  name_colours[43] = color('#dab5d2  ');
  title_colours[43] = color('#fcae1b  ');
  bg_colours[44] = color('#fbe30a  ');
  name_colours[44] = color('#146ab4  ');
  title_colours[44] = color('#d72027  ');
  bg_colours[45] = color('#2b2537  ');
  name_colours[45] = color('#fef3e5  ');
  title_colours[45] = color('#c9e5f2  ');
  //bg_colours[] = #; name_colours[]= #; title_colours[]= #;

  //faber_logo = loadImage("logo.png");

  generate();
}

function draw() {
}

function keyPressed() {
}

function generate() {
    print("Generating new image...");

    var current_y = start_y;
    var colour = int(random(0, max_colours));
    fill(bg_colours[colour]);
    rect(0, 0, book_width + book_width, book_height);


    fill(name_colours[colour]);

    print("Colour: " + colour);

    

    var str = generate_author();
    var res = str.split(" ");
    print("Author: " + str);

    get_best_font_size(res);
    for (var j = 0; j < res.length; j++) {
      current_y += line_space;
      text(res[j], margin_size, current_y);
    }
    textSize(default_font_size);
    line_space = default_line_space;

    fill(title_colours[colour]);
  
    str = generate_title();
      print("Title: " + str);
    res = str.split(" ");


  
    res = format_text(res);
    current_y += 15 + textAscent();
    text(res[0], margin_size, current_y);
    for (var j = 1; j < res.length; j++) {
      current_y += line_space;
      text(res[j], margin_size, current_y);
    }

    textSize(default_font_size);
    line_space = default_line_space;
}

function format_text(text) {
  temp_text = []
  var added_this_word = false;

  if (text.length >= 3) {

    for (var i = 0; i < text.length; i++) {
      if (added_this_word) {
        added_this_word = false;
        continue;
      }
      //If the length of a two words in a row is less than the width of the book and a quater, put them on the same line
      if (i < text.length - 1 && textWidth(text[i]) + textWidth(text[i + 1]) < book_width * 2) {
        temp_text.push (upper_case_first_character(text[i]) + " " + upper_case_first_character(text[i + 1]));
        added_this_word = true;
      } else {
        temp_text.push (upper_case_first_character(text[i]));
      }
    }
  } 
  else 
  {

    for (var i = 0; i < text.length; i++) {
      temp_text.push (upper_case_first_character(text[i]));
    }
  }

  get_best_font_size(temp_text);

  var return_array = []
  for (var i = 0; i < temp_text.length; i++) {
    return_array[i] = temp_text[i];
  }

  return return_array;
}

function get_best_font_size(text) {
  var font_size = default_font_size;
  for (var j = 0; j < text.length; j++) {
    var word = text[j]
    //print("Processing word: " + word + " Length: " + textWidth(word));
    while (textWidth(word) > (book_width - (margin_size * 2)) && font_size > 0 ) {
      font = textFont("times", font_size--);
      line_space--;
    }
  }
}

function upper_case_first_character(string) {
  if (string.length == 2 || string == ("and") || string == ("other")) {
    return string;
  } else if (string.length > 2) {
    return string.substring(0, 1).toUpperCase() + string.substring(1);
  } else {
    return string.toUpperCase();
  }
}



function generate_author()
{  
  var index = int(random(0, author_json.results.bindings.length));
  return author_json.results.bindings[index].name.value;
}
