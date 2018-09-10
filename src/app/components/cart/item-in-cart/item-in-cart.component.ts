import { Component, OnInit, Input } from '@angular/core';
import { Shirt } from '../../../model/shirt-model';
import { FetchShirtsService } from '../../../services/fetch-shirts.service';

@Component({
  selector: 'app-item-in-cart',
  templateUrl: './item-in-cart.component.html',
  styleUrls: ['./item-in-cart.component.css']
})
export class ItemInCartComponent implements OnInit {
  @Input() item:Shirt;
  

  constructor(private fetchShirtsService: FetchShirtsService) { }

  ngOnInit() {
  }
  onEditQuantity(event:Event) {
    let newQuantity:string = (<HTMLInputElement>event.target).value;
    this.fetchShirtsService.edditOrderQuantity(this.item.id, Number(newQuantity));
  }
  onDeleteOrder(){
    this.fetchShirtsService.deleteOrder(this.item.id);
  }

  //returns the total quantity availabl in store
  maxPossibleOrder():number {
    return this.fetchShirtsService.getShirtInstorById(this.item.id)[0].quantity;
  }

}
