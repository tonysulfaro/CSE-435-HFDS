var steering;
var warning;
var failure;
var warning_playing = false;
var failure_found = false;
var vibrate;

function steerLeft() {
  // move background to right
  let background_img = document.getElementById("demo-background");

  if (background_img.style.left == "") {
    background_img.style.left = "-625px";
  }

  background_img.style.left = parseInt(background_img.style.left) + 5 + "px";
}

function steerRight() {
  // move background to left
  let background_img = document.getElementById("demo-background");

  if (background_img.style.left == "") {
    background_img.style.left = "-625px";
  }

  background_img.style.left = parseInt(background_img.style.left) - 5 + "px";
}

function toggleHFDS() {
  // enable handsfree
  let sys_status = document.getElementById("system-status");

  // disable if enabled
  if (sys_status.innerHTML == "HFDS: Enabled") {
    disableHFDS();
    clearInterval(steering);
  }
  // enable if disabled
  else {
    enableHFDS();
  }
}

function enableHFDS() {
  if (getSpeed() == 0) {
    alert("must have a speed greater than zero to enable HFDS");
    return;
  }

  clearInterval(steering);
  steering = setInterval(steer, 1500);

  let sys_status = document.getElementById("system-status");
  sys_status.innerHTML = "HFDS: Enabled";
  sys_status.style.color = "green";
}

function disableHFDS() {
  // stop steering vehicle
  clearInterval(steering);
  let sys_status = document.getElementById("system-status");
  sys_status.innerHTML = "HFDS: Disabled";
  sys_status.style.color = "red";
}

function setSpeed(value) {
  let spedometer = document.getElementById("demo-speed");
  spedometer.innerHTML = value + " MPH";
}

function getSpeed() {
  return parseInt(document.getElementById("demo-speed").innerHTML);
}

function steer() {
  setTimeout(steerLeft, 250);
  setTimeout(steerRight, 1000);
  setTimeout(steerLeft, 500);
  setTimeout(steerRight, 1250);
}

function playWarning() {
  let warning_sound = document.getElementById("warning-sound");
  warning_sound.play();
  warning_playing = true;

  let sys_status = document.getElementById("system-status");
  sys_status.innerHTML = "HFDS: Enabled Re-engage";

  if (sys_status.style.color == "red") {
    sys_status.style.color = "orange";
  } else {
    sys_status.style.color = "red";
  }
}

function playFailure() {
  let warning_sound = document.getElementById("warning-sound");
  warning_sound.play();
  warning_playing = true;

  failure_found = true;

  disableHFDS();

  let sys_status = document.getElementById("system-status");
  sys_status.innerHTML = "HFDS: Failure Re-engage";

  if (sys_status.style.color == "red") {
    sys_status.style.color = "orange";
  } else {
    sys_status.style.color = "red";
  }
}

// if the screen were to shake from vibration
function vibrateSeat() {
  // let background = document.getElementById('demo-background');

  // if(background.style.top == ''){
  //     background.style.top = '0px';
  // }

  // if(background.style.top == '0px'){
  //     background.style.top = parseInt(background.style.top) - 5 + 'px';
  // }
  // else {
  //     background.style.top = parseInt(background.style.top) + 5 + 'px';
  // }

  let warning_sound = document.getElementById("vibration-sound");
  warning_sound.play();
}

function playVibration() {
  // shake screen
  vibrate = setInterval(vibrateSeat, 1000);
}

document.body.addEventListener("keydown", function(event) {
  const keyname = event.key;

  if (keyname == "h") {
    toggleHFDS();
  }
  // up keypress
  else if (keyname == "w") {
    disableHFDS();
    clearInterval(warning);
    clearInterval(vibrate);
    let spedometer = document.getElementById("demo-speed");

    // do nothing if at 95 mph
    if (parseInt(spedometer.innerHTML) == 95) {
      return;
    }

    // increase speed by 5
    spedometer.innerHTML = parseInt(spedometer.innerHTML) + 5 + " MPH";
  }
  // down keypress
  else if (keyname == "s") {
    disableHFDS();
    clearInterval(warning);
    clearInterval(vibrate);
    let spedometer = document.getElementById("demo-speed");

    // do nothing if at 0 mph
    if (parseInt(spedometer.innerHTML) == 0) {
      return;
    }

    // decrease speed by 5
    spedometer.innerHTML = parseInt(spedometer.innerHTML) - 5 + " MPH";
  }
  // left keypress
  else if (keyname == "a") {
    clearInterval(warning);
    clearInterval(vibrate);
    // dismiss warning on steer
    disableHFDS();
    steerLeft();
  }
  // right keypress
  else if (keyname == "d") {
    clearInterval(warning);
    clearInterval(vibrate);
    // dismiss warning on steer
    disableHFDS();
    steerRight();
  }

  // attention keypress
  else if (keyname == "e") {
    clearInterval(warning);
    clearInterval(vibrate);

    enableHFDS();

    if (failure_found) {
      disableHFDS();
    }
  }

  // scenarios
  // optimal use case
  else if (keyname == "1") {
    clearInterval(warning);
    clearInterval(vibrate);
    warning_playing = false;
    failure_found = false;
    setSpeed(65);
    enableHFDS();
  }
  // system failure
  else if (keyname == "2") {
    clearInterval(warning);
    clearInterval(vibrate);
    warning_playing = false;
    failure_found = false;
    warning = setInterval(playFailure, 1000);
    setTimeout(function() {
      playVibration();
    }, 4400);
  }
  // system warning
  else if (keyname == "3") {
    clearInterval(warning);
    clearInterval(vibrate);
    warning_playing = false;
    failure_found = false;
    enableHFDS();
    warning = setInterval(playWarning, 1000);
    setTimeout(function() {
      playVibration();
    }, 4400);
    setTimeout(function() {
      setSpeed(60);
    }, 8800);
    setTimeout(function() {
      setSpeed(50);
    }, 9200);
    setTimeout(function() {
      setSpeed(15);
    }, 9500);
    setTimeout(function() {
      setSpeed(0);
    }, 10000);
    setTimeout(function() {
      clearInterval(warning);
      clearInterval(vibrate);
      disableHFDS();
    }, 10000);
  } else if (keyname == "4") {
    clearInterval(warning);
    clearInterval(vibrate);
    warning_playing = false;
    failure_found = false;
    setSpeed(65);
    enableHFDS();
    setTimeout(disableHFDS, 4000);

    // brake simulation
    setTimeout(function() {
      setSpeed(60);
    }, 4000);
    setTimeout(function() {
      setSpeed(50);
    }, 4400);
    setTimeout(function() {
      setSpeed(40);
    }, 4800);
  }
});
