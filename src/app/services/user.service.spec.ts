import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    const mockActivatedRoute = {
      params: of({ id: '123' }), // Mocking route parameters
      snapshot: {
        params: { id: '123' } // Mocking snapshot parameters
      }
    };
    const userServiceStub = {
      getUserById: jasmine.createSpy('getUserById').and.returnValue(of({})),
      getPostsByUserId: jasmine.createSpy('getPostsByUserId').and.returnValue(of([])),
      getCommentsByPostId: jasmine.createSpy('getCommentsByPostId').and.returnValue(of([])),
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: UserService, useValue: userServiceStub },
        provideHttpClient(),
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
