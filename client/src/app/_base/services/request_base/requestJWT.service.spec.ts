/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RequestJWTService } from './requestJWT.service';

describe('Service: RequestJWT', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestJWTService]
    });
  });

  it('should ...', inject([RequestJWTService], (service: RequestJWTService) => {
    expect(service).toBeTruthy();
  }));
});
