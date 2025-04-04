import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsComponent } from './posts.component';
import { UserService } from '../../services/user.service';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of } from 'rxjs';

class MockUserService {
  getAllPosts() {
    return of([
      { id: 1, user_id: 1, title: 'Post 1', body: 'Body of post 1' },
      { id: 2, user_id: 1, title: 'Post 2', body: 'Body of post 2' },
    ]);
  }

  getCommentsByPostId(postId: number) {
    return of([
      { id: 1, postId: postId, body: 'Comment 1' },
      { id: 2, postId: postId, body: 'Comment 2' },
    ]);
  }
}

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PostsComponent,
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: UserService, useClass: MockUserService }, // Usa il mock per UserService
        provideHttpClient(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch posts on init', () => {
    component.ngOnInit();
    expect(component.posts.length).toBe(2);
  });

  it('should load comments count for each post', () => {
    component.ngOnInit();
    expect(component.commentsCount[1]).toBe(2); // Post 1 has 2 comments
    expect(component.commentsCount[2]).toBe(2); // Post 2 has 2 comments
  });

  it('should filter posts based on search term', () => {
    component.ngOnInit();
    component.searchTerm = 'Post 1';
    component.filterPosts();
    expect(component.filteredPosts.length).toBe(1);
    expect(component.filteredPosts[0].title).toBe('Post 1');
  });

  it('should add a new post', () => {
    component.newPost = { id: 0, user_id: 1, title: 'New Post', body: 'Body of new post' };
    component.addPost();
    expect(component.posts.length).toBe(3);
    expect(component.posts[2].title).toBe('New Post');
  });

  it('should show comments for a post', () => {
    component.showComments(1);
    expect(component.comments[1]).toBeDefined();
    expect(component.comments[1].length).toBe(2); // Post 1 has 2 comments
  });

  it('should close the search results', () => {
    component.hasSearched = true;
    component.closeBtn();
    expect(component.hasSearched).toBeFalse();
  });

  it('should navigate to login on logout', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate'); // Spy sulla funzione navigate
    component.logout();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});