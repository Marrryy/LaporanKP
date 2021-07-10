import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrLoginComponent } from './err-login.component';

describe('ErrLoginComponent', () => {
  let component: ErrLoginComponent;
  let fixture: ComponentFixture<ErrLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
