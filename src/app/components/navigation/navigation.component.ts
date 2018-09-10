import {
  Component,
  OnInit,
  OnDestroy
}

from '@angular/core';

import {
  FetchShirtsService
}

from '../../services/fetch-shirts.service';

import {
  Subscription
}

from 'rxjs';

import {
  MatDialogRef,
  MatDialog
}

from '@angular/material';

import {
  CartComponent
}

from '../cart/cart.component';

import {
  Overlay
}

from '@angular/cdk/overlay';

@Component( {
  selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
}

) export class NavigationComponent implements OnInit,
OnDestroy {
  private orderInCartSubscription: Subscription;
  cartDialogRef: MatDialogRef<CartComponent>;
  private numberOfOrders: number=0;

  constructor(private fetchDataService: FetchShirtsService,
    private dialog: MatDialog, private overlay: Overlay) {
      // subscrib to get the uptodate number of orders in the cart
    this.orderInCartSubscription = this.fetchDataService.orderInCartSubject.subscribe((orderNumber)=> {
      this.numberOfOrders = orderNumber;
      console.log("recived on nav subscription: " + orderNumber)
    }

    );
  }

  ngOnInit() {
    //this.numberOfOrders=this.fetchDataService.getNumberOfOrdersInCart();
    //this.numberOfOrders = 0;
  }

  ngOnDestroy(): void {
    this.orderInCartSubscription.unsubscribe();
  }

  //show the popup modal
  openCartPopUp() {

    this.cartDialogRef=this.dialog.open(CartComponent, {
      hasBackdrop: true, minWidth:800, autoFocus: false
    }

    );
  }
}
