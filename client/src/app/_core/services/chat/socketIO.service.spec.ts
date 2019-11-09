/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SocketIOService } from './socketIO.service';

describe('Service: SocketIO', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketIOService]
    });
  });

  it('should ...', inject([SocketIOService], (service: SocketIOService) => {
    expect(service).toBeTruthy();
  }));
});
