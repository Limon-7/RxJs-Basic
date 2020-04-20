import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailMainSidebarComponent } from './mail-main-sidebar.component';

describe('MailMainSidebarComponent', () => {
  let component: MailMainSidebarComponent;
  let fixture: ComponentFixture<MailMainSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailMainSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailMainSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
