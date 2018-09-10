import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemShirtComponent } from './item-shirt.component';

describe('ItemShirtComponent', () => {
  let component: ItemShirtComponent;
  let fixture: ComponentFixture<ItemShirtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemShirtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemShirtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
