import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusContentComponent } from './status-content.component';

describe('StatusContentComponent', () => {
  let component: StatusContentComponent;
  let fixture: ComponentFixture<StatusContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
