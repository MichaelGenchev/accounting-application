import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';


import { Router } from '@angular/router';
import { updateProfile } from 'firebase/auth';
import { RegisterData } from 'src/app/core/interfaces/login-data.interface';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  errorMessage: string

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private  auth: Auth
  ) { }

  ngOnInit(): void {
  }


  register(registerData: RegisterData): void {
    this.authService.register(registerData)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: registerData.username
        })
        
      })
      .then(() => this.router.navigate(['/login']))
      .then(() => console.log(this.auth.currentUser))
      .catch((error) => {
        console.log(error.message);
      });

  }

}
