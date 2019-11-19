// when system enabled
document.body.addEventListener('keydown', function (event){
    const keyname = event.key;

    if(keyname == 'h'){
        
        // enable handsfree
        let sys_status = document.getElementById('system-status');

        // disable if enabled
        if(sys_status.innerHTML == 'HFDS: Enabled'){
            sys_status.innerHTML = "HFDS: Disabled";
            sys_status.style.color = "red";
        }
        // enable if disabled
        else {
            sys_status.innerHTML = "HFDS: Enabled";
            sys_status.style.color = "green";
        }
        
    }
    // up keypress
    else if(keyname == 'w'){

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

        // move background to right
        let background_img = document.getElementById('demo-background');

        if(background_img.style.left == ''){
            background_img.style.left = '-625px';
        }

        background_img.style.left = parseInt(background_img.style.left) + 5 + 'px';
    }
    // right keypress
    else if(keyname == 'd'){

        // move background to left
        let background_img = document.getElementById('demo-background');

        if(background_img.style.left == ''){
            background_img.style.left = '-625px';
        }

        background_img.style.left = parseInt(background_img.style.left) - 5 + 'px';
    }

    // scenarios
    else if(keyname == '1'){
        alert('scenario coming soon');
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