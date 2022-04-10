import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, doc, Firestore, getDocs, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.css']
})
export class AddItemFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private firestore: Firestore,
    private router: Router, 
    private route: ActivatedRoute

    ) { }
    
    form : FormGroup;
    
    ngOnInit(): void {
      this.getData()
      this.form = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        description: ['', [Validators.required, Validators.minLength(5)]],
        amount: ['', [Validators.required]],
        date: ['', [Validators.required]],
      });
    }

    user = this.auth.currentUser
    userOrganizations
    organization
    orgId

    get name() {
      return this.form.get('name');
    }
  
    get description() {
      return this.form.get('description');
    }

    get amount() {
      return this.form.get('amount');
    }

    get date() {
      return this.form.get('date');
    }

    onSubmit() {
      if (this.user){
        const dataToUpdate = doc(this.firestore, 'organizations', this.organization.id);
        var items = this.organization.items;
        this.form.value.amount = +this.form.value.amount;
        let budget = this.organization.budget + this.form.value.amount;
        items.push(this.form.value);

        updateDoc(dataToUpdate, {
          items: items,
          budget: budget
        })
          .then(() => {
            this.router.navigate(['/main' + '/' + this.orgId])
          })
          .catch((err) => {
            alert(err.message)
          })


      }
      
    }


    getData() {
      const dbInstance = collection(this.firestore, 'organizations');
      getDocs(dbInstance)
        .then((response) => {
          
          return [...response.docs.map((item) => {
            return { ...item.data(), id: item.id }
          })]
        })
        .then((response) => {
          this.userOrganizations = response
          return this.userOrganizations.filter((item) => item.author === this.user.uid)
        })
        .then((response)=> {
          this.orgId = this.route.snapshot.params['orgId']
          this.organization = response.find((x) => x.id == this.orgId);
        })
    }



}
