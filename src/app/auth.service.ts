import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class User {
  password: string;
  email: string;

  constructor(password: string, email: string) {
    this.password = password;
    this.email = email;
  }
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  currentUser: User;
  isLogged: Boolean = false;

  constructor() { 

  }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // TODO: 
        // At this point make a request to your backend to make a real check!
        // 
        let access = (credentials.password === "123123" && credentials.email === "itu@gmail.com");
        this.currentUser = new User('Itu', 'itu@gmail.com');
        this.isLogged = true;
        observer.next(access);
        observer.complete();
      });
    }
  }

  public logout() {
    console.log('logout');
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // TODO: 
      // At this point store the credentials to your backend!
      // 
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public update( info ) {
    if( info.email === null || info.name === null ) {
      return Observable.throw("Please fill all fields");
    } else {
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }


  public checkLogged() {
    return this.isLogged; 
  }

}