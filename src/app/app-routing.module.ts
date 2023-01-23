import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookComponent } from './book/book.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AuthGuard } from './gaurd/auth.guard';
import { DataComponent } from './data/data.component';
import { BuyNowPageComponent } from './buy-now-page/buy-now-page.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path: 'register',component:RegistrationComponent},
  {path:'book', canActivate:[AuthGuard], component:BookComponent},
  {path:'dashboard', canActivate:[AuthGuard], component:DashboardComponent},
  {path:'aboutus', component:AboutUsComponent},
  {path:'contactus', component:ContactUsComponent},
  {path:'profile',canActivate:[AuthGuard], component: DataComponent},
  {path:'buy',canActivate:[AuthGuard], component:BuyNowPageComponent},
  {path:'adminpages',
    canActivate:[AuthGuard], 
    loadChildren:()=>
    import('./adminpages/adminhome/adminhome.module').then((m)=>m.AdminhomeModule),
  },
  {path: '', redirectTo:'/home', pathMatch:'full'},
  {path:'**',component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
