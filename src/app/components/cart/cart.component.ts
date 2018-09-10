import { Component, OnInit, OnDestroy } from '@angular/core';
import { FetchShirtsService } from '../../services/fetch-shirts.service';
import { Shirt } from '../../model/shirt-model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit ,OnDestroy{
  private shirtsInCart:Shirt [];
  private totalPraice = 0;
  private orderSubscription:Subscription;

  constructor(private featchShirtsService: FetchShirtsService) { }

  ngOnInit() {
    this.getShirtsInCart();

    // cal culat total price for the currnt order
    this.totalPraice = (this.shirtsInCart.map(val=>val.quantity * val.price))
                          .reduce((acc=0,val)=>val + acc);

   this.orderSubscription =  this.featchShirtsService.orderInCartSubject.subscribe(()=>{
                             this.getShirtsInCart();
      this.totalPraice =0;
      if(this.shirtsInCart.length>0) {
      this.totalPraice = (this.shirtsInCart.map(val=>val.quantity * val.price))
                        .reduce((acc=0,val)=>val + acc);
                      }
    });
  }
  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
  }
   
  // fetch all the orders from cart array
  getShirtsInCart() {
    this.shirtsInCart = this.featchShirtsService.getShirtsInCart();
  }
  

}
