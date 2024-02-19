import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudTipoMascotaComponent } from './crud-tipoMascota.component';

describe('CrudProductsComponent', () => {
  let component: CrudTipoMascotaComponent;
  let fixture: ComponentFixture<CrudTipoMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudTipoMascotaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudTipoMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
