import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessBodyComponent } from './guess-body.component';

describe('GuessBodyComponent', () => {
  let component: GuessBodyComponent;
  let fixture: ComponentFixture<GuessBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuessBodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuessBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
