import { Component, Input, OnInit } from '@angular/core';
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

  @Input()
  public reset: any;
  public reset_aux: boolean = false;

  constructor(private http : HttpClient, private r: Router){
    this.apiURL = 'https://api-login-recuperacao.herokuapp.com';
    this.rota = r;
  }

  ngOnInit(): void {
  }

  login(user: User) {
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
    
    if(user.nome !== ""){
      this.http.post(`${this.apiURL}/saveUser`, user, { 'headers': headers })
        .subscribe(result => {
        window.localStorage.setItem('currentUser', JSON.stringify(result));
        this.r.navigate(['/home']);
      });
    } else {
      if(user.senha !== ""){
        this.http.post(`${this.apiURL}/session`, user, { 'headers': headers })
        .subscribe(result => {
          window.localStorage.setItem('currentUser', JSON.stringify(result));
          this.r.navigate(['/home']);
        });
      } else {
        this.http.post(`${this.apiURL}/forgot`, user, { 'headers': headers })
         .subscribe(result => {
           console.log(result);
         });
      }
    }
  }
  
  onSubmit() {
    this.login(this.profileForm.value);
  }
}
