import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3001/article/';


  create(article: any){
    return this.http.post(this.url + 'ajout', article);
  }

  getAll(){
    return this.http.get(this.url + 'all');
  }

  getArticleByIdAuthor(id: any){
    return this.http.get(this.url + 'getbyidauthor/' + id);
  }

  getArticleById(id: any){
    return this.http.get(this.url + 'getbyid/' + id);
  }
}
