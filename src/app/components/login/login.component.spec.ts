import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { provideHttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';

class MockAuthService {
  // Mock del metodo login
  login() {
    return of(true); // Simula un login riuscito
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        ReactiveFormsModule // Importa ReactiveFormsModule per i test del modulo
      ],
      providers: [
        UserService,
        provideHttpClient(),
        { provide: AuthService, useClass: MockAuthService }, // Usa il mock per AuthService
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'), // Mock della navigazione
          },
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with a tokenControl', () => {
    expect(component.loginFormControl.contains('tokenControl')).toBeTrue();
  });

  it('should make the tokenControl required', () => {
    let control = component.loginFormControl.get('tokenControl');
    control?.setValue('');
    expect(control?.valid).toBeFalse();
  });

  it('should navigate to /users on successful login', () => {
    component.loginFormControl.get('tokenControl')?.setValue('valid-token');
    component.onLogin();
    expect(router.navigate).toHaveBeenCalledWith(['/users']);
  });

  it('should not navigate if the form is invalid', () => {
    component.loginFormControl.get('tokenControl')?.setValue('');
    component.onLogin();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should store user data in localStorage on successful login', () => {
    const token = 'valid-token';
    component.loginFormControl.get('tokenControl')?.setValue(token);
    component.onLogin();
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    expect(userData.token).toBe(token);
  });
});