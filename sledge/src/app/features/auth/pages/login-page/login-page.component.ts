import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addDoc, Firestore, collection, getDocs  } from '@angular/fire/firestore';
import { LoginData } from 'src/app/core/interfaces/login-data.interface';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  errorMessage: any
  userOrganizations: any

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private firestore: Firestore
  ) { }

  ngOnInit(): void {
  }


  login(loginData: LoginData): void {

    this.authService.login(loginData)
    .then((userCredential) => {
      const user = userCredential.user;
      
      const dbInstance = collection(this.firestore, 'organizations')
      getDocs(dbInstance)
      .then((response) => { this.userOrganizations =  response.docs.map((item) => {
        return {...item.data(), id: item.id}
      })})
      .then(() => {return this.userOrganizations.filter((item) => item.author === user.uid)})
      .then((response) => {
        if (response.length > 0) {
          this.router.navigate(['/main']);
          
        }
        else {
          this.router.navigate(['/dashboard'])
        }
      })


      
    })
      // .then(() => this.router.navigate(['/dashboard']))
      .catch(() => this.errorMessage = "Email or password is invalid.")

  
  }

  loginWithGoogle() {
    this.authService
      .loginWithGoogle()
      .then((userCredential) => {
        const user = userCredential.user;
        
        const dbInstance = collection(this.firestore, 'organizations')
        getDocs(dbInstance)
        .then((response) => { this.userOrganizations =  response.docs.map((item) => {
          return {...item.data(), id: item.id}
        })})
        .then(() => {return this.userOrganizations.filter((item) => item.author === user.uid)})
        .then((response) => {
          if (response.length > 0) {
            this.router.navigate(['main']);
            
          }
          else {
            this.router.navigate(['/dashboard'])
          }
        })
  
  
        
      })
      .catch((e) => this.errorMessage = e.message);
  }

}
