
        var mapOptions = null;
        var map = null;
       
        var infowindow;
        ( 
            function () 
            {
                google.maps.Map.prototype.markers = new Array();
                google.maps.Map.prototype.getMarkers = function ()
                {
                return this.markers
                };
            
                google.maps.Map.prototype.clearMarkers = function () 
                {
                    for (var i = 0; i < this.markers.length; i++)
                    {
                        this.markers[i].setMap(null);
                    }
                this.markers = new Array();
                };
            
                google.maps.Marker.prototype._setMap = google.maps.Marker.prototype.setMap;
                google.maps.Marker.prototype.setMap = function (map) 
                {
                    if (map) {
                        map.markers[map.markers.length] = this;
                    }
                    this._setMap(map);
                }
            }
        )
        ();
            
        
        
        function initMap() {
            
            // lat=17;
            // lng=-96;

                lat = $("#latitud").val();
                lng=$("#longitud").val();
            
          
            mapOptions = {
                center: new google.maps.LatLng(lat, lng),
                zoom: 18,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(document.getElementById("map_canvas"),
                mapOptions);
            
            google.maps.event.addListener(map, 'click', function (event) {
                
                lat =event.latLng.lat();
                lng=event.latLng.lng();

                document.getElementById('latitud').value=lat;
                document.getElementById('longitud').value=lng;
                
                map.clearMarkers();
                drawMarker();
            });
            
            drawMarker();

            $("#button").click(function(){
                clima();
                obtenerDireccion();

                lat = $("#latitud").val();
                lng=$("#longitud").val();
            
          
            mapOptions = {
                center: new google.maps.LatLng(lat, lng),
                zoom: 18,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(document.getElementById("map_canvas"),
                mapOptions);
            
            google.maps.event.addListener(map, 'click', function (event) {
                
                lat =event.latLng.lat();
                lng=event.latLng.lng();

                document.getElementById('latitud').value=lat;
                document.getElementById('longitud').value=lng;
                
                map.clearMarkers();
                drawMarker();
            });
            
            drawMarker();
                
            });

        }

        
        function drawMarker() 
        {
            
            var infowindow = new google.maps.InfoWindow();
            var marker, i; 
            //var nombre = sessionStorage.nombreCliente;
            var message = "Oaxaca";
            var charMarker ="c";
            var pinColor ="FFFF00";
            
                pinColor = $("#cambiarColor").val();
                charMarker = $("#cambiarSimbolo").val();
                message=$("#cambiarMensaje").val();
            
            
            
                var pinImage = new google.maps.MarkerImage
                
                ("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=" + charMarker + "|" + pinColor,
                        new google.maps.Size(40, 60),
                        new google.maps.Point(0, 0),
                        new google.maps.Point(20, 60));

                marker = new google.maps.Marker({
                    position: new google.maps.LatLng($("#latitud").val(),$("#longitud").val()),
                    icon: pinImage,
                    title: '' + message,
                    map: map
                });

               

                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infowindow.setContent("Bego");
                        infowindow.open(map, marker);
                    }
                })(marker, i));
           
        }

              
                function obtenerDireccion(){
                    var lat = $("#latitud").val();
                    var lng=$("#longitud").val();
        
                    $.ajax({
                        type: 'GET',
                         url : 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+ lat +',' + lng + '&key=AIzaSyDwdTGZB8M6wGMRkfPjdFHKVqWX5ZOGIg0',
                        // url : 'https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyBxdVzf8fBEfnSZkDDSNfVrBseLiM00qo4',

                        dataType: 'json'
                
                    })
                    .done(function( data ){
                        $(".direccion").text(data.results[0].formatted_address);
                        console.log(data.results[0].formatted_address);

                    })
                    .fail(function(){
                        console.log("Fallo!");
                    })
                    .always(function(){
                        console.log("Completo!");
                    })
                }
                    


        function titulo()
        {
                var titulo=$("#cambiarTitulo").val();
                $("#titulo").text(titulo);
        }
        
        
			function clima(){
                var lat = $("#latitud").val();
                var lng=$("#longitud").val();
                    $.ajax({
                        type: 'GET',
                        url : 'http://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon=' + lng + "&units=metric&appid=9f50a805aa0089a1edd1829a5db029f0",
                        dataType: 'jsonp'
                
                    })
                    .done(function( data ){
                        
                        console.log("Correcto!");
                        var tiempo= data;
                
                        console.log( data ); // Se imprime en consola la api
                        $(".clima").text(tiempo.main.temp +"°");
        
                        if(tiempo.main.temp>=30){
                            $("#clima").css("background-image", "url(img/sunny.jpg)");
                            console.log(tiempo.weather[0].main);
                            $("#imagen").attr("src","img/sun.png");
        
                        }
                        else if(tiempo.main.temp<=10){
                            $("#clima").css("background-image", "url(img/snow.jpg)");
                            $("#imagen").attr("src","img/snowf.jpg");
        
                            console.log(tiempo.weather[0].main);
                        }
                        else if(tiempo.weather[0].main === "Rain"){
                            $("#clima").css("background-image", "url(img/rainy.jpg)"); 
                            $("#imagen").attr("src","img/rain.png");
        
                            console.log(tiempo.weather[0].main); 
        
                        }
                        else if(tiempo.weather[0].main =="Clouds" ){
                            $("#clima").css("background-image", "url(img/foggy.jpg)");
                            $("#imagen").attr("src","img/cloud.png");
        
                            console.log(tiempo.weather[0].main);
                        }
                
                    })
                    .fail(function(){
                        console.log("Fallo!");
                    })
                    .always(function(){
                        console.log("Completo!");
                    });
            }
