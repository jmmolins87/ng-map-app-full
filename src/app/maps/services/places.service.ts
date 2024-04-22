import { Injectable } from '@angular/core';

import { Feature, PlacesResponse } from '../interfaces/places.interface';
import { PlacesApiClient } from '../api/placesApiClient';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [ number, number ];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  constructor( private _placesApi: PlacesApiClient) {
    this.getUserLocation();
  }

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  public async getUserLocation(): Promise<[ number, number ]> {

    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [ coords.longitude, coords.latitude ];
          resolve( this.userLocation );
        },
        ( err ) => {
          alert('No se puede obtener la geolocalización');
          console.log( err );
          reject();
        }
      );
    });
  }

  getPlacesByQuery( query: string = '' ) {

    if( query.length === 0 ) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    };

    if( !this.userLocation ) throw Error('User location not found');

    this.isLoadingPlaces = true;

    this._placesApi.get<PlacesResponse>(`/${ query }.json`, {
      params: {
        proximity: this.userLocation.join(',')
      }
    })
      .subscribe( resp => {

        this.isLoadingPlaces = false;
        this.places = resp.features;
      })
  }
}