import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
declare var google;
/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
   Destination = 'GraceVille Christian Center';
    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('directionsPanel') directionsPanel: ElementRef;
    map: any;
    here: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation) {
  }

  calculateAndDisplayRoute() {

    this.geolocation.getCurrentPosition().then((position) => {
    this.here = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: this.here
    });
    
    directionsDisplay.setMap(map);
    console.log(this.here);
    directionsService.route({
      origin: this.here,
      destination: this.Destination,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);        
      } else {
        window.alert('Google Maps failed to respond. Check your internet / location settings ' + status);
      }
    });
  }, (err)=>{
    window.alert('Directions request failed due to ' + status);
    console.log(err);
  });
}

  ionViewDidLoad() {
    /* this.loadMap();
    this.startNavigating(); */
    this.calculateAndDisplayRoute();
    console.log('ionViewDidLoad MapPage');
    
  }

  /* loadMap(){
    
           //let latLng = new google.maps.LatLng(9.040440, 7.467844);
    
           this.geolocation.getCurrentPosition().then((position) => {
           this.here = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
           let mapOptions = {
             center: this.here,
             zoom: 15,
             mapTypeId: google.maps.MapTypeId.ROADMAP
           }
    
           this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    
       },(err)=>{
         console.log(err);
       })
      }
    
       startNavigating(){
    
           let directionsService = new google.maps.DirectionsService;
           let directionsDisplay = new google.maps.DirectionsRenderer;
    
           directionsDisplay.setMap(this.map);
           directionsDisplay.setPanel(this.directionsPanel.nativeElement);
    
           directionsService.route({
               origin: 'Maitama',
               destination: 'GraceVille Christian Center',
               travelMode: google.maps.TravelMode['DRIVING']
           }, (res, status) => {
    
               if(status == google.maps.DirectionsStatus.OK){
                   directionsDisplay.setDirections(res);
               } else {
                   console.warn(status);
               }
    
           });
    
       }
 */
}
