import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from '@angular/fire/auth';
import { LoginData, RegisterData } from '../interfaces/login-data.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }


  login({email, password}: LoginData){
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register({username, email, password}: RegisterData){
    console.log(username)
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout(){
    return signOut(this.auth)
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
}
