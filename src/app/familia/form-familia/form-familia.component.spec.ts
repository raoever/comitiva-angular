import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFamiliaComponent } from './form-familia.component';

describe('FormFamiliaComponent', () => {
  let component: FormFamiliaComponent;
  let fixture: ComponentFixture<FormFamiliaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFamiliaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFamiliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
