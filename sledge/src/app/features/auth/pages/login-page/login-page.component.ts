import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/core/interfaces/login-data.interface';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  errorMessage: any

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }


  login(loginData: LoginData): void {

    this.authService.login(loginData)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      
    })
      .then(() => this.router.navigate(['/dashboard']))
      .catch((error) => this.errorMessage = error.message)

  
  }

  loginWithGoogle() {
    this.authService
      .loginWithGoogle()
      .then(() => this.router.navigate(['/dashboard']))
      .catch((e) => this.errorMessage = e.message);
  }

}
