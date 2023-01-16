import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { EditebooksComponent } from './components/editebooks/editebooks.component';
import { FormComponent } from './components/form/form.component';
import { ViewUserComponent } from './components/view-user/view-user.component';

const routes: Routes = [
  {path:'',component:AdminDashboardComponent,
   children:[  
        {path:'view-user',component:ViewUserComponent},
        {path:'editbooks',component:EditebooksComponent},
        {path:'add-form', component:FormComponent},
        {path:'',redirectTo:'/adminpages/editbooks',pathMatch:'full'}
     ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminhomeRoutingModule { }
