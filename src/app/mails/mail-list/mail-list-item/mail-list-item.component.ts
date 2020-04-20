import { Component, OnInit, Input } from '@angular/core';
import { Mail } from '../../mail.model';
import { ReceivedMail } from 'app/shared/MailsModels/Mail';

@Component({
  selector: 'mail-list-item',
  templateUrl: './mail-list-item.component.html',
  styleUrls: ['./mail-list-item.component.scss']
})
export class MailListItemComponent implements OnInit {
  @Input() mail: ReceivedMail;
  constructor() { }

  ngOnInit() {
  }

}
