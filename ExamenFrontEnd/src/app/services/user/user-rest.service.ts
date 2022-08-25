import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {

  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  getIdentity(){
    let globalIdentity = localStorage.getItem('identity');
    let identity;
    if(globalIdentity != undefined){
      identity = JSON.parse(globalIdentity);
    }else{
      identity = ''
    }
    return identity
  }

  getToken(){
    let globalToken = localStorage.getItem('token');
    let token;
    if(globalToken != undefined){
      token = globalToken;
    }else{
      token = ''
    }
    return token;
  }

  login(params:{}){
    return this.http.post(environment.baseUri + 'user/login', params, {headers: this.httpOptions});
  }

  register(params:{}){
    return this.http.post(environment.baseUri + 'user/register', params, {headers: this.httpOptions});
  }
}
