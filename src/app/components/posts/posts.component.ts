import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Posts } from '../../models/post.model';
import { Comments } from '../../models/comments.model';
import { User } from '../../models/user.model';
import { RouterLink } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';



@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatDividerModule,
        MatInputModule,
        MatFormField,
        MatButtonModule,
        MatLabel,
        MatFormFieldModule,
        FormsModule,
        RouterLink,
        MatButtonToggleModule
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {

    posts: Posts[] = [];
    post: Posts | null = null;

    user: User[] | null = null;
    users: { [key: number]: User } = {}; 

    comment: Comments | null = null;
    comments: { [key: number]: Comments[] } = {}; // Mappa per memorizzare i commenti per post
    commentsCount: { [key: number]: number } = {};

    filteredPosts: Posts[] = [];
    hasSearched!: boolean;
    searchTerm: any;
    newPost:  Posts = { id: 0, user_id: 0, title: '', body: '' };
    selectedPost: any;
  
  

  constructor(
    private userService: UserService,
    private router: Router,
    
  ){}

  ngOnInit(){
    this.userService. getAllPosts().subscribe(post => {
      this.posts = post; 
      this.posts.forEach(post => {
        this.loadCommentsCount(post.id);
       });
    });
    
  }

  loadCommentsCount(postId: number) {
    this.userService.getCommentsByPostId(postId).subscribe(comments => {
      this.commentsCount[postId] = comments.length; // Salva il numero di commenti per il post specifico
    }, () => {
      this.commentsCount[postId] = 0; // Imposta a 0 in caso di errore
    });
  }


  showComments(postId: number) {
    // Controlla se i commenti per questo post sono già stati caricati
    if (!this.comments[postId]) {
      this.userService.getCommentsByPostId(postId).subscribe(comment => {
        this.comments[postId] = comment; // Salva i commenti per il post specifico
      });
    }
  }

  filterPosts() {
    if (this.searchTerm.trim() === '') {
      this.hasSearched = false; // Close the search results if the search term is empty
      this.filteredPosts = []; // Clear the filtered posts
      return;
    }

    // Your existing filtering logic here
    this.filteredPosts = this.posts.filter(post => 
      post.title.includes(this.searchTerm) || post.body.includes(this.searchTerm)
    );

    this.hasSearched = true; // Set to true if there are results
  }

  addPost (): void {
    if (this.newPost.title && this.newPost.body) {
      const maxId = this.posts.length > 0 ? Math.max(...this.posts.map(post => post.id)) : 0;
      this.newPost.id = maxId + 1;
      console.log('Adding new user:', this.newPost ); // Debug log
      this.posts.push({ ...this.newPost  });
      this.filteredPosts = this.posts;
      this.newPost  = { id: 0, user_id: 0, title: '', body: '' };
    }
  }


    showPostDetails(post: any) {
      this.selectedPost = post;
      this.hasSearched = true; // Assuming you want to show the results after selecting a post
    }

  closeBtn(){
    this.hasSearched = false;
  }

  logout(){
    this.router.navigate(['/login']);
  }

}
