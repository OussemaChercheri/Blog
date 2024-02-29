import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-createarticle',
  templateUrl: './createarticle.component.html',
  styleUrls: ['./createarticle.component.css']
})
export class CreatearticleComponent implements OnInit {

  article: any ={

    title: '',
    content: '',
    tags: [],
    description: ''
  }

  tag: any = '';

  image: any;

  select(e:any){
    this.image = e.target.files[0];
  }
  constructor(private _auth: AuthService, private _data: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  create(){
    let fd = new FormData();
    fd.append('title', this.article.title);
    fd.append('content', this.article.content);
    fd.append('tags', (this.article.tags.toString()));
    fd.append('description', this.article.description);
    fd.append('image', this.image);
    fd.append('idAuthor', this._auth.getAuthorDataFormRoken()._id);

    this._data.create(fd)
      .subscribe(
        res => {
          this.router.navigate(['/home']);
        },
        err =>{
          console.log(err);
        }
      );
  }

}
