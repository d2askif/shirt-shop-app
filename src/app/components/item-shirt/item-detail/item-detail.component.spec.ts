import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailComponent } from './item-detail.component';
import { FetchShirtsService } from '../../../services/fetch-shirts.service';
import { AppModule } from '../../../app.module';

describe('Item-detail-component',()=>{
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[AppModule],
      declarations: [ AppModule, ItemDetailComponent ],
      providers: [ {provide:FetchShirtsService}]
    });
  }));
});


  it('should create', () => {
    let fixture = TestBed.createComponent(ItemDetailComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  
  it('should use fetchShirtsDataService',()=>{
    let fixture = TestBed.createComponent(ItemDetailComponent);
    let app = fixture.debugElement.componentInstance;
    let fetchShirtsDataService = fixture.debugElement.injector.get(FetchShirtsService);
    fixture.detectChanges();
    expect(fetchShirtsDataService.getAllShirtsInStor()).not.toBeNull();
  });
  
  it('ItemTodisplay should exist',()=>{
    let fixture = TestBed.createComponent(ItemDetailComponent);
    let app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(app.itemToDisplay).not.toBeNull();
  });


