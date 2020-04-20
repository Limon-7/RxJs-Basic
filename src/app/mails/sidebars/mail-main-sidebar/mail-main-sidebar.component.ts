import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ComposeComponent } from '../../dialogs/compose/compose.component';
import { fuseAnimations } from '@fuse/animations';
import { Folder } from 'app/shared/MailsModels/Mail';
import { Http2Service } from 'app/core/http/http2.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mail-main-sidebar',
  templateUrl: './mail-main-sidebar.component.html',
  styleUrls: ['./mail-main-sidebar.component.scss'],
  animations: fuseAnimations
})
export class MailMainSidebarComponent implements OnInit {
  folders = [
    new Folder(0, 'inbox', 'Inbox', 'inbox'),
    new Folder(1, 'sent', 'Sent', 'send'),
    new Folder(2, 'drafts', 'drafts', 'email_open'),
    // new Folder(3, 'spam', 'Spam', 'error'),
  ];
  filters = [
    { id: 0, handle: 'starred', title: 'Starred', icon: 'star', color: 'amber-fg' },
    { id: 1, handle: 'Important', title: 'Important', icon: 'label', color: 'red-fg' }
  ];
  labels = [
    { id: 0, handle: 'note', title: 'Note', color: '#7cb342' },
    { id: 1, handle: 'paypal', title: 'PayPal', color: '#d84315' },
    { id: 2, handle: 'invoice', title: 'Invoice', color: '#607d8b' },
    { id: 3, handle: 'amazon', title: 'Amazon', color: '#03a9f4' }
  ];
  accounts: object;
  selectedAccount: string;
  dialogRef: any;
  folder: string;
  constructor(
    public _matDialog: MatDialog, private _mailService: Http2Service, private route: ActivatedRoute, private cd: ChangeDetectorRef
  ) {
    // Set the defaults
    this.accounts = {
      creapond: 'johndoe@creapond.com',
      withinpixels: 'johndoe@withinpixels.com'
    };
    this.selectedAccount = 'creapond';
  }
  // onSelected(folderId: string): void {
  //   // this._mailService.selectedEmailFolder(folderId);
  //   console.log(folderId);
  // }

  ngOnInit(): void {
    this.route.paramMap.subscribe(route => {
      this.folder = route.get('folder');
      // this.onSelected(this.folder);
      this._mailService.selectedEmailFolder(this.folder);
      //   console.log('folder handle:', this.folder);
    });
  }
  /**
    * Compose dialog
    */
  composeDialog(): void {
    this.dialogRef = this._matDialog.open(ComposeComponent, {
      panelClass: 'mail-compose-dialog'
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {
        console.log('the dialog was closed', response);
      });
  }
}
