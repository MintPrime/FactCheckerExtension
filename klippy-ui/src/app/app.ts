import { Component } from '@angular/core';
import { Klippy } from './klippy/klippy';

@Component({
  selector: 'app-root',
  imports: [Klippy],
  template: '<app-klippy />',
})
export class App {}