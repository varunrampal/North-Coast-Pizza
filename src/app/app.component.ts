import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  @ViewChild('mapinfo', { static: false }) mapinfo: SafeHtml;
  infoContent: SafeHtml = '';
  map: google.maps.Map;
  lat = 52.397058;
  lng = -122.258059;

  constructor(private sanitizer: DomSanitizer) {}
// set markers containing weather data
  markers = [
    {
      position: new google.maps.LatLng(58.452295, -130.02505),
      map: this.map,
      text: 'Dease Lake',
      label: {
        color: 'white',
        text: 'Dease Lake',
      },
      options: {
        animation: google.maps.Animation.DROP,
      },
      title:
        '<iframe title="Environment Canada Weather" width="287px" height="191px"' +
        ' src="https://weather.gc.ca/wxlink/wxlink.html?cityCode=bc-14&amp;lang=e" allowtransparency="true" frameborder="0"></iframe>',
    },
    {
      position: new google.maps.LatLng(49.271747, -122.971378),
      map: this.map,
      text: 'Fort Nelson',
      label: {
        color: 'white',
        text: 'Fort Nelson',
      },
      options: {
        animation: google.maps.Animation.DROP,
      },

      title:
        '<iframe title="Environment Canada Weather" width="287px" height="191px"' +
        ' src="https://weather.gc.ca/wxlink/wxlink.html?cityCode=bc-83&amp;lang=e" allowtransparency="true" frameborder="0"></iframe>',
    },
    {
      position: new google.maps.LatLng(52.397058, -122.258059),
      map: this.map,
      text: 'Terrace',
      label: {
        color: 'white',
        text: 'Terrace',
      },
      options: {
        animation: google.maps.Animation.DROP,
      },
      title:
        '<iframe title="Environment Canada Weather" width="287px" height="191px"' +
        ' src="https://weather.gc.ca/wxlink/wxlink.html?cityCode=bc-80&amp;lang=e" allowtransparency="true" frameborder="0"></iframe>',
    },
    {
      position: new google.maps.LatLng(54.311455, -130.299278),
      map: this.map,
      text: 'Prince George',
      label: {
        color: 'white',
        text: 'Prince George',
      },
      options: {
        animation: google.maps.Animation.DROP,
      },
      title:
        '<iframe title="Environment Canada Weather" width="287px" height="191px"' +
        ' src="https://weather.gc.ca/wxlink/wxlink.html?cityCode=bc-79&amp;lang=e" allowtransparency="true" frameborder="0"></iframe>',
    },
    {
      position: new google.maps.LatLng(53.99744, -122.875493),
      map: this.map,
      text: 'Whistler',
      label: {
        color: 'white',
        text: 'Whistler',
      },
      options: {
        animation: google.maps.Animation.DROP,
      },
      title:
        '<iframe title="Environment Canada Weather" width="287px" height="191px"' +
        ' src="https://weather.gc.ca/wxlink/wxlink.html?cityCode=bc-86&amp;lang=e" allowtransparency="true" frameborder="0"></iframe>',
    },
    {
      position: new google.maps.LatLng(50.997047, -118.197822),
      map: this.map,
      text: 'Revelstoke',
      label: {
        color: 'white',
        text: 'Revelstoke',
      },
      options: {
        animation: google.maps.Animation.DROP,
      },
      title:
        '<iframe title="Environment Canada Weather" width="287px" height="191px"' +
        ' src="https://weather.gc.ca/wxlink/wxlink.html?cityCode=bc-65&amp;lang=e" allowtransparency="true" frameborder="0"></iframe>',
    },
    {
      position: new google.maps.LatLng(49.095543, -116.503134),
      map: this.map,
      text: 'Creston',
      label: {
        color: 'white',
        text: 'Creston',
      },
      options: {
        animation: google.maps.Animation.DROP,
      },
      title:
        '<iframe title="Environment Canada Weather" width="287px" height="191px"' +
        ' src="https://weather.gc.ca/wxlink/wxlink.html?cityCode=bc-26&amp;lang=e" allowtransparency="true" frameborder="0"></iframe>',
    }
  ];

  // Coordinates to set the center of the map
  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 6,
    mapTypeId: 'hybrid',
  };

  ngAfterViewInit(): void {
    // Initialize map
    this.mapInitializer();
  }

  // Map initializer function
  mapInitializer(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);

    // load all markers
    this.loadAllMarkers();
  }

  // Load markers function
  loadAllMarkers(): void {
    this.markers.forEach((markerInfo) => {
      // Creating a new marker object
      const marker = new google.maps.Marker({
        ...markerInfo,
      });

      // creating a new info window with markers info
      const infoWindow = new google.maps.InfoWindow({
        content: marker.getTitle(),
      });

      // Add click event to open info window on marker
      marker.addListener('click', () => {
        infoWindow.open(marker.getMap(), marker);
      });
      infoWindow.open(this.map, marker);

      // Adding marker to google map
      marker.setMap(this.map);
    });
  }

}
