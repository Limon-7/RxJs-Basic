import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailListItemComponent } from './mail-list-item.component';

describe('MailListItemComponent', () => {
  let component: MailListItemComponent;
  let fixture: ComponentFixture<MailListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
