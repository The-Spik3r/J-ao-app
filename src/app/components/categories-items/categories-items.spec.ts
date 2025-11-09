import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesItems } from './categories-items';

describe('CategoriesItems', () => {
  let component: CategoriesItems;
  let fixture: ComponentFixture<CategoriesItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesItems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesItems);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
