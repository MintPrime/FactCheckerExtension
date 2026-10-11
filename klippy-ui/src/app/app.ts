import { Component } from '@angular/core';
import { Klippy } from './klippy/klippy';

@Component({
  selector: 'app-root',
  imports: [Klippy],
  templateUrl: './app.html',
})
export class App {}