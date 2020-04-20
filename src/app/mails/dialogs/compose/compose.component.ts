import { Component, OnInit, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Http2Service } from 'app/core/http/http2.service';
import { Mails } from 'app/shared/MailsModels/Mail';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ComposeComponent implements OnInit {


  composeForm: FormGroup;
  mail: Mails;
  @ViewChild('file') file;

  showfiles: any = [];
  attachment: File[] = [];
  constructor(
    public matDialogRef: MatDialogRef<ComposeComponent>, private mailService: Http2Service
    , private fb: FormBuilder) {
    // Set the defaults
    this.composeForm = this.createComposeForm();
  }
  ngOnInit() {
  }
  createComposeForm(): FormGroup {
    return new FormGroup({
      senderMail: new FormControl({
        value: 'limon14203165@gmail.com',
        disabled: true
      }),
      receiverMail: new FormControl('', [
        Validators.required, Validators.email
      ]),
      subject: new FormControl('', [Validators.required]),
      content: new FormControl(''),
      // attachments: new FormControl('')

      attachments: new FormControl('')
    });
  }

  addFiles(): void {
    this.file.nativeElement.click();
  }
  sendEmail(): void {
    if (this.composeForm.valid) {
      const formData = new FormData();
      formData.append('senderMail', this.composeForm.get('senderMail').value);
      formData.append('receiverMail', this.composeForm.get('receiverMail').value);
      formData.append('subject', this.composeForm.get('subject').value);
      formData.append('content', this.composeForm.get('content').value);
      for (let i = 0; i < this.attachment.length; i++) {

        formData.append('attachments', this.attachment[i]);
      }

      this.mailService.SendMail(formData).subscribe(res => {
        console.log('Mail send successfully', res);
        this.matDialogRef.close(null);
      }, err => {
        console.log('error occoured');
        console.log(this.mail);
      });
    }
  }
  closeDialog(): void {
    this.matDialogRef.close(null);
  }

  // Single files added
  /*
    onFilesAdded(event): void {
      // const files = event.target.files[0];
      // this.attachment = files;
      // this.composeForm.get('attachments').setValue(files);
      for (let i = 0; i < event.target.files.length; i++) {
        this.attachment.push(event.target.files[i]);
      }
    }*/

  onFilesAdded(event): void {
    const files = event.target.files;
    console.log(files);

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const showfile = {
          name: '',
          type: '',
          size: '',
          url: ''
        };
        this.attachment.push(files[i]);
        showfile.name = files[i].name;
        showfile.type = files[i].type;
        showfile.size = files[i].size;
        const reader = new FileReader();
        reader.onload = (filedata) => {
          showfile.url = reader.result + '';
          this.showfiles.push(showfile);
        };
        reader.readAsDataURL(files[i]);
      }
      event.srcElement.value = null;
    }
  }

  deleteAttachment(file: any): void {
    const index = this.showfiles.indexOf(file);
    this.showfiles.splice(index, 1);
    this.attachment.splice(index, 1);
  }
}
