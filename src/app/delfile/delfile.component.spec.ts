import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelfileComponent } from './delfile.component';

describe('DelfileComponent', () => {
  let component: DelfileComponent;
  let fixture: ComponentFixture<DelfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
