import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfodbComponent } from './infodb.component';

describe('InfodbComponent', () => {
  let component: InfodbComponent;
  let fixture: ComponentFixture<InfodbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfodbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfodbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
