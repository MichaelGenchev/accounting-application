import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {
  title = 'Card View Demo';

  gridColumns = 3;

  user

  userOrganizations

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.auth.currentUser

    const dbInstance = collection(this.firestore, 'organizations')
    getDocs(dbInstance)
    .then((response) => { this.userOrganizations =  response.docs.map((item) => {
      return {...item.data(), id: item.id}
    })})
    .then(() => {return this.userOrganizations.filter((item) => item.author === this.user.uid)})
    .then((response)=> this.userOrganizations = response)
  }

}
