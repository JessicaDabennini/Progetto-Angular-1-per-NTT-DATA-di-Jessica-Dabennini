import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('AppComponent', () => {
  const mockActivatedRoute = {
      params: of({ id: '123' }), // Mocking route parameters
      snapshot: {
        params: { id: '123' } // Mocking snapshot parameters
      }
    };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, CommonModule],
      providers: [UserService, provideHttpClient(), AuthService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },

      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the '1ProgettoAngular_JessicaDabennini' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('1ProgettoAngular_JessicaDabennini');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('1ProgettoAngular_JessicaDabennini');
  });
});
