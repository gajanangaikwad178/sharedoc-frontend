import { Component } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { UserAccountService } from 'src/app/services/user-account.service';
import Swal from 'sweetalert2';


export function panCardNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const panCardRegex = /^[A-Z]{5}\d{4}[A-Z]$/;
    if (control.value && !panCardRegex.test(control.value)) {
      return { invalidPanCardNumber: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-employee-joining-form',
  templateUrl: './employee-joining-form.component.html',
  styleUrls: ['./employee-joining-form.component.css']
})
export class EmployeeJoiningFormComponent {


  activeTab: string = ''
  employeeForm!: FormGroup;
 // employeeForm1!: FormGroup;
  addFormCertificate!: FormGroup;
  employee: any[] = [];
  pdfUrl!: string;
  pdfUrlx = '';
  showPdf = false;
  myFile!: Observable<any>;
  event: any;
  selectedFile!: File;
  employeeId: any;
  searchText: any;
  filter: any;
  filterText: string=''
  folderName2: any[] = [];
  showViewer: Boolean = false;

  constructor(private dialog: MatDialog, private accountService : UserAccountService, private formBuilder: FormBuilder, private route: ActivatedRoute, private modalservice: NgbModal, private sant: DomSanitizer) { }

  ngOnInit(): void {
    this.getEmployeeDetails();
    this.employeeForm = this.formBuilder.group({

      employeeId: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Z0-9]{3,}$/)]],
      fullName: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[A-Za-z@.-]+[A-Za-z@.-\\s]*$')]],
      emailId: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      correspondenceAddress: [''],
      permanentAddress: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[A-Za-z@.-]+[A-Za-z@.-\\s]*$')]],
      panCardNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), panCardNumberValidator()]],
      documentName: [''],
      file: ['']

    });

    // this.employeeForm1 = this.formBuilder.group({

    //   employeeId: [''],
    //   fullName: [''],
    //   documentName: [''],
    //   file: [''],

    // });
  }

  getEmployeeDetails() {
    this.accountService.getEmployeeDetails().subscribe((users: any[]) => {
      this.employee = users;
      this.employeeId = this.employee[0].employeeId;
      console.log("employeeId", this.employeeId);

    }
    )
  }

  showTab(tab: string): void {
    this.activeTab = tab;
  }

  get profileVal() {
    return this.employeeForm.controls;
  }

  addEmployeePersonalDtls() {
    debugger
    console.log('employeeForm', this.employeeForm.value)
    if (this.employeeForm.valid) {
      console.log('Form is valid. Submitting...');
      this.accountService.addEmployeePersonalDtls(this.employeeForm.value).subscribe(
        (data) => {
          if (data.status == true) {
            Swal.fire("Employee Personal Details added successfully!");
            console.log("Data added successfully", data);
            this.employeeForm.reset();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Adding employee personal data failed!',
            });
          }
        },
        (error) => {
          console.error("Error creating in employeePersonalDetails", error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error creating in employeePersonalDetails',
          });
        }
      );
    } else {
      console.log('Form is not valid. Please check for validation errors.');
      Object.keys(this.employeeForm.controls).forEach((key) => {
        this.employeeForm.get(key)?.markAsTouched();
      });
    }
  }

  onChange = ($event: Event) => {
    const targat = $event.target as HTMLInputElement;
    const file: File = (targat.files as FileList)[0];
    console.log(file)

    this.convertToBase64(file)
  }

  convertToBase64(event: any): Promise<any> {
    let file = event.target.files[0];
    this.event = event;
    debugger
    this.employeeForm.patchValue
    const reader = new FileReader();
    const future = new Promise((resolve, reject) => {
      reader.addEventListener('load', function () {
        resolve(reader.result);
      }, false);
      reader.addEventListener('error', function (event) {
        reject(event);
      }, false);

      reader.readAsDataURL(file);
    });
    console.log(" base 64 file", future);
    return future;
  }

  uploadCertificatePdf(formValue: any) {
    debugger
    console.log("form value", formValue);
    console.log("event", this.event);
    this.convertToBase64(this.event)
      .then((data) => {
        console.log("data", data);
        const formObj = {
          employeeId: formValue.employeeId,
          documentName: formValue.documentName,
          fullName: formValue.fullName,
          file: data
        };
        console.log("form object", formObj);
        this.accountService.uploadCertificatePdf(formObj).subscribe(data => {
          debugger
          console.log(data);
          if (data.message === "file uploaded") {
            // alert('Bulk user uploaded')
            Swal.fire('file uploaded!');
             this.getEmployeeDetails();
             this.closeModal();
          } else {
            alert('Error uploading employee certificate')
          }
        })
      }
      );
  }

  closeModal(){
    this.employeeForm.reset();
    this.employeeId = null;
  }
  
  get filteredEmployeesByEmployeeId() {
    return this.employee.filter(
      (employee) =>
        employee.employeeId.toLowerCase().includes(this.filterText.toLowerCase()),
    );
  }

  onFilterChange(event: Event) {
    this.searchText = (event.target as HTMLInputElement).value;
  }

  selectEmployee(employee: any) {
    this.selectEmployee = employee;
    this.employeeForm.patchValue({ employeeId: employee.employeeId });
  }


  viewPdf(employeeId: any, documentName: any) {
    console.log('employeeId', employeeId);
    console.log('documentName', documentName);

    this.accountService.viewEmployeeDetails(employeeId, documentName).subscribe(response => {
      // console.log("response", response)
      // const foldername = employeeId;
      // const folderName1 = documentName;
      // this.folderName2 = response;
      // console.log("folderName2", this.folderName2);

      if (response[0].file) {
        this.showPdf = true;
        this.showViewer = true;
        this.pdfUrl = response[0].dataURI;

        console.log("pdfURl", this.pdfUrlx)
        //this.modalservice.open(this.popupview,{size:'1g'})
      }

    }, error => {
      Swal.fire({
        icon: 'error',
        text: 'employee Details not viewed',
      });
    }
    );
  }
  reset(){
    this.employeeForm.reset();
  }

  onInput(event: Event) {
    let input = (<HTMLInputElement>event.target).value;
    if (input.length > 10) {
      (<HTMLInputElement>event.target).value = input.slice(0, 10);
      this.employeeForm.controls['mobileNumber'].setValue(input.slice(0, 10));
    }
  }
}
