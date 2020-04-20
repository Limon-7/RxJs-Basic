import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/auth/auth-guard.service';


import { FuseSidebarModule } from '@fuse/components';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';


import { MailMainSidebarComponent } from './sidebars/mail-main-sidebar/mail-main-sidebar.component';
import {
  MatButtonModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule,
  MatRippleModule, MatSelectModule, MatToolbarModule, MatNavList, MatListModule, MatProgressSpinnerModule
} from '@angular/material';
import { MailListComponent } from './mail-list/mail-list.component';
import { MailListItemComponent } from './mail-list/mail-list-item/mail-list-item.component';
import { MailDetailsComponent } from './mail-details/mail-details.component';
import { ComposeComponent } from './dialogs/compose/compose.component';
import { MailsComponent } from './mails/mails.component';
import { MailsPipe } from './mails.pipe';

const routes: Routes = [
  { path: 'mails', component: MailsComponent, canActivate: [AuthGuard] },
  { path: 'mails/:folder', component: MailsComponent, canActivate: [AuthGuard] }
  // { path: 'mails/inbox', component: MailsComponent, canActivate: [AuthGuard] },
  // { path: 'mails/sent', component: MailsComponent, canActivate: [AuthGuard] },
  // { path: 'mails/drafts', component: MailsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),


    TranslateModule,
    FuseSharedModule,
    FuseSidebarModule,

    // material 
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatListModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    MailsComponent,
    MailMainSidebarComponent,
    MailListComponent,
    MailListItemComponent,
    MailDetailsComponent,
    ComposeComponent,
    MailsPipe
  ],

  entryComponents: [
    ComposeComponent
  ],
  providers: [

  ]
})
export class MailsModule { }
