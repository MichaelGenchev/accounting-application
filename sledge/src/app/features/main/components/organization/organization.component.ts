import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, doc, Firestore, getDocs } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  sideBarOpen: boolean = true;


  
  
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router,
    private route: ActivatedRoute
    ) { }
    
    ngOnInit(): void {
      this.getData();
    }
    
    userOrganizations
  
    otherData
  
    organization: any;
  
    id: string;
  
    user = this.auth.currentUser

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
        this.id = this.route.snapshot.params['orgId']
        console.log(this.id)
        this.organization = response.find(x => x.id === this.id);

      })
  }


}
