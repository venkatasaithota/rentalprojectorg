import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedClientsComponent } from './accepted-clients.component';

describe('AcceptedClientsComponent', () => {
  let component: AcceptedClientsComponent;
  let fixture: ComponentFixture<AcceptedClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptedClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
