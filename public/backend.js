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

function createNewColor() { // changes the color to a random color within certain "buffer" parameters
    var h = Math.round(360 * Math.random());
    var s = Math.round((100 - 2 * buffer) * Math.random() + buffer);
    var l = Math.round((100 - 2 * buffer) * Math.random() + buffer);
    currentColor = new HSLColor(h, s, l);
}

function changePfColor() {
    createNewColor()
    document.getElementById("pf").style.background = "HSL(" + currentColor.h + ", " + currentColor.s + "%, " + currentColor.l + "%)";
    document.getElementById("hslvalues").innerHTML = "HSL(" + currentColor.h + ", " + currentColor.s + "%, " + currentColor.l + "%)";
}

function changePfColorSpcfc(h, s, l) {
    document.getElementById("pf").style.background = "HSL(" + h + ", " + s + "%, " + l + "%)";
}


async function startGame() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("circle").style.display = "none";
    document.getElementById("game").style.display = "block";

    document.getElementById("pfText").innerHTML = "Ready?" // Pre Game
    await new Promise(r => setTimeout(r, 1000));


    changePfColor()
    document.getElementById("pfCntr").style.color = 'white';
    document.getElementById("pfText").innerHTML = ""
    await new Promise(r => setTimeout(r, 500));

    for(var i = 3; i > 0; i--) { // Countdown
        document.getElementById("pfText").innerHTML = i
    await new Promise(r => setTimeout(r, 1));
    }
    changePfColorSpcfc(0, 100, 100) // Playfield turns white
    document.getElementById("circle").style.display = "block"; // Displays circle


    let circle = document.getElementById('circle');

    document.getElementById('pf').addEventListener('mousemove', usePosition)

    function getPosition(e) { // Returns x, y positions relative to the playfield
        var el = document.getElementById("pf");
        var x = Math.floor(e.clientX - el.getBoundingClientRect().left);
        var y = Math.floor(e.clientY - el.getBoundingClientRect().left);
        return {x, y}
      }

      function usePosition(e) {
        var position = getPosition(e);
        document.getElementById("posvalues").innerHTML = "X: " + position.x + "| Y: " + position.y;
        circle.style.left = e.pageX + 'px'; // Moves circle to cursor
        circle.style.top = e.pageY + 'px'; // Moves circle to cursor

        var tempS = (position.x / document.getElementById('pf').offsetWidth) * (100 - 2 * buffer) + buffer;
        var tempL = ((document.getElementById('pf').offsetHeight - position.y) / document.getElementById('pf').offsetHeight) * (100 - 2 * buffer) + buffer;
        console.log(document.getElementById('pf').style.width)
        circle.style.background = "HSL(" + currentColor.h + ", " + tempS + "%, " + tempL + "%)";
      }


    await new Promise(r => setTimeout(r, 1000000));
        changePfColor()
        await new Promise(r => setTimeout(r, 1000));

}