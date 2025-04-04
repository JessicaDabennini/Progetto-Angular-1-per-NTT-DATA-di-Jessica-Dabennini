import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailsComponent } from './user-details.component';
import { UserService } from '../../services/user.service';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MockUserService {
  getUserById(userId: string | null) {
    return of({ id: 1, name: 'John Doe', email: 'john@example.com' }); // Mock user data
  }

  getPostsByUserId(userId: string | null) {
    return of([
      { id: 1, user_id: 1, title: 'Post 1', body: 'Body of post 1' },
      { id: 2, user_id: 1, title: 'Post 2', body: 'Body of post 2' },
    ]); // Mock posts data
  }

  getCommentsByPostId(postId: number) {
    return of([
      { id: 1, postId: postId, body: 'Comment 1' },
      { id: 2, postId: postId, body: 'Comment 2' },
    ]); // Mock comments data
  }
}

describe('User DetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailsComponent, BrowserAnimationsModule, RouterModule.forRoot([])],
      providers: [
        { provide: UserService, useClass: MockUserService }, // Usa il mock per UserService
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1', // Mock user ID
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user details on init', () => {
    component.ngOnInit();
    expect(component.user).toBeDefined();
    expect(component.user?.name).toBe('John Doe');
  });

  it('should fetch posts for the user on init', () => {
    component.ngOnInit();
    expect(component.posts.length).toBe(2);
    expect(component.posts[0].title).toBe('Post 1');
  });

  it('should load comments count for each post', () => {
    component.ngOnInit();
    expect(component.commentsCount[1]).toBe(2); // Post 1 has 2 comments
    expect(component.commentsCount[2]).toBe(2); // Post 2 has 2 comments
  });

  it('should show comments for a post', () => {
    component.showComments(1);
    expect(component.comments[1]).toBeDefined();
    expect(component.comments[1].length).toBe(2); // Post 1 has 2 comments
  });
});