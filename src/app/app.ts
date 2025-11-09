import { Component, signal } from '@angular/core';

import { HlmButtonImports } from '../../libs/ui/ui-button-helm/src/index';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [HlmButtonImports, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('front-end');
}
