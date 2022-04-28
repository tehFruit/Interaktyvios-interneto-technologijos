import { UserDetails } from './../models/userDetails.model';
import { LoginUser } from './../models/loginUser.model';
import { RegisterUser } from './../models/registerUser.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = 'https://localhost:7289/api/AppUser';
  private authenticatedUrl ='https://localhost:7289/api/AppUserAuth';
  private loggedInSource = new BehaviorSubject<boolean>(localStorage.getItem('token') === null ? false : true);
  loggedInCurrent = this.loggedInSource.asObservable();

  constructor(private http : HttpClient) { 
    
  }

  registerUser(newUser: RegisterUser) : Observable<RegisterUser> {
    return this.http.post<RegisterUser>(this.baseUrl + '/Register', newUser);
  }

  //Returns error or JWT token
  login(user: LoginUser) : Observable<any>{
    return this.http.post<LoginUser>(this.baseUrl + '/Login', user);
  }

  setLogin(){
    this.loggedInSource.next(true);
  }

  setLogout(){
    this.loggedInSource.next(false);
  }

  getUserProfile() : Observable<UserDetails> {
    //The space after the word Bearer IS A MUST
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')});
    return this.http.get<UserDetails>(this.authenticatedUrl, {headers : tokenHeader});
  }
}
