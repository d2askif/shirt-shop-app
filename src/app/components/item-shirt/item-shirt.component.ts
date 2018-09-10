import { Component, OnInit, Input } from '@angular/core';
import { Shirt } from '../../model/shirt-model';

@Component({
  selector: 'app-item-shirt',
  templateUrl: './item-shirt.component.html',
  styleUrls: ['./item-shirt.component.css']
})
export class ItemShirtComponent implements OnInit {
@Input() item:Shirt;
  constructor() {
   
   }

  ngOnInit() {
    if(!this.item.hasOwnProperty("quantity")){
      this.item.quantity = 0
    }
  }

}
