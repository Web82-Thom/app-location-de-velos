class Canvas {
    constructor(canvas) {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 200;
        this.canvas.height = 100;
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = '#000000';
        this.draw = false;
        this.finger = false;
        this.mousePosition = {x: 0, y: 0};
        this.lastPosition = this.mousePosition;
        this.signature = false;

        this.clearButton = document.getElementById("clearButton");
        this.validateButton = document.getElementById("validateButton");

        this.eventMouse();
        this.eventPad();
        this.eventButtons();
    }
     
    eventMouse() {
        let self = this;
        this.canvas.addEventListener("mousedown", function (event) {
            self.draw = true;
            self.lastPosition = self.getPosition(event);
        });
        this.canvas.addEventListener("mousemove", function (event) {
            self.mousePosition = self.getPosition(event);
            self.drawing();
        });
        this.canvas.addEventListener("mouseup", function (event) {
            self.draw = false;
        });
    }

    eventPad() { 
        let self = this;
        this.canvas.addEventListener("touchstart", function (event) {
            self.draw = true;
            self.finger = true;
            self.lastPosition = self.getPosition(event);
        });

        this.canvas.addEventListener("touchmove", function (event) {
            self.mousePosition = self.getPosition(event);
            self.drawing();
        });

        this.canvas.addEventListener("touchend", function (event) {
            self.draw = false;
            self.finger = false;
        });
    }

    eventButtons() { 
        let self = this;
        this.clearButton.addEventListener("click", function (event) {
            event.preventDefault();
            self.clearCanvas();
        });
       
        this.validateButton.addEventListener("click", function (event) {
            if (!self.signature) { 
                alert ('Veuillez signer pour continuer');
            } else {
                if (sessionStorage.getItem('reservationEnd') && self.signature) {
                    alert("Vous avez déjà une reservation en cours. Cette nouvelle réservation écrasera l'ancienne.");
                }
                sessionStorage.setItem("nameStation", document.getElementById("nameStation").textContent);
                document.getElementById('timer').style.display = 'block';
                
                let timer = new Timer(); 
                timer.newDate();

                return true;
            }
        })
    }
     
    getPosition(event) {
        if (this.draw) {
            let eRect = this.canvas.getBoundingClientRect();
            if (this.finger) {
                return {
                    x: event.touches[0].clientX - eRect.left,
                    y: event.touches[0].clientY - eRect.top
                };
            } else { 
                return {
                    x: event.clientX - eRect.left,
                    y: event.clientY - eRect.top,
                };
            }
        }
    }

    drawing() {
        if (this.draw) {
            this.signature = true;
            this.ctx.beginPath();
            this.ctx.moveTo(this.lastPosition.x, this.lastPosition.y);
            this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y);
            this.ctx.stroke();
            this.lastPosition = this.mousePosition;
        }
    }

    clearCanvas() {
        this.signature = false;
        this.canvas.width = this.canvas.width;
    }
} 