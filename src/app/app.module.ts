import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Ng2Webstorage, LocalStorageService} from 'ngx-webstorage'

import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FetchShirtsService } from './services/fetch-shirts.service';
import { ItemShirtComponent } from './components/item-shirt/item-shirt.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ItemDetailComponent } from './components/item-shirt/item-detail/item-detail.component';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { MatDialogModule } from '@angular/material';
import { CartComponent } from './components/cart/cart.component';
import { ItemInCartComponent } from './components/cart/item-in-cart/item-in-cart.component';



const appRoutes: Routes =[
  {path: "", component: LandingPageComponent},
  {path: "detail/:id", component: ItemDetailComponent},
  {path: "cart", component:CartComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ItemShirtComponent,
    NavigationComponent,
    ItemDetailComponent,
    CartComponent,
    ItemInCartComponent
  ],
  imports: [
    Ng2Webstorage,
    BrowserAnimationsModule,
    MatDialogModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [FetchShirtsService,HttpClient,LocalStorageService],
  bootstrap: [AppComponent],
  entryComponents :[CartComponent]
})
export class AppModule { }
