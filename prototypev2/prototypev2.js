var steering;
var warning;
var failure;
var warning_playing = false;

function steerLeft(){
    // move background to right
    let background_img = document.getElementById('demo-background');

    if(background_img.style.left == ''){
        background_img.style.left = '-625px';
    }

    background_img.style.left = parseInt(background_img.style.left) + 5 + 'px';
}

function steerRight(){
    // move background to left
    let background_img = document.getElementById('demo-background');

    if(background_img.style.left == ''){
        background_img.style.left = '-625px';
    }

    background_img.style.left = parseInt(background_img.style.left) - 5 + 'px';
}

function toggleHFDS(){
    // enable handsfree
    let sys_status = document.getElementById('system-status');

    // disable if enabled
    if(sys_status.innerHTML == 'HFDS: Enabled'){
        disableHFDS();
        clearInterval(steering);
    }
    // enable if disabled
    else {
        enableHFDS();
    }
}

function enableHFDS(){

    if(getSpeed() == 0){
        alert('must have a speed greater than zero to enable HFDS')
        return;
    }

    clearInterval(steering);
    steering = setInterval(steer, 1500);

    let sys_status = document.getElementById('system-status');
    sys_status.innerHTML = "HFDS: Enabled";
    sys_status.style.color = "green";
}

function disableHFDS(){
    // stop steering vehicle
    clearInterval(steering);
    let sys_status = document.getElementById('system-status');
    sys_status.innerHTML = "HFDS: Disabled";
    sys_status.style.color = "red";
}

function setSpeed(value){
    let spedometer = document.getElementById('demo-speed');
    spedometer.innerHTML = value + ' MPH';
}

function getSpeed(){
    return parseInt(document.getElementById('demo-speed').innerHTML);
}

function steer(){
    setTimeout(steerLeft, 250);
    setTimeout(steerRight, 1000);
    setTimeout(steerLeft, 500);
    setTimeout(steerRight, 1250);
}

function playWarning(){
    let warning_sound = document.getElementById('warning-sound');
    warning_sound.play();
    warning_playing = true;

    let sys_status = document.getElementById('system-status');
    sys_status.innerHTML = 'HFDS: Enabled Re-engage'

    if(sys_status.style.color == "red"){
        sys_status.style.color = 'orange';
    }
    else {
        sys_status.style.color = 'red';
    }
}

function playFailure(){
    let warning_sound = document.getElementById('warning-sound');
    warning_sound.play();
    warning_playing = true;

    disableHFDS();

    let sys_status = document.getElementById('system-status');
    sys_status.innerHTML = 'HFDS: Failure Re-engage'

    if(sys_status.style.color == "red"){
        sys_status.style.color = 'orange';
    }
    else {
        sys_status.style.color = 'red';
    }
}

document.body.addEventListener('keydown', function (event){
    const keyname = event.key;

    if(keyname == 'h'){
        toggleHFDS();
    }
    // up keypress
    else if(keyname == 'w'){
        disableHFDS();
        clearInterval(warning);
        let spedometer = document.getElementById('demo-speed');

        // do nothing if at 95 mph
        if(parseInt(spedometer.innerHTML) == 95){
            return;
        }

        // increase speed by 5
        spedometer.innerHTML = parseInt(spedometer.innerHTML) + 5 + ' MPH';
    }
    // down keypress
    else if(keyname == 's'){
        disableHFDS();
        clearInterval(warning);
        let spedometer = document.getElementById('demo-speed');

        // do nothing if at 0 mph
        if(parseInt(spedometer.innerHTML) == 0){
            return;
        }

        // decrease speed by 5
        spedometer.innerHTML = parseInt(spedometer.innerHTML) - 5 + ' MPH';
    }
    // left keypress
    else if(keyname == 'a'){
        clearInterval(warning);

        // dismiss warning on steer
        if(!warning_playing){
            disableHFDS();
        }
        else {
            enableHFDS();
        }
        steerLeft();
    }
    // right keypress
    else if(keyname == 'd'){
        clearInterval(warning);
        
        // dismiss warning on steer
        if(!warning_playing){
            disableHFDS();
        }
        else {
            enableHFDS();
        }
        steerRight();
    }

    // scenarios
    else if(keyname == '1'){
        clearInterval(warning);
        setSpeed(65);
        enableHFDS();
    }
    else if(keyname == '2'){
        clearInterval(warning);
        warning = setInterval(playFailure, 1000);
    }
    else if(keyname == '3'){
        clearInterval(warning);
        enableHFDS();
        warning = setInterval(playWarning, 1000);
    }
    else if(keyname == '4'){
        clearInterval(warning);
        setSpeed(65);
        enableHFDS();
        setTimeout(disableHFDS, 4000);

        // brake simulation
        setTimeout(function(){
            setSpeed(60);
        }, 4000);
        setTimeout(function(){
            setSpeed(50);
        }, 4400);
    }
});