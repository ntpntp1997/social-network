import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostStatusComponent } from './post-status.component';

describe('PostStatusComponent', () => {
  let component: PostStatusComponent;
  let fixture: ComponentFixture<PostStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
