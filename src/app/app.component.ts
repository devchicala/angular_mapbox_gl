import { environment } from './../environments/environment';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import * as Mapboxgl from 'mapbox-gl';

declare var H: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'here-project';

  private platform: any;

  /*@ViewChild("map")
  public mapElement: ElementRef;*/

  public constructor() {
    /*this.platform = new H.service.Platform({
      "app_id": ' E2cspvltE5eVNc36QuNB ',
      "app_code": 'bkbcli-KKey1TitgwfotWgm2TiWPZULubIpoXwteWOo'
    });*/
  }

  mapa: Mapboxgl.Map
  public ngOnInit() {


    let currentPositionLatitude: number
    let currentPositionLongitude: number

    navigator.geolocation.getCurrentPosition( position => {
      currentPositionLatitude= position.coords.latitude
      currentPositionLongitude = position.coords.longitude,

      (Mapboxgl as any).accessToken = environment.mapboxKey;

      this.mapa = new Mapboxgl.Map({
      container: 'mapa-mapbox', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      //center: [13.2229532, -8.8321807], // starting position
      center: [currentPositionLongitude, currentPositionLatitude],
      zoom: 13 // starting zoom
      });
      this.createMarker(currentPositionLongitude, currentPositionLatitude)

    })

   }

   createMarker( lg: number, lt: number,) {
    const marker = new Mapboxgl.Marker({
      draggable: true
      })
      .setLngLat([lg, lt])
      .addTo(this.mapa);
      /*marker.on('dragend', () => {
        console.log(marker.getLngLat())
      });*/
  }


}
