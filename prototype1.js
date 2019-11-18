// when system enabled
document.body.addEventListener('keydown', function (event){
    const keyname = event.key;

    if(keyname == 'h'){
        alert('this is coming soon');
    }
    // up keypress
    else if(event.keyCode == '38'){
        alert('this is coming soon');
    }
    // down keypress
    else if(event.keyCode == '40'){
        alert('this is coming soon');
    }
    // left keypress
    else if(event.keyCode == '37'){
        alert('this is coming soon');
    }
    // right keypress
    else if(event.keyCode == '39'){
        alert('this is coming soon');
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