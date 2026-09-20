import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  number = 6;

  constructor(private router: Router) {}
  onStart() {
    this.router.navigate(['/guess']);
  }
}
