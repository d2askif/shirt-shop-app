import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemInCartComponent } from './item-in-cart.component';

describe('ItemInCartComponent', () => {
  let component: ItemInCartComponent;
  let fixture: ComponentFixture<ItemInCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemInCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemInCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
