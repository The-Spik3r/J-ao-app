import { Component, inject, OnInit } from '@angular/core';
import { LucideAngularModule, MapPin,BellDot   } from 'lucide-angular';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-nav',
  imports: [LucideAngularModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {
  readonly MapPin = MapPin;
  readonly BellDot = BellDot;
  authService = inject(Auth);

  ngOnInit() {
    this.authService.me();
  }
}
