import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelprojComponent } from './delproj.component';

describe('DelprojComponent', () => {
  let component: DelprojComponent;
  let fixture: ComponentFixture<DelprojComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelprojComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelprojComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
