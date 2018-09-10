import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router, ActivatedRoute
} from '@angular/router';
import { Shirt } from '../../../model/shirt-model';
import { FetchShirtsService } from '../../../services/fetch-shirts.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  private itemToDisplay:Shirt;

  constructor (
    private router: Router,
    private activeRoute:ActivatedRoute,
    private featchDataService: FetchShirtsService
  ) {}

  ngOnInit() {
    //get the id of the item from the active route parmeters
    let itemId =this.activeRoute.snapshot.params['id'];
    //get the currnt itemTodisply details from the feachDataService using id
    this.itemToDisplay = this.featchDataService.getShirtInstorById(itemId)[0];
  }

  // takes the navigation back to the root page
  onGoBack() {
    this.router.navigate([""]);
  }

  addToCart() {
    this.featchDataService.addOrderToCart(this.itemToDisplay);
  }

  isInTheCartAlready():boolean{
    return this.featchDataService.getShirtsInCart()
    .findIndex(val=>val.id ==this.itemToDisplay.id) > -1;
  }

  //check if the max order limit is reached for this shirt in stock
  isMaxOrderReached(){
    
    if(this.itemToDisplay.quantity <= 0){
      // if there is nothing in stock
      return true;
    }
    
    //compare the stock quantity with ordered quantity
    let temp = this.featchDataService.getShirtsInCart().filter(val=>val.id==this.itemToDisplay.id);
    if(temp.length >0 ){
    return this.itemToDisplay.quantity <= temp[0].quantity;
    }else {
      return false;
    }
  }

}
