import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NewOrgComponent } from './pages/new-org/new-org.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {path: 'new', component: NewOrgComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
