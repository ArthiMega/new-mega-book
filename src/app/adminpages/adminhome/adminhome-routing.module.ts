import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { EditebooksComponent } from './components/editebooks/editebooks.component';
import { FormComponent } from './components/form/form.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { RoleGaurdGuard } from '../role-gaurd.guard';

export const routes: Routes = [
  {path:'',component:AdminDashboardComponent,
   children:[  
        {path:'view-user',title:'User Details',canActivate:[RoleGaurdGuard],component:ViewUserComponent},
        {path:'editbooks',title:'Book Details',canActivate:[RoleGaurdGuard],component:EditebooksComponent},
        {path:'add-form',title:'Book Addition Form',canActivate:[RoleGaurdGuard], component:FormComponent},
        {path:'edit/:id',title:'Bookbs Details',canActivate:[RoleGaurdGuard],component:FormComponent},
        {path:'',title:'Books Details',redirectTo:'/adminpages/editbooks',pathMatch:'full'}
     ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminhomeRoutingModule { }
