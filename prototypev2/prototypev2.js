var steering;


document.body.addEventListener('keydown', function (event){
    const keyname = event.key;

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
            steering = setInterval(steer, 1500);
        }
    }

    function enableHFDS(){
        let sys_status = document.getElementById('system-status');
        sys_status.innerHTML = "HFDS: Enabled";
        sys_status.style.color = "green";
    }

    function disableHFDS(){
        let sys_status = document.getElementById('system-status');
        sys_status.innerHTML = "HFDS: Disabled";
        sys_status.style.color = "red";
    }

    function setSpeed(value){
        let spedometer = document.getElementById('demo-speed');
        spedometer.innerHTML = value + ' MPH';
    }

    function steer(){
        setTimeout(steerLeft, 250);
        setTimeout(steerRight, 1000);
        setTimeout(steerLeft, 500);
        setTimeout(steerRight, 1250);
    }

    if(keyname == 'h'){
        toggleHFDS();
    }
    // up keypress
    else if(keyname == 'w'){
        disableHFDS();
        clearInterval(steering);
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
        clearInterval(steering);
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
        clearInterval(steering);
        disableHFDS();
        steerLeft();
    }
    // right keypress
    else if(keyname == 'd'){
        clearInterval(steering);
        disableHFDS();
        steerRight();
    }

    // scenarios
    else if(keyname == '1'){
        enableHFDS();
        setSpeed(65);
        
        steering = setInterval(steer, 1500);
    }
    else if(keyname == '2'){
        alert('scenario coming soon');
    }
    else if(keyname == '3'){
        alert('scenario coming soon');
    }
    else if(keyname == '4'){
        alert('scenario coming soon');
    }
});