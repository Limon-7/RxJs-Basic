import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Http2Service } from 'app/core/http/http2.service';
import { ReceivedMail } from 'app/shared/MailsModels/Mail';



@Component({
  selector: 'mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.scss'],
  animations: fuseAnimations
})
export class MailListComponent implements OnInit, AfterViewInit {

  mails$: ReceivedMail[];
  foldername: string;
  selectedMail: ReceivedMail | null;
  filterMails: ReceivedMail[];
  filterText: string;
  showSpinner = true;
  constructor(private _mailService: Http2Service, private cd: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }
  ngOnInit(): void {

    setTimeout(() => {
      this.showSpinner = false;
    }, 150000);
    this._mailService.folderChanged$.subscribe(folder => {
      this.foldername = folder;
      this.showSpinner = true;
      this.folderChange(this.foldername);
    });
    this._mailService.selectedMailAction$.subscribe(mail => {
      this.selectedMail = mail;
      // console.log('Selected Mail:', this.selectedMail);
    });
  }

  performFilter(filterBy?: string): void {
    if (filterBy) {
      this.filterMails = this.mails$.filter((mail: any) =>
        (mail.senderName.toLocaleLowerCase() || mail.receiverAddress.toLocaleLowerCase()).indexOf(filterBy.toLocaleLowerCase()) !== -1);
    } else {
      this.filterMails = this.mails$;
    }
  }


  // mail selected changed
  onSelected(mail: ReceivedMail | null): void {
    this._mailService.selectedEmailChange(mail);
    console.log('Mail changed:', mail);
  }


  folderChange(value: string): void {
    switch (value) {
      case 'sent': {
        this._mailService.searchEmailChange('');
        this._mailService.selectedEmailChange(null);
        this.filterMails = [];
        this._mailService.GetSentMails().subscribe(mails => {
          this.mails$ = mails;
          console.log('current folder:', value);
          this._mailService.searchEmailSubjectAction$.subscribe(search => {
            this.filterText = search.toString();
            this.performFilter(this.filterText ? this.filterText : '');
          });
          this.performFilter(this.filterText);
        });
        break;
      }
      case 'drafts': {
        this._mailService.selectedEmailChange(null);
        this.filterMails = [];
        this._mailService.GetDraftMails().subscribe(mails => {
          this.mails$ = mails;
          this._mailService.searchEmailSubjectAction$.subscribe(search => {
            this.filterText = search.toString();
            this.performFilter(this.filterText ? this.filterText : '');
          });
        });
        this.performFilter(this.filterText);
        break;
      }
      case 'inbox': {
        this._mailService.selectedEmailChange(null);
        this.filterMails = [];
        this._mailService.GetInboxMails().subscribe((mails: ReceivedMail[]) => {
          this.mails$ = mails;
          this.showSpinner = false;
          this._mailService.searchEmailSubjectAction$.subscribe(search => {
            this.filterText = search.toString();
            this.performFilter(this.filterText ? this.filterText : '');
          });
          this.performFilter(this.filterText);

        });
        break;
      }
    }
  }
}
