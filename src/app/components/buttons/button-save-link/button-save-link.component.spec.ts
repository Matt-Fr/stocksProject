import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSaveLinkComponent } from './button-save-link.component';

describe('ButtonSaveLinkComponent', () => {
  let component: ButtonSaveLinkComponent;
  let fixture: ComponentFixture<ButtonSaveLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonSaveLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonSaveLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
