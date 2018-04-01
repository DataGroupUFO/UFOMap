//This file keeps track of our "requires"

window.require = require;

var request = require('superagent');
    google.charts.load('current', {
      'packages': ['map'],
      // Note: you will need to get a mapsApiKey for your project.
      // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
      'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
    });
    google.charts.setOnLoadCallback(drawMapAdress);
  

    //Handles adding and searching for points
    document.addEventListener("DOMContentLoaded",function(event){
      document.getElementById("execute").addEventListener("click",function(){
        console.log("Clicked");
        var address = document.getElementById('query').value;
        drawSearchMap(address);
      });
    });


    var request = require('superagent');
   
    // calls up a search based around a specific address or palce
     function drawSearchMap(addrs){
      
      
       var map = new google.visualization.Map(document.getElementById('map_div'));
       //Get lat long of address
       request.get('https://maps.googleapis.com/maps/api/geocode/json?address='+addrs+'&key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY')
              .set('Accept','application/json')
              .end((err,res)=>{
                if(res){
                  var results =JSON.parse(res.text)
                  console.log(results.results[0].geometry);
                  var lat =results.results[0].geometry.location.lat;
                  var long = results.results[0].geometry.location.lng;
                  var data = google.visualization.arrayToDataTable([
                    ['Lat','Long','Name'],
                    [lat,long,"Search Point"]
                  ]);
                  request.get('/addSearch?lat='+lat+'&long='+long)
              .set('Accept','application/json')
              .end((err,res)=>{
                if(res){
                  console.log(res)
                  for(i =0;i<res.body.length;i++){
                    var x = res.body[i];
                    console.log("hi");
                data.addRows([[x.lat,x.long,x.shape]]);
                }
                map.draw(data, {
                    showTooltip: true,
                    showInfoWindow: true
                  });
                }
                
                console.log(data);
                
                map.draw(data, {
                    showTooltip: true,
                    showInfoWindow: true
                  });
                });
                };
              })

     }
     function drawMapAdress(){
        var data = google.visualization.arrayToDataTable([
            ['Lat', 'Long', 'Name'],
            [37.4232, -122.0853, 'Work']])
        var map = new google.visualization.Map(document.getElementById('map_div'));
      request.get('/testSearch')
              .set('Accept','application/json')
              .end((err,res)=>{
                if(res){
                  console.log(res)
                  for(i =0;i<res.body.length;i++){
                    var x = res.body[i];
                    console.log("gi");
                data.addRows([[x.lat,x.long,x.shape]]);
                }
                map.draw(data, {
                    showTooltip: true,
                    showInfoWindow: true
                  });
                }
                
               // var map = new google.visualization.Map(document.getElementById('map_div'));
                console.log(data);
                
                map.draw(data, {
                    showTooltip: true,
                    showInfoWindow: true
                  });
                });

    }
    function drawMap () {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Address');
      data.addColumn('string', 'Location');
      data.addColumn('string', 'Marker')

      data.addRows([
        ['gisborne (new zealand)', 'Home, bnefore I fucked everything up',   'blue' ],
        ['holmes/pawling',      'FUCk',   'green'],
        ['Washington DC, United States',    'Washington', 'pink' ],
        ['Philadelphia PA, United States',  'Philly',     'green'],
        ['Pittsburgh PA, United States',    'Pittsburgh', 'green'],
        ['Buffalo NY, United States',       'Buffalo',    'blue' ],
        ['Baltimore MD, United States',     'Baltimore',  'pink' ],
        ['Albany NY, United States',        'No FUn',     'blue' ],
        ['Allentown PA, United States',     'Allentown',  'green']
      ]);
      var url = 'https://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/';

      var options = {
        zoomLevel: 6,
        showTooltip: true,
        showInfoWindow: true,
        useMapTypeControl: true,
        icons: {
          blue: {
            normal:   url + 'Map-Marker-Ball-Azure-icon.png',
            selected: url + 'Map-Marker-Ball-Right-Azure-icon.png'
          },
          green: {
            normal:   url + 'Map-Marker-Push-Pin-1-Chartreuse-icon.png',
            selected: url + 'Map-Marker-Push-Pin-1-Right-Chartreuse-icon.png'
          },
          pink: {
            normal:   url + 'Map-Marker-Ball-Pink-icon.png',
            selected: url + 'Map-Marker-Ball-Right-Pink-icon.png'
          }
        }
      };
      var map = new google.visualization.Map(document.getElementById('map_div'));

      map.draw(data, options);
    }