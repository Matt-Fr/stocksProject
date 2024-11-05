import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerInfoComponent } from './ticker-info.component';

describe('TickerInfoComponent', () => {
  let component: TickerInfoComponent;
  let fixture: ComponentFixture<TickerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TickerInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TickerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
