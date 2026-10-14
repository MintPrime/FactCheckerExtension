import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-klippy',
  templateUrl: './klippy.html',
  styleUrl: './klippy.css',
})
export class Klippy {
  private readonly lines = [
    'yo',
    'have you donated to the Wikimedia Foundation yet?',
    'need something?',
    'beware of the fickle djinn and his wicked numbers game... legend says he turns those who lose into a wheel of cheese.',
  ];

  private readonly index = signal(-1);                                  // -1 = bubble hidden
  protected readonly line = computed(() => (this.index() >= 0 ? this.lines[this.index()] : null));

  protected next(): void {
    this.index.update((i) => (i + 1 >= this.lines.length ? -1 : i + 1));  // after the last line, hide the bubble
  }
}