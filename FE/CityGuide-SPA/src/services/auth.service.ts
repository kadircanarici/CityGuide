import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from 'src/app/models/loginUser';
// import { JwtHelper, tokenNotExpired } from "angular2-jwt";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { RegisterUser } from 'src/app/models/registerUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient
    , private router: Router
    , private alertifyService: AlertifyService) { }

  path = "http://localhost:5007/api/auth/";
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  TOKEN_KEY = "token";

  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json")
    this.httpClient.post(this.path + "login", loginUser, { headers: headers, responseType: 'text' })
      .subscribe(  data => {
        // console.log('Token:', data);
        this.saveToken(data);
        this.userToken = data;
        this.decodedToken = this.jwtHelper.decodeToken(data);
        this.alertifyService.success('Sisteme giriş yapıldı.');
        this.router.navigateByUrl('/city');
      },
      error=>{
        console.error('Error during login:', error);
      });
  }
  // login(loginUser: LoginUser) {
  //   let headers = new HttpHeaders();
  //   headers = headers.append("Content-Type", "application/json")
  //   this.httpClient.post(this.path + "login", loginUser, { headers: headers })
  //   .pipe(
  //     catchError(error => {
  //       console.error('Error during login:', error);
  //       // Handle the error here
  //       return throwError(error);
  //     })
  //   ).subscribe(data => {
  //       console.log("data",data);
  //       this.saveToken(data)
  //       this.userToken = data
        
  //       this.decodedToken = this.jwtHelper.decodeToken(data.toString())
  //       this.alertifyService.success('Sisteme giriş yapıldı.')
  //       this.router.navigateByUrl('/city')

  //     });
  // }

  register(registerUser: RegisterUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.httpClient.post(this.path + "register", registerUser, { headers: headers })
      .subscribe(data => {

      })
  }

  saveToken(token: any) {

    localStorage.setItem(this.TOKEN_KEY, token);
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY)
    this.alertifyService.error("Sistemden çıkış yapıldı");
  }

  loggedIn() {
    const token = this.token;
  return token ? !this.jwtHelper.isTokenExpired(token) : false;
    // return this.jwtHelper.isTokenExpired(this.TOKEN_KEY)
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }


  getCurrentUserId() {
    const token = this.token;
    return token ? this.jwtHelper.decodeToken(token).nameid : null;
    // return this.jwtHelper.decodeToken(this.token!).nameid
  }


}
