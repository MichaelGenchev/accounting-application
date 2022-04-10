import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, getAuth, updateProfile, user } from '@angular/fire/auth';
import { addDoc, Firestore, collection, getDocs  } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-org',
  templateUrl: './new-org.component.html',
  styleUrls: ['./new-org.component.css']
})
export class NewOrgComponent implements OnInit {
  
  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
    ) { }
    
    form : FormGroup;
    
    ngOnInit(): void {
      this.form = this.fb.group({
        organization: ['', [Validators.required, Validators.minLength(2)]],
      });
    }
    
    get organization() {
      return this.form.get('organization')
    }


  user = this.auth.currentUser

  userOrganizations: any

  onSubmit() {
    if (user){
      const dbInstance = collection(this.firestore, 'organizations')
      console.log(this.form.value)
      const data = {
        title: this.form.value.organization,
        author: this.user.uid,
        items: [],
        budget: 0
      }
      addDoc(dbInstance, data)
      .then(() => {console.log("data sent" + this.user.displayName)})
      .then(() => {
        this.router.navigate(['/main'])
      })
      .catch((err) => {console.log(err.message)});
    }
  }

  getUserOrganizations() {
    const dbInstance = collection(this.firestore, 'organizations')
    getDocs(dbInstance)
    .then((response) => { this.userOrganizations =  response.docs.map((item) => {
      return {...item.data(), id: item.id}
    })})
    .then(() => {console.log(this.userOrganizations.filter((item) => item.author === this.user.uid))})
  }

}
