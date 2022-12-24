import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoFamiliaComponent } from './info-familia.component';

describe('InfoFamiliaComponent', () => {
  let component: InfoFamiliaComponent;
  let fixture: ComponentFixture<InfoFamiliaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoFamiliaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoFamiliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
