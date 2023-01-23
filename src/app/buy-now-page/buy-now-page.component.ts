import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/authentication.service';
import { CRUDService } from '../service/crud.service';
import { BuyNowModule } from './buy-now.module';

@Component({
  selector: 'app-buy-now-page',
  templateUrl: './buy-now-page.component.html',
  styleUrls: ['./buy-now-page.component.css']
})
export class BuyNowPageComponent implements OnInit {
  IndividualBook!:any
  bookId = sessionStorage.getItem('bookid');
  cardDetails:any;
  buyNowModuleObj:BuyNowModule = new BuyNowModule();
  currentUser:any;
  constructor(private crudservice: CRUDService,
               private auth: AuthService,
               ) { }

  ngOnInit() {
    this.crudservice.getIndividualBook(Number(this.bookId)).subscribe((res:any)=>{
      this.IndividualBook = res;
    })
    this.getCartDetails();
  }
  getCartDetails(){
    this.auth.getCart().subscribe(cart=>{
      this.cardDetails = cart;
    })
  }
  checkDuplicates(cart:Object):any{
    this.getCartDetails();
    for(let obj of this.cardDetails){
      if(obj.email === this.currentUser && obj.mybooks.id === this.buyNowModuleObj.cartedBooks.id){
        return false
      }
    }
    return true;
  }
  buyNow(item:Object){
    this.currentUser = this.auth.getEmail();
    this.buyNowModuleObj.email = this.currentUser;
    this.buyNowModuleObj.cartedBooks = item;
    this.getCartDetails();
    if(this.checkDuplicates(this.buyNowModuleObj)){
      this.auth.buyNow(this.IndividualBook).subscribe(
        res=>{
          // console.log(res)
          sessionStorage.setItem('isBuyed','yes');
        }
      )
    }
  }
}
