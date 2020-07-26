import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'login';
  profileForm = new FormGroup({
    nome: new FormControl(''),
    email: new FormControl(''),
    senha: new FormControl(''),
    senha_confirmacao: new FormControl('')
  });	
  readonly apiURL : string;
  public rota: Router;

  constructor(private http : HttpClient, private r: Router){
    this.apiURL = 'http://localhost:3333';
    this.rota = r;
  }

  ngOnInit(): void {
  }

  login(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'origin': 'https://infallible-wright-a8d49d.netlify.app/login',
        'Content-Type':  'application/json'
      })
    };
    
    if(user.nome !== ""){
      this.http.post(`${this.apiURL}/saveUser`, user, httpOptions)
      .subscribe(result => {
        window.localStorage.setItem('currentUser', JSON.stringify(result));
        this.r.navigate(['/home']);
      });
    } else {
      if(user.senha !== ""){
        this.http.post(`${this.apiURL}/session`, user, httpOptions)
        .subscribe(result => {
          window.localStorage.setItem('currentUser', JSON.stringify(result));
          this.r.navigate(['/home']);
        });
      } else {
        this.http.post(`${this.apiURL}/forgot`, user, httpOptions)
        .subscribe(result => {
          window.localStorage.setItem('currentUser', JSON.stringify(result));
          this.r.navigate(['/home']);
        });
      }
    }
  }
  
  onSubmit() {
    this.login(this.profileForm.value);
  }
}
