import {
  Injectable
} from '@angular/core';
import {
  Shirt
} from '../model/Shirt-model';
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable
} from 'rxjs/Observable';
import {
  Observer
} from 'rxjs/Observer';
import {
  Order
} from '../model/cart-model';
import { Subject } from 'rxjs/Subject';
import { LocalStorageService } from 'ngx-webstorage';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class FetchShirtsService {
  private _url = "http://mock-shirt-backend.getsandbox.com/shirts";
  private ShirtsInStor: Shirt[] = [];
  private cart: Shirt[] = [];
  public orderInCartSubject: ReplaySubject<number> = new ReplaySubject(5); // brodcaster for order in cart changes
  public dataObservable$: Observable <null> ;
  private dataObserver: Observer <null> ;


  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {

    this.dataObservable$ =  Observable.create((observer) => {
      this.dataObserver = observer;
    })
    

    this.getShirtDataFromServer().subscribe((data) => {
      this.ShirtsInStor = data;
      // notify the arrival of data
      this.dataObserver.next(null);
    },(err)=>{
      alert(err.message);
    });

    // get orders saved in localStorage 
    let savedOrdersOnLocalStorage = this.localStorageService.retrieve('cart');
    
    if(savedOrdersOnLocalStorage != null){
      console.log("found it in local storage");
      console.log(savedOrdersOnLocalStorage);
      
      this.cart = savedOrdersOnLocalStorage;

      this.orderChangNotify();
    }

  }

  // fetch Shirts data from server
  getShirtDataFromServer(): Observable < Shirt[] > {
    return this.http.get < Shirt[] > (this._url);
  }
  getAllShirtsInStor(): Shirt[] {
    return this.ShirtsInStor.slice();
  }
  getShirtInstorById(id: number) {
    return this.ShirtsInStor.filter(item => item.id == id);
  }

  getNumberOfOrdersInCart(): number {
    return this.cart.length;
  }

  getShirtsInCart(): Shirt[] {
    return this.cart;
  }

  addOrderToCart(newOrder: Shirt) {
    // check if the item is already in cart and increase quantity or a singl item
    let index = this.cart.findIndex(val=>val.id == newOrder.id);
      if(index > -1){
        this.cart[index].quantity++;
      } else {
       let order =  Object.assign({}, newOrder);
       order.quantity = 1;
       
      this.cart.push(order);
      }
      if(this.localStorageService.isStorageAvailable) {
        console.log('storing locally');
        
        
      } else {
        console.log("no storage availabl");
        
      }
     this.orderChangNotify();
    
  }

  edditOrderQuantity(id:number,quantity){
    let index = this.cart.findIndex(value => value.id==id);
    this.cart[index].quantity = quantity;
    this.orderChangNotify();
   
  }

  deleteOrder(id:number){
     let index = this.cart.findIndex(value=>value.id == id);
     if(index>-1){
       this.cart.splice(index,1);
       this.orderChangNotify();
     }
  }

  orderChangNotify() {
    let orderNumber = 0;
     this.cart.forEach((val)=>{
      orderNumber = orderNumber + Number(val.quantity);
     })
     // broadcast changes in the cart[] 
   this.orderInCartSubject.next(orderNumber);
   //update localstorage 
   this.localStorageService.clear()
   this.localStorageService.store("cart",this.cart);
  }

}
