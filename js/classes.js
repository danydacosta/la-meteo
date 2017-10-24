/* BACKEND */
class Program{
    constructor(map){
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
                //Set le nom de la ville
                that.city.name = name;
                //Une fois le tout chargé, on fetch la météo s'affichant dans la tooltip
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
        $('.map-wrapper').css('display', 'block');
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
            //Contenu de la tooltip
            that.tooltipWeather = `Météo de ${that.name} du ${response.fcst_day_0.day_long} ${response.current_condition.date} à ${response.current_condition.hour}

Température : ${response.current_condition.tmp}°C [min.${response.fcst_day_0.tmin}°C, max.${response.fcst_day_0.tmax}°C]
Condition : ${response.current_condition.condition}
Humidité : ${response.current_condition.humidity}%
Vitesse du vent : ${response.current_condition.wnd_spd} km/h
Vitesse du vent en rafale : ${response.current_condition.wnd_gust} km/h
Pression : ${response.current_condition.pressure} hPa`

            //Icon
            $('.meteo-icon').attr("src", response.current_condition.icon_big);                                                              //A mettre dans le "script.js"

            $('.location').attr("title", that.tooltipWeather).tooltip('fixTitle').tooltip('show');                                          //A mettre dans le "script.js"
        }, 'GET', 'http://prevision-meteo.ch/');
    }

    FetchInfoWindowWeather(callback){
        Request(`services/json/lat=${this.latitude}lng=${this.longitude}`, function(response){

        });
    }
}

class WeatherMap extends google.maps.Map{
    Click(data){
        let clickedCity = new City(data.latLng.lng(), data.latLng.lat());

        let infoWindowContent;
        clickedCity.FetchInfoWindowWeather(function(response){
            infoWindowContent = response;
        });

        let infowindow = new google.maps.InfoWindow({
            content: infoWindowContent,
            position: {lat: clickedCity.latitude, lng: clickedCity.longitude}
        });

        infowindow.open(this);
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
