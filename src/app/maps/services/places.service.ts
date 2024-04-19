import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [ number, number ];

  constructor() {
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
}
