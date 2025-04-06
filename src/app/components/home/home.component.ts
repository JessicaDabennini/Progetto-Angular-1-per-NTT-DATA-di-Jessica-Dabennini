import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatButtonToggleModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css' 
})
export class HomeComponent {

  constructor(private router: Router){}

  logout(){
    this.router.navigate(['/login']);
  }


}
