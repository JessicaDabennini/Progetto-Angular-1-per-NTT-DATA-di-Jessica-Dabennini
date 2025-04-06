import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormControl, FormGroup, FormsModule, Validators,ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../models/auth.model';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule for input fields
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule for buttons
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginFormControl: FormGroup;

constructor(
  private fb: FormBuilder,
  private authService: AuthService,
  private router: Router
) {
  this.loginFormControl = this.fb.group({
    tokenControl: ['', Validators.required]
  });
}

ngOnInit(): void {
      this.loginFormControl = new FormGroup({
      tokenControl: new FormControl(null, Validators.required),
    });
}

onLogin() {
  if (this.loginFormControl.valid) {
    let userData: Auth = {
      dateMill: new Date().getTime() + 60 * 60 * 1000,
      token: this.loginFormControl.get('tokenControl')?.value,
    };

    localStorage.setItem('userData', JSON.stringify(userData));

    this.router.navigate(['/home']);
  }
}

}
