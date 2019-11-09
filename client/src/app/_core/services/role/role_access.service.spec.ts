/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Role_accessService } from './role_access.service';

describe('Service: Role_access', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Role_accessService]
    });
  });

  it('should ...', inject([Role_accessService], (service: Role_accessService) => {
    expect(service).toBeTruthy();
  }));
});
