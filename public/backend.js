document.getElementById("game").style.display = "none"; // Hides game interface

class HSLColor { // Class which holds 3 values for a color (h, s, l)
    constructor(h, s, l) {
        this.h = h;
        this.s = s;
        this.l = l;
    }
}
    
var currentColor = null; // variable which holds current color values in HSL
var buffer = 25;
var totalScore = 0;

function createNewColor() { // changes the color to a random color within certain "buffer" parameters
    var h = Math.round(360 * Math.random());
    var s = Math.round((100 - 2 * buffer) * Math.random() + buffer);
    var l = Math.round((100 - 2 * buffer) * Math.random() + buffer);
    currentColor = new HSLColor(h, s, l);
}

function changePfColor() {
    createNewColor()
    document.getElementById("pf").style.background = "HSL(" + currentColor.h + ", " + currentColor.s + "%, " + currentColor.l + "%)";
    //document.getElementById("hslvalues").innerHTML = "HSL(" + currentColor.h + ", " + currentColor.s + "%, " + currentColor.l + "%)";
}

function changePfColorSpcfc(h, s, l) {
    document.getElementById("pf").style.background = "HSL(" + h + ", " + s + "%, " + l + "%)";
}

async function runRound() {
    changePfColor()
    document.getElementById("pfCntr").style.color = 'white';
    document.getElementById("pfText").innerHTML = ""
    await new Promise(r => setTimeout(r, 500));

    for(var i = 3; i > 0; i--) { // Countdown
        document.getElementById("pfText").innerHTML = i
    await new Promise(r => setTimeout(r, 1000));
    }
    document.getElementById("pfText").style.display = "none" // Numbers are removed
    changePfColorSpcfc(0, 100, 100) // Playfield turns white
    
    document.getElementById("circle").style.display = "block"; // Displays circle


    let circle = document.getElementById('circle');
    let circleCorrect = document.getElementById('circleCorrect');
    let pf = document.getElementById('pf');
    var scale = (1/2) * Math.sqrt(Math.pow(pf.offsetWidth, 2) + Math.pow(pf.offsetHeight, 2)); // Calculates the max allowable distance for more than one point (scoring is based off this value)
    pf.addEventListener('mousemove', usePosition)
    pf.addEventListener('click', finishRound)

     function getPosition(e) { // Returns x, y positions relative to the playfield
        var x = Math.floor(e.clientX - pf.getBoundingClientRect().left);
        var y = Math.floor(e.clientY - pf.getBoundingClientRect().top);
        return {x, y}
      }

       function usePosition(e) {
        var position = getPosition(e);
        //document.getElementById("posvalues").innerHTML = "X: " + position.x + "| Y: " + position.y;
        circle.style.left = e.pageX + 'px'; // Moves circle to cursor
        circle.style.top = e.pageY + 'px'; // Moves circle to cursor

        var tempS = (position.x / pf.offsetWidth) * (100 - 2 * buffer) + buffer;
        var tempL = ((pf.offsetHeight - position.y) / pf.offsetHeight) * (100 - 2 * buffer) + buffer;
        circle.style.background = "HSL(" + currentColor.h + ", " + tempS + "%, " + tempL + "%)"; // Changes color based on position
        document.getElementById("circle").style.color = "HSL(0, 0, " + 100 - tempL + ")";
        document.getElementById("circleCorrect").style.color = "HSL(0, 0, " + 100 - currentColor.l + ")";
      }

       function finishRound(e) {
          pf.removeEventListener('click', finishRound)
          pf.removeEventListener('mousemove', usePosition)
        var x = Math.floor(e.clientX - pf.getBoundingClientRect().left); // User Response
        var y = Math.floor(e.clientY - pf.getBoundingClientRect().top);
        var correctX = (currentColor.s - buffer) * (pf.offsetWidth / (100 - 2 * buffer)); // Correct Response
        var correctY = pf.offsetHeight - ((currentColor.l - buffer) * (pf.offsetHeight) / (100 - 2 * buffer));
        var dist = Math.sqrt(Math.pow(x - correctX, 2) + Math.pow(y - correctY, 2)); // Distance between the two Responses
        var score = Math.floor(100 - (dist / (scale / 100))); // Score
        
        if(score > 0)
        document.getElementById("roundScore").innerHTML = score;
        else
        document.getElementById("roundScore").innerHTML = 1;

        circleCorrect.style.left = (correctX + pf.getBoundingClientRect().left) + 'px'; // Positions the answer
        circleCorrect.style.top = (correctY + pf.getBoundingClientRect().top) + 'px'; // Positions the answer
        circleCorrect.style.background = "HSL(" + currentColor.h + ", " + currentColor.s + "%, " + currentColor.l + "%)"; // Sets the answer's color
        document.getElementById("circle").innerHTML = "You"
        document.getElementById("circleCorrect").innerHTML = "Actual"
        document.getElementById("circleCorrect").style.display = "block";
        document.getElementById("circle").style.display = "block"; // Shows the answer circle
      }
    }


 async function startGame() {
    totalScore = 0;
    document.getElementById("menu").style.display = "none";
    document.getElementById("circle").style.display = "none";
    document.getElementById("circleCorrect").style.display = "none";
    document.getElementById("game").style.display = "block";
        
    document.getElementById("pfText").innerHTML = "Ready?" // Pre Game
    await new Promise(r => setTimeout(r, 1000));
    //for(var i = 0; i < 10; i++) {
        runRound();
    //}
}