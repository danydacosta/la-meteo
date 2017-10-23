/* BACKEND */
class Program{
    constructor(map){
        this.Locate()
        this.map = map
    }

    Locate(){
        let that = this;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
               that.city = new City(position.coords.longitude, position.coords.latitude)
            });

            console.log(this);
        } else {
        /* geolocation IS NOT available */
        }
    }

    ShowMap(){

    }

    CloseMap(){

    }

    ShowPopup(){

    }

    ClosePopup(){

    }
}

class City{
    constructor(longitude, latitude){
        this.longitude = longitude
        this.latitude = latitude
    }
    
    FetchMeteo(){
        
    }
}