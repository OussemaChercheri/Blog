import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient) { }

  private url = 'http://localhost:3001/author';

  register(author: any){
    return this.http.post(this.url + '/register', author);
  }

  login(author: any){
    return this.http.post(this.url + '/login', author);
  }
}

