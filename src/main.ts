import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import Mapboxgl from 'mapbox-gl';
Mapboxgl.accessToken = 'pk.eyJ1IjoianVhbm1hODciLCJhIjoiY2xzNGZxbDMyMTE2ejJsbWs1cmZ2dHdpMyJ9.iQdcY0G-6QMPQvtEej4pKQ'


if( !navigator.geolocation ) {
  alert('Geolocation not available');
  throw new Error('Geolocation not available');
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch( err => console.error( err ));
