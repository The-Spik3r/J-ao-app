import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BNav } from './bnav';

describe('BNav', () => {
  let component: BNav;
  let fixture: ComponentFixture<BNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BNav]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BNav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
