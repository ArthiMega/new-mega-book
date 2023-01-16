import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {HttpClientModule} from '@angular/common/http'
import { ListingComponent } from './listing/listing.component';
import { DataComponent } from './data/data.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { BookComponent } from './book/book.component';
import { NgbRatingModule} from '@ng-bootstrap/ng-bootstrap'; 

//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { ToastrModule } from 'ngx-toastr';
//import { YouTubePlayerModule } from '@angular/youtube-player';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [												
    AppComponent,
      NavBarComponent,
      LoginComponent,
      RegistrationComponent,
      HomeComponent,
      PageNotFoundComponent,
      ListingComponent,
      DataComponent,
      DashboardComponent,
      AdminComponent,
      BookComponent,
      AboutUsComponent,
      ContactUsComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbRatingModule,
    FormsModule,
    BrowserAnimationsModule,
    //YouTubePlayerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
