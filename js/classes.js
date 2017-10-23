/* BACKEND */
class Program{
    constructor(map){
        this.Locate()
        this.map = map
    }

    Locate(){
        let that = this;

        if (!navigator.geolocation){
            $('.location').text("La géolocalisation n'est pas supportée par votre navigateur");
            return;
        }

        function success(position) {
            var latitude  = position.coords.latitude;
            var longitude = position.coords.longitude;
        
            var url = 'maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=';
            that.Request(url, function(response) {
                $('.location').text(response.results[2].address_components[0].long_name);
            });
        }

        function error() {
            $('.location').text("Impossible de retrouver votre localisation.");
        }

        $('.location').text("Localisation en cours...");
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

    Request(url, callback, type = 'GET', baseUrl = `https://maps.googleapis.com/`){
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
}

class City{
    constructor(longitude, latitude){
        this.longitude = longitude
        this.latitude = latitude
    }
    
    FetchMeteo(){
        
    }
}