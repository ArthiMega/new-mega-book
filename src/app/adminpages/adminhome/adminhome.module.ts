import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { EditebooksComponent } from './components/editebooks/editebooks.component';
import { HeaderComponent } from './components/header/header.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { FormComponent } from './components/form/form.component';

import { AdminhomeRoutingModule } from './adminhome-routing.module';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    EditebooksComponent,
    HeaderComponent,
    ViewUserComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    AdminhomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class AdminhomeModule { }
