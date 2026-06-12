import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Helpers } from './helpers';

describe('Helpers', () => {
  let component: Helpers;
  let fixture: ComponentFixture<Helpers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Helpers],
    }).compileComponents();

    fixture = TestBed.createComponent(Helpers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
