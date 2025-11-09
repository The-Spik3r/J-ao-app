import { Component } from '@angular/core';
import { LucideAngularModule, MapPin,BellDot   } from 'lucide-angular';

@Component({
  selector: 'app-nav',
  imports: [LucideAngularModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  readonly MapPin = MapPin;
  readonly BellDot = BellDot;
}
