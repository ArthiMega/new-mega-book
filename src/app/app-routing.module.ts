import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookComponent } from './book/book.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AuthGuard } from './gaurd/auth.guard';
import { DataComponent } from './data/data.component';
import { BuyNowPageComponent } from './buy-now-page/buy-now-page.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

const routes: Routes = [
  {path:'home',title:'Mega Book',component:HomeComponent},
  {path:'login',title:'Login Page',component:LoginComponent},
  {path:'book',title:'Book Page', canActivate:[AuthGuard], component:BookComponent},
  {path:'dashboard',title:'DashBoard', canActivate:[AuthGuard], component:DashboardComponent},
  {path:'aboutus',title:'About Us', component:AboutUsComponent},
  {path:'contactus',title:'Contact Us', component:ContactUsComponent},
  {path:'profile',title:'Profile',canActivate:[AuthGuard], component: DataComponent},
  {path:'buy',title:'Cart Page',canActivate:[AuthGuard], component:BuyNowPageComponent},
  {path:'registration-form',title:'Registration Page',component:RegistrationFormComponent},
  {path:'adminpages',title:'Admin Pages',
    canActivate:[AuthGuard], 
    loadChildren:()=>
    import('./adminpages/adminhome/adminhome.module').then((m)=>m.AdminhomeModule),
  },
  {path: '',title:'Home', redirectTo:'/home', pathMatch:'full'},
  {path:'**',title:'Page Not Found',component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
