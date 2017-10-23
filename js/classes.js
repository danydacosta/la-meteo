/* BACKEND */
class Program{
    constructor(map){
        this.Locate()
        this.map = map
    }

    Locate(){
        let that = this;

        //Test si la géolocalisation est possible sur le navigateur
        if (!navigator.geolocation){
            $('.location').text("La géolocalisation n'est pas supportée par votre navigateur");                                         //A mettre dans le "script.js"
            return;
        }

        function success(position) {
            that.city = new City(position.coords.longitude, position.coords.latitude);
                    
            Request(`maps/api/geocode/json?latlng=${that.city.latitude},${that.city.longitude}&key=${key}`, function(response) {
                let name = response.results[2].address_components[0].long_name;
                //Affiche le nom de la ville
                $('.location').text(name);                                                                                              //A mettre dans le "script.js"
                that.city.name = name;
                that.city.FetchTooltipWeather();
            });
        }

        function error() {
            $('.location').text("Impossible de retrouver votre localisation.");                                                         //A mettre dans le "script.js"
        }

        $('.location').text("Localisation en cours...");                                                                                //A mettre dans le "script.js"
        navigator.geolocation.getCurrentPosition(success, error);   
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
    
    FetchTooltipWeather(){
        let that = this
        Request(`services/json/lat=${this.latitude}lng=${this.longitude}`, function(response){
            $('.location').attr("title", `Météo de ${that.name} du ${response.fcst_day_0.day_long}`).tooltip('fixTitle').tooltip('show');   //A mettre dans le "script.js"
        }, 'GET', 'http://prevision-meteo.ch/');
    }
}

function Request(url, callback, type = 'GET', baseUrl = `https://maps.googleapis.com/`){
    $.ajax({
        url: baseUrl + url.split('?')[0],
        type: type,
        data: url.split('?')[1],
        success: data => {
            callback(data);
        },
        error: function(xhr, status, error) {
            //Affichage du message d'erreur
            console.log(xhr.status);
        }
    });
}