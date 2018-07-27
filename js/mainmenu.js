//stroes the value of the choosen charcter and used by the player object 
var selected_char = 'char-boy';

/*
 * @description 
 *      - generates the starting menu 
 *      - generates the choose character screen
 * @param {function} startGame - function called when the user clicks start button
 * @param {function} render - function called to draw game background
 */
var startMenu = function(startGame, render) {
    //stores the boundaries of the start button
    this.start_btn = {
        x: 152,
        y: 240,
        width: 200,
        heigth: 80
    };
    //stores the boundaries of the choose button
    this.choose_btn = {
        x: 152,
        y: 380,
        width: 200,
        heigth: 80
    };

    //Array of charachters objects which contain thier name and location on the choose screen
    this.characters = [{ name: 'char-boy', x: 0, y: 230 },
        { name: 'char-cat-girl', x: 101, y: 230 },
        { name: 'char-horn-girl', x: 202, y: 230 },
        { name: 'char-pink-girl', x: 303, y: 230 },
        { name: 'char-princess-girl', x: 404, y: 230 }
    ];

    this.game_func = startGame;
    this.render = render
}

/*
 * @description 
 *      - sets the screen state (startingMenu or chooseChar)
 *      - calls render and drawStartButtons to draw background and buttons
 *      - add event listners to buttons
 */
startMenu.prototype.init = function() {
    this.canvas = document.getElementById('gameCanvas');
    this.state = "startingMenu";
    this.render();
    this.drawStartButtons();

    this.canvas.onclick = this.handleMouseClick.bind(this);
    this.canvas.onmousemove = this.handleMouseMove.bind(this);
}

/*
 * @description 
 *      - draws the start button and choose button to canvas
 */
startMenu.prototype.drawStartButtons = function() {
    //Draw start btn
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.rect(152, 240, 200, 80);
    ctx.fillStyle = '#DFD9C8';
    ctx.fill();
    ctx.strokeStyle = "#A8A8A2";
    ctx.stroke();
    ctx.closePath();
    ctx.font = '30pt Comic Sans MS';
    ctx.fillStyle = '#505050';
    ctx.fillText('Start', 200, 290);

    //Draw Choose Btn
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.rect(152, 380, 200, 80);
    ctx.fillStyle = '#DFD9C8';
    ctx.fill();
    ctx.strokeStyle = "#A8A8A2";
    ctx.stroke();
    ctx.closePath();
    ctx.font = '20pt Comic Sans MS';
    ctx.fillStyle = '#505050';
    ctx.fillText('Choose', 205, 415);
    ctx.fillText('Character', 188, 450);
}

// getMousePos and isInside function to check mouse postion to buttons
// from :https://stackoverflow.com/questions/24384368/simple-button-in-html5-canvas
startMenu.prototype.getMousePos = function(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

startMenu.prototype.isInside = function(pos, rect) {
    return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.heigth && pos.y > rect.y
}

/*
 * @description 
 *      - if on start menu screen (when user clicks on start button it starts the game and
 *      - when user clicks on choose button it calls setChooseScreen function)
 *      - if on choose Character screen (when user clicks on a character assign new char 
 *      - to selected_char and go back to start menu screen)
 */
startMenu.prototype.handleMouseClick = function(evt) {
    var mousePos = this.getMousePos(this.canvas, evt);
    //debugger;
    if (this.state == "startingMenu") {
        if (this.isInside(mousePos, this.start_btn)) {
            this.canvas.onclick = null;
            this.canvas.onmousemove = null;
            this.canvas.setAttribute("style", "cursor: auto");
            this.game_func();
        } else if (this.isInside(mousePos, this.choose_btn)) {
            this.canvas.setAttribute("style", "cursor: auto");
            this.setChooseScreen();
        }
    } else {
        var char_obj;
        for (let i = 0; i < this.characters.length; i++) {
            char_obj = {
                x: this.characters[i].x + 10,
                y: this.characters[i].y + 50,
                width: 80,
                heigth: 100
            }
            if (this.isInside(mousePos, char_obj)) {
                selected_char = this.characters[i].name;
                this.canvas.setAttribute("style", "cursor: auto");
                this.init();
                break;
            }

        }
    }

}

/*
 * @description 
 *      - it changes cursor shape to pointer when mouse hover over 
 *      - start and choose character buttons and the set of characters
 *      - and back to normal on mouse out
 */
startMenu.prototype.handleMouseMove = function(evt) {
    var mousePos = this.getMousePos(this.canvas, evt);
    //debugger;
    if (this.state == "startingMenu") {
        if (this.isInside(mousePos, this.start_btn) || this.isInside(mousePos, this.choose_btn))
            this.canvas.setAttribute("style", "cursor: pointer");
        else
            this.canvas.setAttribute("style", "cursor: auto");
    } else {
        var mouse_in = false;
        var char_obj;
        for (let i = 0; i < this.characters.length; i++) {
            char_obj = {
                x: this.characters[i].x + 10,
                y: this.characters[i].y + 50,
                width: 80,
                heigth: 100
            }
            if (this.isInside(mousePos, char_obj))
                mouse_in = true;
        }
        if (mouse_in)
            this.canvas.setAttribute("style", "cursor: pointer");
        else
            this.canvas.setAttribute("style", "cursor: auto");
    }

}

/*
 * @description 
 *      - changes state to chooseChar
 *      - clear screen and redraw background
 *      - draw the set of characters
 */
startMenu.prototype.setChooseScreen = function() {
    this.state = "chooseChar";
    this.render();
    for (let i = 0; i < this.characters.length; i++) {
        ctx.drawImage(Resources.get('images/' + this.characters[i].name + '.png'), this.characters[i].x, this.characters[i].y);
    }
}