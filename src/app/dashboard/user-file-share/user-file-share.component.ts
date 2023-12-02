import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Dms } from 'src/app/models/dms';
import { UserAccountService } from 'src/app/services/user-account.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-file-share',
  templateUrl: './user-file-share.component.html',
  styleUrls: ['./user-file-share.component.css']
})
export class UserFileShareComponent {

  SalarySlips!: FormGroup;
  uploadPermissionsForm!: FormGroup;
  users: any[] = [];
  companies: any[] = [];
  file: any;
  userId: any
  companyName: any;
  selectedCompanies: string[] = [];
  dms: Dms = new Dms

  dropdownList = [];
  selectedItems: any[] = [];
  selectAllList = [];
  dropdownSettings!: IDropdownSettings;

  showUploadPopup = false;


  constructor(private accountService: UserAccountService, private formBuilder: FormBuilder, private http: HttpClient) {

  }

  ngOnInit(): void {
    const userobject = localStorage.getItem('userloggedData') || '';
    const uservalue = JSON.parse(userobject);
    // this.role = uservalue.Role;
    this.userId = localStorage.getItem('userId');
    this.companyName = localStorage.getItem('companyName');

    this.SalarySlips = this.formBuilder.group({
      file: [''],
      companies: [[]]
    });

    this.uploadPermissionsForm = this.formBuilder.group({
      viewCheckbox: [],
    printCheckbox: [],
    downloadCheckbox: [],
    endDate: [null]
    });
    // this.uploadPermissionsForm.addControl('viewCheckbox', this.formBuilder.control(false));
    // this.uploadPermissionsForm.addControl('printCheckbox', this.formBuilder.control(false));
    // this.uploadPermissionsForm.addControl('downloadCheckbox', this.formBuilder.control(false));
    this.getUserOfCompany()
    this.getUploadedDocumentList()

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'userId',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  openUploadPopup(): void {
    debugger
    this.showUploadPopup = true;
  }

  closeUploadPopup(): void {
    this.showUploadPopup = false;
  }

  onItemSelect(item: any) {
    console.log('Item:', item);
    if (Array.isArray(item)) {
      const selectedUserIds = item.map((user: any) => user.userId);
      console.log('Selected User IDs:', selectedUserIds);
      this.selectedItems = this.selectedItems.concat(selectedUserIds);
    } else if (item && typeof item === 'object') {
      const selectedUserIds = [item.userId];
      console.log('Selected User IDs:', selectedUserIds);
      this.selectedItems = this.selectedItems.concat(selectedUserIds);
    } else {
      console.error('Invalid item:', item);
    }
  }

  getUserOfCompany() {
    this.accountService.getUserOfCompany(this.companyName, this.userId).subscribe((users: any) => {
      debugger
      this.companies = users.Content;
      this.dropdownList = users.Content;
      console.log(this.companies);
    },
      error => alert("Faild to featch users"))
  }

  OnChangeFileField(event: any) {

    this.file = event.target.files[0]
    this.dms.fileName = this.file.name;
    // this.dms.adminId= this.userId;

    console.log(this.file);
    console.log('file name', this.dms.fileName);
  }

  userNameSelect(event: any) {
    debugger
    console.log(event["name"], event);
  }

  submitFile() {
    const selectedCompanies = this.SalarySlips.value;
    // console.log('selected_Items:', this.selectedItems);
    // console.log('CompaniesItems:', selectedCompanies);

    const formData = new FormData();
    // this.dms.fileShareWithUsers = this.selectedItems;
    this.dms.uploadedBy = this.userId;
    formData.append('file ', this.file);
    formData.append('model', JSON.stringify(this.dms));

    console.log('Form Data', formData);
    debugger
    this.accountService.fileUplaodAndShare(formData).subscribe(
      response => {
        debugger
        console.log(response);
      this.selectedItems = [];
      Swal.fire({
        text: 'File uploaded successfully.',
      }).then((result) => {
        // Check if the popup was closed
        if (result.isConfirmed || result.isDismissed) {
          // Reload the page after the user clicks on the success popup or closes it
          window.location.reload();
        }
      });
      }, error => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          text: 'Error uploading file',
        });
      }
    );
  }



  getUploadedDocumentList() {
    debugger
    this.accountService.getUploadedDocumentList(this.companyName).subscribe(
      (users: any) => {
        debugger
        this.users = users.Content;
        // this.data1 = users;
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


  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  viewToggleCheckboxValue(): void {
    const viewCheckboxControl = this.uploadPermissionsForm.get('viewCheckbox');
    if (viewCheckboxControl) {
      viewCheckboxControl.setValue(!viewCheckboxControl.value);
    }
  }

  printToggleCheckboxValue(): void {
    const printCheckboxControl = this.uploadPermissionsForm.get('printCheckbox');
    if (printCheckboxControl) {
      printCheckboxControl.setValue(!printCheckboxControl.value);
    }
  }
  
  downloadToggleCheckboxValue(): void {
    const downloadCheckboxControl = this.uploadPermissionsForm.get('downloadCheckbox');
    if (downloadCheckboxControl) {
      downloadCheckboxControl.setValue(!downloadCheckboxControl.value);
    }
  }

  submitFilePermission(form:any) {
    const selectedCompanies = form.value;
    debugger
    console.log(selectedCompanies);
    console.log(this.uploadPermissionsForm);
  }
}
