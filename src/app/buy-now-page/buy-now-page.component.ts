import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/authentication.service';
import { CRUDService } from '../service/crud.service';
import { BuyNowModule } from './buy-now.module';

@Component({
  selector: 'app-buy-now-page',
  templateUrl: './buy-now-page.component.html',
  styleUrls: ['./buy-now-page.component.css']
})
export class BuyNowPageComponent implements OnInit {
  IndividualBook!: any
  bookId = localStorage.getItem('bookid');
  cardDetails: any;
  buyNowModuleObj: BuyNowModule = new BuyNowModule();
  currentUser: any;
  constructor(private crudservice: CRUDService,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getIndividualBook();
    this.getCartDetails();
  }
  getCartDetails() {
    this.auth.getCart().subscribe(cart => {
      this.cardDetails = cart;
    },
    error=>{
      this.toastr.error('Something went wrong!');
    })
  }
  getIndividualBook() {
    this.crudservice.getIndividualBook(Number(this.bookId)).subscribe((res: any) => {
      this.IndividualBook = res;
    },
    (error:any)=>{
      this.toastr.error('!something went wrong!');
    });
  }
  checkDuplicates(cart: Object): any {
    this.getCartDetails();
    for (let obj of this.cardDetails) {
      if (obj.email === this.currentUser && obj.cartedBooks.id === this.buyNowModuleObj.cartedBooks.id) {
        return false
      }
    }
    return true;
  }
  buyNow(item: Object) {
    this.currentUser = this.auth.getEmail();
    this.buyNowModuleObj.email = this.currentUser;
    this.buyNowModuleObj.cartedBooks = item;
    this.getCartDetails();
    if (this.checkDuplicates(this.buyNowModuleObj)) {
      this.auth.buyNow(this.buyNowModuleObj).subscribe(res => {
        console.log(res);
        this.IndividualBook = false;
      },
      error=>{
        this.toastr.error('Something went wrong!');
      })
    }
    this.router.navigate(['../book']);
  }
}
