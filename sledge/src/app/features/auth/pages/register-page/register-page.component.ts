import { Component, OnInit } from '@angular/core';


import { Router } from '@angular/router';
import { LoginData } from 'src/app/core/interfaces/login-data.interface';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }


  register(registerData: LoginData): void {
    this.authService.register(registerData)
      .then(() => this.router.navigate(['/login']))
      .catch((error) => console.log(error.message));

  }
}
