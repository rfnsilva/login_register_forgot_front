import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { User } from '../models/User';

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
    this.apiURL = 'http://localhost:3333';
    this.rota = r;
  }

  ngOnInit(): void {
    this.session = JSON.parse(window.localStorage.getItem('currentUser'));
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${this.session.token}`
      })
    };

    this.http.get(`${this.apiURL}/home/${this.session.id}`, httpOptions)
    .subscribe(result => {
      this.home_resumo = result;
    });
  }

}