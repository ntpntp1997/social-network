/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RefreshTokenService } from './refreshToken.service';

describe('Service: RefreshToken', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RefreshTokenService]
    });
  });

  it('should ...', inject([RefreshTokenService], (service: RefreshTokenService) => {
    expect(service).toBeTruthy();
  }));
});
