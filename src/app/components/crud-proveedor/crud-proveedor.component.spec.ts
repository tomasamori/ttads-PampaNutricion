import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudProveedorComponent } from './crud-proveedor.component';

describe('CrudProductsComponent', () => {
  let component: CrudProveedorComponent;
  let fixture: ComponentFixture<CrudProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudProveedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
