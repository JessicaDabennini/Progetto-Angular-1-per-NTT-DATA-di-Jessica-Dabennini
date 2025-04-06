import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Posts } from '../../models/post.model';
import { RouterLink } from '@angular/router';
import { Comments } from '../../models/comments.model';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';




@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, RouterLink,
    MatButtonModule,
    MatButtonToggleModule
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent {
  users: User[] = [];
  user: User | null = null;

  posts: Posts[] = [];
  noPostsMessage: string = '';

  comment: Comments | null = null;
  comments: { [key: number]: Comments[] } = {}; 
  commentsCount: { [key: number]: number } = {};

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id'); 
    console.log('Fetching user with ID:', userId);
    this.userService.getUserById(userId).subscribe((user) => {
      console.log('User fetched:', user);
      this.user = user; // Fetch user details
    });

    this.userService.getPostsByUserId(userId).subscribe((posts) => {
      console.log('Posts fetched:', posts);
      this.posts = posts; 
      this.posts.forEach(post => {
        this.loadCommentsCount(post.id);
       });
      if (this.posts.length === 0) {
        this.noPostsMessage = 'This user has no posts.'; 
      }
    });
  }

  loadCommentsCount(postId: number) {
    this.userService.getCommentsByPostId(postId).subscribe(comments => {
      this.commentsCount[postId] = comments.length; 
    }, 
    () => {
      this.commentsCount[postId] = 0; 
    });
  }

  showComments(postId: number) {
    if (!this.comments[postId]) {
      this.userService.getCommentsByPostId(postId).subscribe((comment) => {
        this.comments[postId] = comment; 
      });
    }
  }

  logout(){
    this.router.navigate(['/login']);
  }
}
