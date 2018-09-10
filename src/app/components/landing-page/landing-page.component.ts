import { Component, OnInit, OnDestroy } from '@angular/core';
import { FetchShirtsService } from '../../services/fetch-shirts.service';
import { Shirt } from '../../model/shirt-model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit,OnDestroy {
  
  private arryOfItemShirt:Shirt[]=[];
  private dataSubscruption:Subscription;
  private colourOptions:string[]=[];
  private sizeOptions:string[]=[];
  private selectedSizeOption = ".*?"; // a regular expression for 'all sizes'
  private selectedColourOption = ".*?"; // a regular expression for 'all colours'

  constructor(private fetchShirtService:FetchShirtsService) { 
    // subscribe to the data observable to get notified and recive a coppy 
    //when http data feaching is completed
   this.arryOfItemShirt = this.fetchShirtService.getAllShirtsInStor();
   this.setSelectorOptions();
   this.dataSubscruption = this.fetchShirtService.dataObservable$.subscribe(()=>{

      // feed copy of itemsInstore to arryOfItems
      this.arryOfItemShirt = this.fetchShirtService.getAllShirtsInStor();
      // fill up the options of the selector
      this.setSelectorOptions();
    })
    console.log("Constructor");
     
  }

  ngOnInit() {
    
  }
  ngOnDestroy(): void {
    this.dataSubscruption.unsubscribe();
  }

  //filter based on selected clour
  onColorSelected(event) {
    this.selectedColourOption = event.target.value;
    const regexColour =  new RegExp(this.selectedColourOption, 'i');
    const regexSize = new RegExp(this.selectedSizeOption, 'i');
    // filter the array for display based on selected options
    this.arryOfItemShirt = this.fetchShirtService.getAllShirtsInStor().filter((value)=>{
      return  regexSize.test(value.size) && regexColour.test(value.colour);
    });
   
  }

  //filter based on selected size
  onSizeSelected(event) {
    this.selectedSizeOption = event.target.value;
    const regexSize =  new RegExp(this.selectedSizeOption, 'i');
    const regexColour = new RegExp(this.selectedColourOption, 'i');
    // filter the array for display based on selected options
    this.arryOfItemShirt = this.fetchShirtService.getAllShirtsInStor().filter((value)=>{
      return  regexSize.test(value.size) && regexColour.test(value.colour);
    });
  }


  // fills up the selector options of the size selector and color selector with unique values
  setSelectorOptions() {
   this.arryOfItemShirt.forEach((value)=>{
     if(this.sizeOptions.find(val=>val==value.size) == undefined) {
       this.sizeOptions.push(value.size);
     }
     if(this.colourOptions.find(val=>val==value.colour) == undefined) {
      this.colourOptions.push(value.colour);
    }
   })
  }

}
