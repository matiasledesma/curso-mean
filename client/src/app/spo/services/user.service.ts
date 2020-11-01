import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public identity;
  public token;
  constructor(private _http: HttpClient) {
   }

   signup(user_to_login, gethash = null): Observable<any>{
     if(gethash !=null){
       user_to_login.gethash = gethash;
     }
    let json = JSON.stringify(user_to_login);
    let params = json;

    let headers = new HttpHeaders({'Content-Type':'application/json'})

    return this._http.post('/api/login', params, {headers: headers}).pipe(map(res => res));
  }

  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));

    if(identity != undefined){
      this.identity = identity
    }else{
      this.identity = null;
    }
    return this.identity
  }

  getToken(){
    let token = localStorage.getItem('token');

    if(token != undefined){
      this.token = token
    }else{
      this.token = null;
    }
    
    return this.token
  }

  register(user_to_register): Observable<any>{
    let params = JSON.stringify(user_to_register);

    let headers = new HttpHeaders({'Content-Type':'application/json'})

    return this._http.post('/api/register', params, {headers: headers}).pipe(map(res => res));
  }

  update_user(user_to_update): Observable<any>{
    let params = JSON.stringify(user_to_update);

    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': this.getToken()
    })

    return this._http.put('/api/userupdate/'+user_to_update._id, params, {headers: headers}).pipe(map(res => res));
  }
}
