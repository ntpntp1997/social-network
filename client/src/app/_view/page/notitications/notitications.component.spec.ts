import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotiticationsComponent } from './notitications.component';

describe('NotiticationsComponent', () => {
  let component: NotiticationsComponent;
  let fixture: ComponentFixture<NotiticationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotiticationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotiticationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
