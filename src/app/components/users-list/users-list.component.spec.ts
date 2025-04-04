import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersListComponent } from './users-list.component';
import { UserService } from '../../services/user.service';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';


class MockUserService {
  getUsers() {
    return of([
      { id: 1, name: 'John Doe', email: 'john@example.com', gender: 'male', status: true },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com', gender: 'female', status: false },
    ]);
  }
}

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UsersListComponent,
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        MatPaginatorModule // Importa il modulo del paginator se necessario
      ],
      providers: [
        { provide: UserService, useClass: MockUserService }, // Usa il mock per UserService
        provideHttpClient(), 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch users on init', () => {
    component.ngOnInit();
    expect(component.users.length).toBe(2);
    expect(component.filteredUsers.length).toBe(2);
    expect(component.paginatedUsers.length).toBe(2);
  });

  it('should filter users based on search term', () => {
    component.ngOnInit();
    component.searchTerm = 'Jane';
    component.filterUsers();
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].name).toBe('Jane Doe');
  });

  it('should paginate users correctly', () => {
    component.ngOnInit();
    component.pageIndex = 0;
    component.pageSize = 1;
    component.updatePaginatedUsers();
    expect(component.paginatedUsers.length).toBe(1);
    expect(component.paginatedUsers[0].name).toBe('John Doe');
  });

  it('should add a new user', () => {
    component.newUser  = { id: 0, name: 'New User', email: 'newuser@example.com', gender: 'male', status: true };
    component.addUser ();
    expect(component.users.length).toBe(3);
    expect(component.users[2].name).toBe('New User');
  });

  it('should remove a user by ID', () => {
    component.ngOnInit(); // Assicurati che gli utenti siano caricati
    component.removeUser (1);
    expect(component.users.length).toBe(1);
    expect(component.users[0].name).toBe('Jane Doe');
  });



  it('should close the user details', () => {
    component.closeBtn();
    expect(component.hasSearched).toBeFalse();
    expect(component.selectedUser ).toBeNull();
  });
});