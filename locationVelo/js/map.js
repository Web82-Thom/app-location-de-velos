class Map {
	constructor(map) {
		this.map = L.map('myMap').setView([43.6043, 1.4437], 10.5);
		this.url = "https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=60d427fce004ffb11b002248809bd0409d957fd8";
		document.getElementById("reserveButton").style.display = 'none';
		this.addMarkers();
		this.display();
	}

	display() {
		this.mapboxTiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			maxZoom: 17,
			minZoom: 12,
			id: 'mapbox/streets-v11',
			tileSize: 512,
			zoomOffset: -1,
			style: 'mapbox://styles/mapbox/streets-v9',
			accessToken:'pk.eyJ1IjoicnNzdGkiLCJhIjoiY2s3a2p3Y2ZpMDJvbDNpcXdxaDF5MmMxcyJ9.bz3MManHlDR0GmEvqhiD1Q',
		}).addTo(this.map);
	}

	addMarkers() {
		let self = this;
		// Requête XMLHttp JSON
		let requete = new XMLHttpRequest(); 
		requete.open('GET', this.url); 
		requete.send();
		requete.onload = function(e) {
			if (requete.readyState === XMLHttpRequest.DONE) {
				if (requete.status === 200) {
					this.reponse = requete.responseText;
					JSON.parse(this.response).forEach((data) => {
						let station = Object.assign(new Station, data);
						let marker = L.marker([station.position.lat, station.position.lng], {icon: station.defineIcon()});
						let regex = /......./;
						marker.bindPopup(station.name.replace(regex, "STATION"));
						marker.addEventListener('click', () => self.displayInfos(station));
						marker.addTo(self.map);
					});
				};
			} else {
				alert('Un problème est intervenu, merci de revenir plus tard.');
			}
        };
	}

	displayInfos(station) {
		let regex = /......./;
		document.getElementById("reserveButton").style.display = 'block';
		document.getElementById("nameStation").textContent = station.name.replace(regex, "");
		document.getElementById("address").textContent = station.address;
		document.getElementById("place").textContent = station.bike_stands;
		
		if (station.available_bikes === 0 || station.status === 'CLOSED') {
			document.getElementById("bikeDispo").textContent = station.available_bikes;
			document.getElementById('noBike').style.display = 'block';
			document.getElementById("reservation").style.display= "block";
			document.getElementById("button").style.display = 'none';
		} else { 
			document.getElementById('noBike').style.display = 'none';
			document.getElementById("button").style.display = 'block';
			document.getElementById("bikeDispo").textContent = station.available_bikes;
			document.getElementById("reservation").style.display= "block";
		}
	}
};