import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();


  username: string
  user = this.auth.currentUser

  constructor(
    private router: Router,
    private authService: AuthService,
    private auth: Auth
    ) { }

  ngOnInit(): void {
    this.username = this.user.displayName
  
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  logout(): void {
    this.authService.logout()
      .then(() => {localStorage.removeItem('user')})
      .then(() => this.router.navigate(['/']))
      .catch(((err) => console.log(err.message)));
  }

  createNewOrganization(){
    this.router.navigate(['/dashboard/new'])
  }

}
