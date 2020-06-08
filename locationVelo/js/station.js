class Station {
    defineIcon() {
        let color = "green";
        
        if (this.status === "CLOSED" || this.available_bikes === 0) {
            color = "red";
        } else if (this.available_bikes / this.bike_stands < 0.5) {
            color = "orange";
        }

        return L.icon({
            iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-" + color + ".png", // ...2x-green.png
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        });
    }
}
