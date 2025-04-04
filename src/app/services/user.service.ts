import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,  throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Posts } from '../models/post.model';
import { Comments } from '../models/comments.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersAPI = `https://gorest.co.in/public/v2/users`;
  postsAPI = `https://gorest.co.in/public/v2/posts`;
  exampleCommentsAPI = 'https://gorest.co.in/public/v2/posts/201110/comments'
  exampleUsersPostsAPI = 'https://gorest.co.in/public/v2/users/7374872/posts'
  private users: User[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.usersAPI)
      .pipe(
        tap(response => console.log('Risposta API:', response)),
        catchError(error => {
          console.error('Errore API:', error);
          return throwError(error);
        })
      );
  }

  getUserById(userId: any): Observable<User> {
    return this.http.get<User>(`${this.usersAPI}/${userId}`);
  }

  getAllPosts(){
    return this.http.get<Posts[]>(`${this.postsAPI}`);
  }

  getCommentsByPostId(postId: any): Observable<Comments[]> {
    return this.http.get<Comments[]>(`${this.postsAPI}/${postId}/comments`);
  }

  getPostsByUserId(userId: any): Observable<Posts[]> {
    return this.http.get<Posts[]>(`${this.usersAPI}/${userId}/posts`);
  }


}
