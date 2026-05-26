import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // <-- Make sure RouterOutlet is here!
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'frontend';
}