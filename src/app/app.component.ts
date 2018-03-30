import { Component, OnInit } from '@angular/core';

import { Plugins } from '@capacitor/core';

import { Observable } from 'rxjs/Observable';
import { bindCallback } from 'rxjs/observable/bindCallback';
import { map } from 'rxjs/operators/map';

const { Geolocation, Modals } = Plugins;

// const Geolocation = Plugins.Geolocation;
// const Modals = Plugins.Modals;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  coords: Coordinates = null;

  ngOnInit() {
    this.watchPosition().subscribe( coords =>
      this.coords = coords
    );
  }

  watchPosition(): Observable<any> {
    const watch = bindCallback(Geolocation.watchPosition)({});

    return watch.pipe(map(pos => pos.coords));
  }

  showAlert() {
    const coords = this.coords || {} as any;
    const lat = coords.latitude;
    const lng = coords.longitude;
    Modals.alert({
      title: 'Your Position',
      message: `Lat: ${lat}, Lng: ${lng}`,
    });
  }



}
