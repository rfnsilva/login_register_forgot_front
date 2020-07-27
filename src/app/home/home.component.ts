import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  readonly apiURL : string;
  public rota: Router;
  public id_user: string;
  public home_resumo: any;

  @Input()
  public session: any;

  constructor(private route: ActivatedRoute, private http : HttpClient, private r: Router){
    this.apiURL = 'https://api-login-recuperacao.herokuapp.com';
    this.rota = r;
  }

  ngOnInit(): void {
    this.session = JSON.parse(window.localStorage.getItem('currentUser'));
    
    const headers= new HttpHeaders()
     .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${this.session.token}`);
    

    this.http.get(`${this.apiURL}/home/${this.session.id}`, { 'headers': headers })
    .subscribe(result => {
      this.home_resumo = result;
    });
  }

}