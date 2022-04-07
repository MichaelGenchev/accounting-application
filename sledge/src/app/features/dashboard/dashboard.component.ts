import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  }


  logout(): void {
    this.authService.logout()
      .then(() => {localStorage.removeItem('user')})
      .then(() => this.router.navigate(['/']))
      .catch(((err) => console.log(err.message)));
  }

}
