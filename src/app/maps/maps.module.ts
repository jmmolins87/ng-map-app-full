import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// * My Components
import { MapScreenComponent } from './screens/map-screen/map-screen.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { LoadingComponent } from './components/loading/loading.component';
import { AngularLogoComponent } from './components/angular-logo/angular-logo.component';
import { BtnMyLocationComponent } from './components/btn-my-location/btn-my-location.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';


@NgModule({
  declarations: [
    MapScreenComponent,
    MapViewComponent,
    LoadingComponent,
    AngularLogoComponent,
    BtnMyLocationComponent,
    SearchResultsComponent,
    SearchBarComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MapScreenComponent
  ]
})
export class MapsModule { }
