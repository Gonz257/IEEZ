import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCedulaComponent } from './registro-cedula.component';

describe('RegistroCedulaComponent', () => {
  let component: RegistroCedulaComponent;
  let fixture: ComponentFixture<RegistroCedulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroCedulaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroCedulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
