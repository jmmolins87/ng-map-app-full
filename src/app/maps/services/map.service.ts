import { Injectable } from '@angular/core';

import { 
  LngLatLike, 
  Map, 
  Marker 
} from 'mapbox-gl';

import { Feature } from '../interfaces/places.interface';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map: Map | undefined;
  private markers: Marker[] = [];

  constructor() { }

  get isMapReady() {
    return !!this.map;
  }

  setMap( map: Map ) {
    this.map = map;
  }

  flyTo( coords: LngLatLike ) {

    if ( !this.isMapReady ) throw Error('El mapa no está listo')
    this.map?.flyTo({
      zoom: 14,
      center: coords 
    })
  }

  createMarkersFromPlaces( places: Feature[] ) {

    if( !this.map ) throw Error('Mapa no inicializado');
  }
}
