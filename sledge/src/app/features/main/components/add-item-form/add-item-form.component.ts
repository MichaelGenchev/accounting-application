import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router
    ) { }
    
    form : FormGroup;
    
    ngOnInit(): void {
      this.form = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        description: ['', [Validators.required]],
        amount: ['', [Validators.required]],
        date: ['', [Validators.required]]
      });
    }

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
      
    }



}
