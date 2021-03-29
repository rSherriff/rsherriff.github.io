var numStops = 6;
var numAnswersInRow = 9;
var stops = [];
var initial_states = [true, false, true, true, false, false];
var states = initial_states;
async function reset() {
  for (var i = 0; i < numStops; i += 1) {
    stops.push(document.querySelector("#cell" + parseInt(i)));
    setStopBackground(stops[i], initial_states[i]);
  }

  let count = 0;
  fetch("stops.json")
    .then((response) => response.json())
    .then((json) => {
      document.querySelectorAll(".solution-grid-item").forEach((sgi) => {
        answer = json.answers[Math.floor(count / numAnswersInRow)].data[count % numAnswersInRow];
        sgi.innerHTML = answer.text;
        sgi.style.backgroundColor = answer.color;
        if (answer.color === "black") {
          sgi.style.color = "white";
        } else {
          sgi.style.color = "black";
        }
        count += 1;
      });
    });
}

function setStopBackground(element, toggle) {
  if (toggle) {
    element.style.backgroundColor = "white";
    element.style.color = "black";
  } else {
    element.style.backgroundColor = "black";
    element.style.color = "white";
  }
}

function clickStop(index) {
  element = document.querySelector("#cell" + index);
  states[index] = !states[index];
  setStopBackground(element, states[index]);
}

function getJSON(path) {
  return fetch(path).then((response) => response.json());
}

reset();
