import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';



@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormField,
    MatButtonModule,
    MatLabel,
    MatSelect,
    MatOption,
    MatFormFieldModule,
    FormsModule,
    RouterLink, 
    MatButtonToggleModule
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {

  users: User[] = [];
  pageSize = 5;
  pageIndex: number = 0; 
  filteredUsers: User[] = [];
  paginatedUsers:  User[] = [];
  hasSearched!: boolean;
  searchTerm: any;
  newUser:  User = { id: 0, name: '', email: '', gender: '', status: false };
  selectedUser: any;


  constructor(
    private userService: UserService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.filteredUsers = this.users;
      this.paginatedUsers = this.users; // Update filteredUsers
      this.updatePaginatedUsers(); // Update paginatedUsers

    });
  }

filterUsers(): void {
  console.log('filterUsers: Filtering users...');
  this.hasSearched = true;
  this.filteredUsers = this.users.filter(user =>
    user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
  console.log('filterUsers: this.filteredUsers =', this.filteredUsers);
}

updatePaginatedUsers() {
  const startIndex = this.pageIndex * this.pageSize;

  this.paginatedUsers = this.filteredUsers.slice(startIndex, startIndex + this.pageSize);
}  


onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedUsers();
}



addUser (): void {
  if (this.newUser .name && this.newUser .email) {
    const maxId = this.users.length > 0 ? Math.max(...this.users.map(user => user.id)) : 0;
    this.newUser .id = maxId + 1;
    console.log('Adding new user:', this.newUser ); // Debug log
    this.users.push({ ...this.newUser  });
    this.filteredUsers = this.users;
    this.updatePaginatedUsers();
    this.newUser  = { id: 0, name: '', email: '', gender: '', status: false };
  }
}
  // Method to remove a user by ID
  removeUser (userId: number) {
    this.users = this.users.filter(user => user.id !== userId); // Filter out the user
    this.filteredUsers = this.users; // Update filtered users
    this.updatePaginatedUsers();   
  }

  showUserDetails(user: User){
      this.router.navigate(['/details', user.id]);
  }

  logout(){
    this.router.navigate(['/login']);
  }

  closeBtn(){
    this.hasSearched = false;
    this.selectedUser  = null
  }

}
