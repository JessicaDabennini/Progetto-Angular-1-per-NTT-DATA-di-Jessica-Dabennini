import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = `https://gorest.co.in/public/v2`;


  constructor(
    private http: HttpClient
  ) { }

  loginUser(token: string): Observable<Auth> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<Auth>(`${this.url}/users`, { headers });
  }

}
