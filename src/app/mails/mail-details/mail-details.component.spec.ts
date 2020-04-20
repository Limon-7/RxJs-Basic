import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailDetailsComponent } from './mail-details.component';

describe('MailDetailsComponent', () => {
  let component: MailDetailsComponent;
  let fixture: ComponentFixture<MailDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
