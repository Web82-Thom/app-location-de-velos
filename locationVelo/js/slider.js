class Slider { 
	constructor(slider) {
        this.index = 0;
        this.time = 5000;
        this.interval = 0; 

        this.slides = document.getElementsByClassName('slide');

        document.getElementById('play').addEventListener('click', () => this.autoMove());
        document.getElementById('paused').addEventListener('click', () => this.pause());
        document.getElementById('nextSlide').addEventListener('click', () => { this.nextSlide() });
        document.getElementById('previousSlide').addEventListener('click', () => { this.previousSlide() });
        this.keyboardControls();

        this.display();
        this.autoMove(); 
    };
    
     // Affiche la div index 1er slide
     display() {
        Array.prototype.forEach.call(this.slides, function(e) {e.style.display = "none"}); // fait que ma collection soit un tableau
        this.slides[this.index].style.display = "block";
    }
    // Auto-play du slider
    autoMove() {
        this.interval = setInterval(() => {
            this.nextSlide()
        }, this.time);
        document.getElementById('paused').style.display = 'block';
        document.getElementById('play').style.display = 'none';
    }

    // Défilement des images click
    nextSlide() {
        if (this.index < this.slides.length - 1 ) { // si l'index est inférieur au nombre de slides
            this.index++;
        } else {
            this.index = 0; // sinon, on revient au premier slide (dernier slide => premier slide)
        }

        this.display();
    }
    
    pause() {
        clearInterval(this.interval);
        document.getElementById('play').style.display = 'block';
        document.getElementById('paused').style.display = 'none';
    }

    previousSlide() {
        if (this.index !== 0) { 
            this.index--;
        } else {
            this.index =  this.slides.length - 1; // sinon on revient au dernier slide
        }
        
        this.display();
    }
    
    // Fonctions pour les commandes / clavier
    keyboardControls() {    
        document.addEventListener('keydown', (e) => {
            if ("ArrowLeft" === e.key) {
                this.previousSlide(); // <--
            } else if ("ArrowRight" === e.key) { //-->
                this.nextSlide();
            } else if ("Pause" === e.key) { // pause
                this.pause();
            } else if ("Enter" === e.key) { // p
                this.autoMove();
            }
        })
    }   
};