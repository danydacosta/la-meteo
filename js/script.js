/* FRONTEND */
//Page chargée
$(document).ready(function() {
    const program = new Program(null)
    program.Locate()
    
    //Active les tooltips
    $('body').tooltip({
        selector: '.location'
    });

    //Clique sur le lieu
    $('.location').click(function() {
        var myLatlng = {lat: program.city.latitude, lng: program.city.longitude}

        var map = new WeatherMap(document.getElementById('map'), {
            zoom: 8,
            center: myLatlng
        });

        //Clique sur la map
        google.maps.event.addListener(map, 'click', function(data){
            map.Click(data);
        });

        program.ShowMap();
    });

});