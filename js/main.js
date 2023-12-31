window.onload = function(){
    let w = window.innerWidth || 360;
    let h = window.innerHeight || 500;

    let tsw = (w > h) ? h : w;

    let sw = (tsw - 16)/8;

    let container = document.getElementById("container");
    for(let n = 0; n < 64; n++){
        let square = document.createElement("div");
        square.classList.add("square");
        square.classList.add("s"+n);
        square.style.height = sw + 'px';
        square.style.width = sw + 'px';
        square.style.top = 7+(h-tsw)/2+sw*(Math.floor(n/8)) + 'px';
        square.style.left = 7+(w-tsw)/2+sw*(Math.floor(n%8)) + 'px';
        square.style.fontSize = sw*3/4 + 'px';
        container.appendChild(square);
    }

    let fonts = {
        'k' : '&#9818;',
        'q' : '&#9819;',
        'r' : '&#9820',
        'b' : '&#9821',
        'n' : '&#9822',
        'p' : '&#9823',
        'l' : '&#9812;',
        'w' : '&#9813;',
        't' : '&#9814',
        'v' : '&#9815',
        'm' : '&#9816',
        'o' : '&#9817',

    }

    let values = ['r','n','b','q','k','b','n','r','p','p','p','p','p','p','p','p',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'o','o','o','o','o','o','o','o','t','m','v','w','l','v','m','t'];
    let ck = false;
    let cr1 = false;
    let cr2 = false;
    let cl;

    let sqs = document.getElementsByClassName("square");

    for(let n = 0; n < 64; n++){
        if(values[n] !== 0){
           sqs[n].innerHTML = fonts[values[n]];
        }
        sqs[n].addEventListener("click",check);
    } 

    function updateSquarecolor(){
        for(let n = 0; n < 64; n++){
            if (Math.floor(n / 8) % 2 == 0) {
                sqs[n].style.background = n % 2 == 0 ? '#9ff' : '#5fa';
            } else {
                sqs[n].style.background = n % 2 == 1 ? '#9ff' : '#5fa';
            }
        }
    }

    updateSquarecolor();

    let moveable = false;
    let moveTarget = "";
    let moveScopes = [];

    

    function checkBlack(n,values){
        let target = values[n];
        let scopes = [];
        let x = n;
        switch(target){
            case "o":
                x -= 8;
                if("prnbkq".indexOf(values[x-1]) >= 0 && x%8 != 0){
                    scopes.push(x-1);
                }
                if("prnbkq".indexOf(values[x+1]) >= 0 && x%8 != 7){
                    scopes.push(x+1);
                }
                if(x >= 0 && values[x] == 0){
                    scopes.push(x);
                    if(x >= 40){
                        if(x-8 >= 0 && values[x-8] == 0){
                            scopes.push(x-8);
                        }
                    }
                }
                break;
            case "t":
                x = n;
                x -= 8;
                while(x >= 0){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("prnbqk".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x -= 8;
                }
                x = n;
                x += 8;
                while(x < 64){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("prnbqk".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x += 8;
                }
                x = n;
                x++;
                while(x%8 != 0){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("prnbqk".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x++;
                }
                x = n;
                x--;
                while(x%8 != 7){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("prnbqk".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x--;
                }
                break;
            case "m":
                x = n;
                if(x%8 > 1 && x%8 < 6){
                    x -= 17;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x -= 15;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
    
                    x = n;
                    x -= 10;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x -= 6;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 6;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 10;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 15;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 17;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                }
                else {
                    x = n;
                    if(x%8 <= 1){
                        x = n;
                        x -= 15;
                        if(("prnbqk".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                            scopes.push(x);
                        }
                        x = n;
                        x -= 6;
                        if(("prnbqk".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                            scopes.push(x);
                        }
                        x = n;
                        x += 10;
                        if(("prnbqk".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                            scopes.push(x);
                        }
                        x = n;
                        x += 17;
                        if(("prnbqk".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                            scopes.push(x);
                        }
                    }
                    x = n;
                    if(x%8 == 1){
                        x -= 17;
                        if(("prnbqk".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                            scopes.push(x);
                        }
                        x = n;
                        x += 15;
                        if(("prnbqk".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                            scopes.push(x);
                        }
                    }
                    if(x%8 >= 6){
                        x = n;
                        x -= 17;
                        if(("prnbqk".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                            scopes.push(x);
                        }
                        x = n;
                        x -= 10;
                        if(("prnbqk".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                            scopes.push(x);
                        }
                        x = n;
                        x += 6;
                        if(("prnbqk".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                            scopes.push(x);
                        }
                        x = n;
                        x += 15;
                        if(("prnbqk".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                            scopes.push(x);
                        }
                    }
                    x = n;
                    if(x%8 == 6){
                        x = n;
                        x -= 15;
                        if(("prnbqk".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                            scopes.push(x);
                        }
                        x = n;
                        x += 17;
                        if(("prnbqk".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                            scopes.push(x);
                        }
                    }
                }
                break;
            case "v":
                x = n;
                x -= 9;
                while(x >= 0 && x%8 !== 7){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("prnbqk".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x -= 9;
                }
                x = n;
                x += 7;
                while(x < 64 && x%8 !== 7){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("prnbqk".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x += 7;
                }
                x = n;
                x += 9;
                while(x%8 != 0 && x%8 !== 0){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("prnbqk".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x += 9;
                }
                x = n;
                x -= 7;
                while(x%8 != 0){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("prnbqk".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x -= 7;
                }
                break;
            case "w":
                x = n;
                x -= 8;
                while(x >= 0){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("prnbqk".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x -= 8;
                }
                x = n;
                x += 8;
                while(x < 64){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("prnbqk".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x += 8;
                }
                x = n;
                x++;
                while(x%8 != 0){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("prnbqk".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x++;
                }
                x = n;
                x--;
                while(x%8 != 7){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("prnbqk".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x--;
                }
                x = n;
                x -= 9;
                while(x >= 0 && x%8 !== 7){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("prnbqk".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x -= 9;
                }
                x = n;
                x += 7;
                while(x < 64 && x%8 !== 7){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("prnbqk".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x += 7;
                }
                x = n;
                x += 9;
                while(x%8 != 0 && x%8 !== 0){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("prnbqk".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x += 9;
                }
                x = n;
                x -= 7;
                while(x%8 != 0){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("prnbqk".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x -= 7;
                }
                break;
            case "l":
                x = n;
                x += 8;
                if(("prnbqk".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x -= 8;
                if(("prnbqk".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                if(x%8 > 0){
                    x = n;
                    x -= 1;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x -= 9;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
    
                    x = n;
                    x += 7;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                }
                x = n;
                if(x%8 < 7){
                    x = n;
                    x += 1;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 9;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x -= 7;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                }
                x = n;
                if(!ck){
                    cl = false;
                    if(!cr2){
                        if(values[n+1] == 0 && values[n+2] == 0 && values[n+3] == "t"){
                            scopes.push(x+2);
                            cl = true;
                        }
                    }
                    if(!cr1){
                        if(values[n-1] == 0 && values[n-2] == 0 && values[n-3] == 0 && values[n-4] == "t"){
                            scopes.push(x-2);
                            cl = true;
                        }
                    }
                }
                break;
            
        }
        if(scopes.length) return scopes;
    
    }        
      
    function checkWhite(n,values){
        let target = values[n];
        let scopes = [];
        let x = n;
        switch(target){
            case "p":
                x += 8;
                if("otmvlw".indexOf(values[x-1]) >= 0 && x%8 != 0){
                    scopes.push(x-1);
                }
                if("otmvlw".indexOf(values[x+1]) >= 0 && x%8 != 7){
                    scopes.push(x+1);
                }
                if(x < 64 && values[x] == 0){
                    scopes.push(x);
                    if(x <= 23){
                        if(x+8 >= 0 && values[x+8] == 0){
                            scopes.push(x+8);
                        }
                    }
                }
                break;
            case "r":
                x = n;
                x -= 8;
                while(x >= 0){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("otmvlw".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x -= 8;
                }
                x = n;
                x += 8;
                while(x < 64){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("otmvlw".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x += 8;
                }
                x = n;
                x++;
                while(x%8 != 0){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("otmvlw".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x++;
                }
                x = n;
                x--;
                while(x%8 != 7){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("otmvlw".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x--;
                }
                break;
            case "n":
                x = n;
                if(x%8 > 1 && x%8 < 6){
                    x -= 17;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x -= 15;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
    
                    x = n;
                    x -= 10;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x -= 6;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 6;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 10;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 15;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 17;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                }
                else {
                    x = n;
                    if(x%8 <= 1){
                        x = n;
                        x -= 15;
                        if(("otmvlw".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                            scopes.push(x);
                        }
                        x = n;
                        x -= 6;
                        if(("otmvlw".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                            scopes.push(x);
                        }
                        x = n;
                        x += 10;
                        if(("otmvlw".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                            scopes.push(x);
                        }
                        x = n;
                        x += 17;
                        if(("otmvlw".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                            scopes.push(x);
                        }
                    }
                    x = n;
                    if(x%8 == 1){
                        x -= 17;
                        if(("otmvlw".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                            scopes.push(x);
                        }
                        x = n;
                        x += 15;
                        if(("otmvlw".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                            scopes.push(x);
                        }
                    }
                    if(x%8 >= 6){
                        x = n;
                        x -= 17;
                        if(("otmvlw".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                            scopes.push(x);
                        }
                        x = n;
                        x -= 10;
                        if(("otmvlw".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                            scopes.push(x);
                        }
                        x = n;
                        x += 6;
                        if(("otmvlw".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                            scopes.push(x);
                        }
                        x = n;
                        x += 15;
                        if(("otmvlw".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                            scopes.push(x);
                        }
                    }
                    x = n;
                    if(x%8 == 6){
                        x = n;
                        x -= 15;
                        if(("otmvlw".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                            scopes.push(x);
                        }
                        x = n;
                        x += 17;
                        if(("otmvlw".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                            scopes.push(x);
                        }
                    }
                }
                break;
            case "b":
                x = n;
                x -= 9;
                while(x >= 0 && x%8 !== 7){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("otmvlw".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x -= 9;
                }
                x = n;
                x += 7;
                while(x < 64 && x%8 !== 7){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("otmvlw".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x += 7;
                }
                x = n;
                x += 9;
                while(x%8 != 0 && x%8 !== 0){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("otmvlw".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x += 9;
                }
                x = n;
                x -= 7;
                while(x%8 != 0){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("otmvlw".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x -= 7;
                }
                break;
            case "q":
                x = n;
                x -= 8;
                while(x >= 0){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("otmvlw".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x -= 8;
                }
                x = n;
                x += 8;
                while(x < 64){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("otmvlw".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x += 8;
                }
                x = n;
                x++;
                while(x%8 != 0){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("otmvlw".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x++;
                }
                x = n;
                x--;
                while(x%8 != 7){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("otmvlw".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x--;
                }
                x = n;
                x -= 9;
                while(x >= 0 && x%8 !== 7){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("otmvlw".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x -= 9;
                }
                x = n;
                x += 7;
                while(x < 64 && x%8 !== 7){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("otmvlw".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x += 7;
                }
                x = n;
                x += 9;
                while(x%8 != 0 && x%8 !== 0){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("otmvlw".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x += 9;
                }
                x = n;
                x -= 7;
                while(x%8 != 0){
                    if(values[x] == 0){
                        scopes.push(x);
                    }
                    else if("otmvlw".indexOf(values[x]) >= 0){
                        scopes.push(x);
                        break;
                    }
                    else {
                        break;
                    }
                    x -= 7;
                }
                break;
            case "k":
                x = n;
                x += 8;
                if(("otmvlw".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x -= 8;
                if(("otmvlw".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                if(x%8 > 0){
                    x = n;
                    x -= 1;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x -= 9;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
    
                    x = n;
                    x += 7;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                }
                x = n;
                if(x%8 < 7){
                    x = n;
                    x += 1;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 9;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x -= 7;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] == 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                }
                break;
            }
        if(scopes.length) return scopes;
    }

    let myTurn = true;

    function check(){
        if(myTurn){
            let n = Number(this.classList[1].slice(1));
            let scopes = checkBlack(n,values) || [];

            if(!moveable){
                if(scopes.length > 0){
                    moveable = true;
                    moveTarget = n;
                    moveScopes = scopes.join(",").split(",");
                }
            }
            else if(moveScopes.indexOf(String(n)) >= 0){
                    let checkArr = [];
                    let saveKing = false;
                    for(let z = 0; z < 64; z++){
                        checkArr[z] = values[z];
                    }

                    let dataObj ={};
                    dataObj.n = checkArr[moveTarget];
                    dataObj.moveTarget = 0;
                    function* range(start, end) {
                        for (let i = start; i < end; i++) {
                          yield i;
                        }
                      }
                      for (let y of range(0, 64)) {
                        if("prnbkq".indexOf(checkArr[y].toString()) >= 0) {
                            let checkScp = checkWhite(y,checkArr) || [];
                            for (let piece of checkScp) {
                                if (checkArr[piece] == 'l') {
                                    if (!saveKing) {
                                        alert('Save Your King');
                                        saveKing = true;
                                    }
                                }
                            }
                        }
                    }

                    if(!saveKing){
                        values[n] = values[moveTarget];
                        values[moveTarget] = 0;
                        if(cl){
                            if(n == 62 && moveTarget == 60){
                                values[63] = 0;
                                values[61] = "t";
                            }
                            else if(n == 58 && moveTarget == 60){
                                values[59] = "t";
                                values[56] = 0;
                            }
                        }
                        if(moveTarget == 60){
                            ck = true;
                        }
                        else if(moveTarget == 63){
                            cr2 = true;
                        }
                        else if(moveTarget == 56){
                            cr1 = true;
                        }
                        if(values[n] == "o" && n < 8){
                            values[n] = "w";
                        }
                        moveable = false;
                        scopes = [];
                        myTurn = false;
                        setTimeout(chooseTurn,1000);
                    }

            }
            else {
            moveScopes = [];
            moveable = false;
            }

            updateSquarecolor();

            for(let x = 0; x < 64; x++){
                sqs[x].innerHTML = fonts[values[x]];
                if(values[x] == 0){
                    sqs[x].innerHTML = "";
                }
            }
            
            for (const key of Object.keys(scopes)) {
                sqs[scopes[key]].style.background = "#f45";
              }
              
        }
    }

    function chooseTurn(){
        let approved = [];
        let actions = [];
        let effects = [];
        let n;

        for(n = 0; n < 64; n++){
            if("prnbqk".indexOf(values[n].toString()) >= 0){
                let scopes = checkWhite(n,values) || [];
                for(let x = 0; x < scopes.length; x++){
                    let tmp = [];
                    for(let xx = 0; xx < 64; xx++){
                        tmp[xx] = values[xx]
                    }
                    let effect = 0;
                    let randomArray = new Uint32Array(1);
                    crypto.getRandomValues(randomArray);
                    let action = randomArray[0] % 4;                    
                    //Action value
                    let actionValue = tmp[scopes[x]].toString();
                    let  rand=Math.random();
                    switch (actionValue) {
                        case "l":
                            action = 100 + rand*3;                            
                            break;
                        case "w":
                            action = 50 + rand*3;                            
                            break;
                        case "v":
                        case "m":
                        case "t":
                            action = 30 + rand*3;                            
                            break;
                        case "o":
                            action = 15 + rand*3;
                            break;
                        default:
                            // Manejar el caso en el que actionValue no coincida con ningún caso
                            break;
                    }
                    
                    //Effect value
                    tmp[scopes[x]] = tmp[n];
                    tmp[n] = 0;
                    for(let y = 0; y < 64; y++){
                        if("otmvlw".indexOf(values[y].toString()) >= 0){
                            let tmpScp = checkBlack(y,tmp) || [];
                            for(let z = 0; z < tmpScp.length; z++){
                                let effectValue = tmp[tmpScp[z]];
                                switch (effectValue) {
                                    case "k":
                                        if (effect < 100) {
                                            effect = 100;
                                        }
                                        break;
                                    case "q":
                                        if (effect < 50) {
                                            effect = 50;
                                        }
                                        break;
                                    case "b":
                                    case "n":
                                    case "r":
                                        if (effect < 30) {
                                            effect = 30;
                                        }
                                        break;
                                    case "p":
                                        if (effect < 15) {
                                            effect = 15;
                                        }
                                        break;
                                    default:
                                        // Manejar el caso en el que effectValue no coincida con ningún caso
                                        break;
                                }
                                
                            }
                        }
                    }




                    actions.push(action);
                    effects.push(effect);
                    approved.push(n+"-"+scopes[x]);
                }
            }
        }

        //alert(actions);

        let bestEffect = Math.min.apply(null,effects);
        //alert(bestEffect);
        if(bestEffect >= 100){
            alert("You Win");
            setTimeout(function(){
                values = ['r','n','b','q','k','b','n','r','p','p','p','p','p','p','p','p',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'o','o','o','o','o','o','o','o','t','m','v','w','l','v','m','t'];
        },100);
        }

        let tmpA = [];
        let tmpB = [];        
        let bestMove = "";
        
        for(let n = 0; n < effects.length; n++){
            if(effects[n] == bestEffect){
                tmpA.push(actions[n]);
                tmpB.push(approved[n]);
            }
        }
        bestMove = tmpB[tmpA.indexOf(Math.max.apply(null,tmpA))];
    
        if(bestMove){
            values[Number(bestMove.split("-")[1])] = values[Number(bestMove.split("-")[0])];
            values[Number(bestMove.split("-")[0])] = 0;
            if(values[Number(bestMove.split("-")[1])] == "p" && Number(bestMove.split("-")[1]) >= 56){
                values[Number(bestMove.split("-")[1])] = "q";
            }

            sqs[bestMove.split("-")[1]].style.background = '#aaf';
            sqs[bestMove.split("-")[0]].style.background = '#aaf';

            for(let x = 0; x < 64; x++){
                //sqs[x].style.background = "#afa"//classList.add("scope");
                sqs[x].innerHTML = fonts[values[x]];
                if(values[x] == 0){
                    sqs[x].innerHTML = "";
                }
            }
            myTurn = true;
        }
        else {
            //alert('You Win');
        }
    }
}
//chooseTurn();
