import { Injectable } from '@angular/core';

import { 
  AnySourceData,
  LngLatBounds,
  LngLatLike, 
  Map, 
  Marker, 
  Popup
} from 'mapbox-gl';

import { Feature } from '../interfaces/places.interface';
import { DirectionsApiClient } from '../api';
import { DirectionsResponse, Route } from '../interfaces/directions.interface';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map: Map | undefined;
  private markers: Marker[] = [];

  constructor( private _directionsApi: DirectionsApiClient ) { }

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

  createMarkersFromPlaces( places: Feature[], userLocation: [ number, number ] ) {

    if( !this.map ) throw Error('Mapa no inicializado');

    this.markers.forEach( marker => marker.remove());

    const newMarkers = [];
    for( const place of places ) {

      const[ lng, lat ] = place.center;
      const popup = new Popup()
        .setHTML(`
          <h6>${ place.text }</h6>
          <span>${ place.place_name }</span>
        `);
      const newMarker = new Marker()
        .setLngLat([ lng, lat ])
        .setPopup( popup )
        .addTo( this.map );

      newMarkers.push( newMarker );
    }

    this.markers = newMarkers;
    if( places.length === 0 ) return;

    // Limites del mapa
    const bounds = new LngLatBounds();
    newMarkers.forEach( marker => bounds.extend( marker.getLngLat()));
    bounds.extend( userLocation );

    this.map.fitBounds( bounds, {
      padding: 200
    })
  }

  getRouteBetweenTwoPoints( start: [ number, number ], end: [ number, number ] ) {

    this._directionsApi.get<DirectionsResponse>(`/${ start.join(',')};${ end.join(',')}`, {})
      .subscribe( response => this.drawPolyline( response.routes[0]))
  }

  private drawPolyline( route: Route ) {

    console.log({ distance: route.distance / 1000, duration: route.duration / 60 });

    if( !this.map ) throw Error('Mapa no inicializado');
    const coords = route.geometry.coordinates;
    const bounds = new LngLatBounds();
    coords.forEach(([ lng, lat ]) => {
      bounds.extend([ lng, lat ]);
    });

    this.map?.fitBounds( bounds, {
      padding: 200
    })

    // Polyline
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    }

    // TODO: Implementar método para limpiar la ruta
    
    if( this.map.getLayer('route')) {
      this.map.removeLayer('route');
      this.map.removeSource('route');
    };

    this.map.addSource('route', sourceData);
    this.map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': '#3887be',
        'line-width': 3,
        'line-opacity': 0.75
      }
    });
  }
  
}
