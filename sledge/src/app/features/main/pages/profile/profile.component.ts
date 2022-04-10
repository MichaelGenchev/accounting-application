import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  sideBarOpen: boolean = true;

  user = this.auth.currentUser
  userOrganizations

  organizationsNames: string = ''


  constructor(
    private auth:Auth,
    private firestore:Firestore
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }

  getData() {
    const dbInstance = collection(this.firestore, 'organizations');
    getDocs(dbInstance)
      .then((response) => {
        this.userOrganizations = [...response.docs.map((item) => {
          return { ...item.data(), id: item.id }
        })]
      })
      .then(() => {return this.userOrganizations.filter((item) => item.author === this.user.uid)})
      .then((response)=> {
        console.log(response)
        this.userOrganizations = response
        for (let org of this.userOrganizations) {
          let title = org.title
          this.organizationsNames = this.organizationsNames + title + '   '
        }
      })
  }
}
