import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './pages/header/header.component';
import { SidenavComponent } from './pages/sidenav/sidenav.component';
import { HomeComponent } from './pages/home/home.component';
import { OtherComponent } from './pages/other/other.component';
import { HomeContentComponent } from './components/home-content/home-content.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OrganizationComponent } from './components/organization/organization.component';
import { BudgetItemListComponent } from './components/budget-item-list/budget-item-list.component';
import { BudgetItemCardComponent } from './components/budget-item-list/budget-item-card/budget-item-card.component';
import { AddItemFormComponent } from './components/add-item-form/add-item-form.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProfileComponent } from './pages/profile/profile.component';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    OtherComponent,
    HomeContentComponent,
    OrganizationComponent,
    BudgetItemListComponent,
    BudgetItemCardComponent,
    AddItemFormComponent,
    ContactComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MainModule { }
