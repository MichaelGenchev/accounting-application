import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, doc, Firestore, getDocs, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-budget-item-list',
  templateUrl: './budget-item-list.component.html',
  styleUrls: ['./budget-item-list.component.css']
})
export class BudgetItemListComponent implements OnInit {


  incomeList = []
  expensesList = []

  constructor(
    private router: Router,
    private firestore: Firestore,
    private route: ActivatedRoute,
    private auth: Auth,
    private cdr:ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getData()

  }
  userOrganizations
  itemsOrganization
  currentOrganization
  orgId
  user = this.auth.currentUser


  onDeleteButtonClick(searchedItem) {
    for (let item of this.itemsOrganization) {
      if (item === searchedItem) {
        for( let i= 0; i< this.itemsOrganization.length; i++){
          if (this.itemsOrganization[i] == searchedItem) {
            const dataToUpdate = doc(this.firestore, 'organizations', this.orgId)
            this.itemsOrganization.splice(i,1)
            updateDoc(dataToUpdate, {
              items: this.itemsOrganization
            }).then(() => {
              console.log("updated")
              this.getData()
              window.location.reload()
            })      
          }
        }   
      }
    }

  }

  onCardClicked(item) {
    console.log("card Clicked")
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
      this.currentOrganization = response.find((x) => x.id == this.orgId);
    })
    .then((response) => {
      this.itemsOrganization = this.currentOrganization.items
      for (let item of this.itemsOrganization){
        if (item.amount >= 0) {
          this.incomeList.push(item)
        }
        else {
          this.expensesList.push(item)
        }

      }
    })
    .catch((err) => {
      console.error(err)
    })
  }


  navigateToAddForm(){
    var stringOrgId = '/main' + '/' + this.orgId + '/add'
    this.router.navigate([stringOrgId]);
  }
  
  
}
