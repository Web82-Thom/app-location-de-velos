class Timer {
    constructor() {
        this.delay = 20.00;
        document.getElementById('deleteStorageButton').addEventListener('click', () => this.delete());
    }

    newDate() {
        sessionStorage.setItem("reservationEnd", new Date().getTime() + (this.delay * 60 * 1000));
        this.displayInterval();
    }

    displayInterval(){
        this.interval = setInterval( () => {this.display();}, 1000);
    } 

    display() {
        this.remainingTime = sessionStorage.reservationEnd - new Date().getTime(); // fin de décompte - la distance présent  sessionStorage.reservationEnd accede avec le get
        this.minutes = Math.floor((this.remainingTime % (1000 * 60 * 60)) / (1000 * 60)); // le nombre de minutes restantes
        this.seconds = Math.floor((this.remainingTime % (1000 * 60)) / 1000); // le nombre de secondes restantes
        
        if (this.remainingTime > 0) {
            document.getElementById('warning').style.display = 'none';
            document.getElementById('confirmReservation').textContent = "Vélo réservé à la station" + sessionStorage.getItem('nameStation') + ' par ' + localStorage.getItem("nom") + ' ' + localStorage.getItem("prenom");
            document.getElementById('counter').textContent = "Temps restant : " + this.minutes + ' min ' + this.seconds + ' sec ';
        } else { // fin du décompte
            clearInterval(this.interval);
            sessionStorage.removeItem('nameStation');
            sessionStorage.removeItem('reservationEnd');
            document.getElementById('counter').style.display = 'none';
            document.getElementById('confirmReservation').style.display = 'none';
            document.getElementById('warning').style.display ='block';
        }
    }

    delete() {
        window.location.reload();
        clearInterval(this.interval);
        sessionStorage.removeItem('nameStation');
        sessionStorage.removeItem('reservationEnd');
    }
}