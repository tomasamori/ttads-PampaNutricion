import { TestBed } from '@angular/core/testing';

import { TipoMascotaService } from './tipoMascota.service';

describe('TipoMascotaService', () => {
  let service: TipoMascotaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoMascotaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});