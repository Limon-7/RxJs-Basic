import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Http2Service } from 'app/core/http/http2.service';
import { Observable } from 'rxjs';
import { ReceivedMail } from 'app/shared/MailsModels/Mail';

@Component({
  selector: 'mail-details',
  templateUrl: './mail-details.component.html',
  styleUrls: ['./mail-details.component.scss'],
  animations: fuseAnimations
})
export class MailDetailsComponent implements OnInit {

  // mail$ = this._mailService.selectedMail$;
  mail: ReceivedMail | null;
  showDetails: boolean;
  constructor(private _mailService: Http2Service) {
    this.showDetails = false;
  }

  ngOnInit(): void {
    this._mailService.selectedMailAction$.subscribe(email => this.mail = email);
  }

}
