class Formulaire {
    constructor() {
        this.eventListenerMethodes();

        this.form = document.getElementById('form');
        this.reservation = document.getElementById('reservation');
        this.canvas = document.getElementById('signature');
        this.sectionTimer = document.getElementById('timer');
        document.getElementById('nom').value = localStorage.getItem('nom');
        document.getElementById('prenom').value = localStorage.getItem('prenom');
        
        this.initSetting();
    }
    
    eventListenerMethodes() {
        document.getElementById("reserveButton").addEventListener('click', () => this.display());
        document.getElementById('validationButton').addEventListener('click' , () => this.verification());
        
    }

    display() {
        let infosName = document.getElementById("nameStation").textContent;
        if (infosName !== "" ) { 
            this.form.style.display = 'block'; 
        } else {
            alert("Veuillez selectionner une station");
        }
    }

    verification() {
        let name = document.getElementById("nom").value;
        let firstName = document.getElementById("prenom").value;

        if (name !== "" &&
            firstName !== "" &&
            name.length > 2 && 
            name.length < 25 && 
            firstName.length > 2 && 
            firstName.length < 25) {
                localStorage.setItem("nom", name);
                localStorage.setItem("prenom", firstName);
                this.canvas.style.display = 'block';
        } else { 
            alert("Veuillez remplir correctement tous les champs");
        }
    }
    
    initSetting () {
        window.addEventListener("DOMContentLoaded", () => {
            if (sessionStorage.getItem('reservationEnd')) {
                this.form.style.display = "block";
                this.canvas.style.display = "block";
                this.sectionTimer.style.display = 'block';
                let timer = new Timer();
                timer.displayInterval();
            }
        });
    }
}