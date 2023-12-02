import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAccountService } from 'src/app/services/user-account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent {

  users: any[] = [];
  data1: any;
  adminPermission!: FormGroup;

  viewChange?: boolean;
  uploadChange?: boolean;
  downloadChange?: boolean;
  updateResponse: any;

  constructor(private accountService: UserAccountService, private formBuilder: FormBuilder) {
    this.adminPermission = this.formBuilder.group({
      userId: ['', Validators.required],
      view: [''],
      upload: [''],
      download: [''],
    });
  }

  ngOnInit(): void {
    this.getAllUserList();
  }

  getAllUserList() {
    debugger
    this.accountService.getAllUserList().subscribe(
      (users: any) => {
        debugger
        this.users = users.Content;
        this.data1 = users;
        console.log(this.users, " this.users ");
      },
      error => {
        Swal.fire({
          icon: 'error',
          text: 'Failed to fetch users',
        });
      }
    );
  }

  toggleViewPermission(user: any, view:any) {
    if(view !=true){
      view =true;
      this.viewChange = view;
      this.uploadChange = user.upload;
      this.downloadChange = user.download;
    }else{
      view = false;
      this.viewChange = view;
      this.uploadChange = user.upload;
      this.downloadChange = user.download;
    }
  }

  toggleUploadPermission(user: any, upload: any) {
    if(upload !=true){
      upload =true;
      this.uploadChange = upload;
      this.downloadChange = user.download;
      this.viewChange = user.view;
    }else{
      upload = false;
      this.uploadChange = upload;
      this.downloadChange = user.download;
      this.viewChange = user.view;
    }
  }

  toggleDownloadPermission(user: any, download: any) {
    if(download !=true){
      download =true;
      this.downloadChange = download;
      this.viewChange = user.view;
      this.uploadChange = user.upload;
    }else{
      download = false;
      this.downloadChange = download;
      this.viewChange = user.view;
      this.uploadChange = user.upload;
    }
  }

  submit(formValue: any, users: any) {
    console.log('Form Value:', formValue);
    debugger
    const updateRequest = {
      id: users.id,
      userId: users.userId,
      name: users.name,
      view: this.viewChange,
      upload: this.uploadChange,
      download: this.downloadChange,
      password: users.password,
      role: users.role,
      email: users.email,
      phone: users.phone,
      gender: users.gender
    }
    this.accountService.updateAdminPermission(updateRequest).subscribe(
      response => {
        debugger
        console.log(response);
        this.updateResponse = response;
        if (response) {
          Swal.fire(this.updateResponse.message);
          formValue.resetForm();
        } else {
          Swal.fire(this.updateResponse.message);
        }
      })
    // }
  }

}
