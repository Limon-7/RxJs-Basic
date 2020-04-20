import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FormControl } from '@angular/forms';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from '../i18n/en';
import { locale as turkish } from '../i18n/tr';
import { Http2Service } from 'app/core/http/http2.service';
import { ReceivedMail } from 'app/shared/MailsModels/Mail';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-mails',
  templateUrl: './mails.component.html',
  styleUrls: ['./mails.component.scss']
})
export class MailsComponent implements OnInit, AfterViewInit {
  currentMail: ReceivedMail | null;
  searchInput: FormControl;

  constructor(private _jobDeskSidebarService: FuseSidebarService, private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private _mailService: Http2Service, private cd: ChangeDetectorRef) {
    // Load the translations
    this._fuseTranslationLoaderService.loadTranslations(english, turkish);

    // Set the defaults
    this.searchInput = new FormControl('');
  }
  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }
  ngOnInit(): void {
    this.search();
    this._mailService.selectedMailAction$.subscribe(mail => this.currentMail = mail);

  }
  toggleSidebar(name): void {
    this._jobDeskSidebarService.getSidebar(name).toggleOpen();
  }
  search(): void {
    this.searchInput.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchText => {
      this._mailService.searchEmailChange(searchText);
      // console.log(searchText);
    }
    );
  }
  deselectCurrentMail(): void {
    this.currentMail = null;
  }

}
