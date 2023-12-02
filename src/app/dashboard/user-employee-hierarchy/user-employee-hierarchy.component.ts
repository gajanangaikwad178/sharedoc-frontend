import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { UserAccountService } from 'src/app/services/user-account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-employee-hierarchy',
  templateUrl: './user-employee-hierarchy.component.html',
  styleUrls: ['./user-employee-hierarchy.component.css']
})
export class UserEmployeeHierarchyComponent {

  filePathemp: any;
  url:any
  filePath:any
  showViewer: Boolean = false;

  constructor(private accountService: UserAccountService, private router: Router) {
  }
  
  ngOnInit(): void {
    this.viewEmpHierarchyPDF();
  }

  viewEmpHierarchyPDF(): void {
    this.accountService.employeeHierarchyPDF()
      .pipe(first())
      .subscribe(response => {
     debugger
      if (response.dataURI !== null) {
        this.showViewer = true;
        this.filePathemp = response.dataURI;
        console.log('employee heirarchy', this.filePathemp);
      }else {
        Swal.fire({
              icon: 'error',
              title: 'Employee Hierarchy PDF Not Available',
              text: 'The employee hierarchy PDF has not been uploaded by the admin.',
            });
            }
    })

    // Check if the PDF file exists
    // this.checkPDFExistence(this.filePathemp)
    //   .then(exists => {
    //     if (exists) {
    //       // Open the PDF in a new tab
    //       this.showSuccessMessage();
    //     } else {
    //       // Display an error message using SweetAlert
    //       this.showErrorMessage();
    //     }
    //   })
    //   .catch(error => {
    //     console.error('Error checking PDF existence:', error);
    //     // Display an error message using SweetAlert
    //     this.showErrorMessage();
    //   });
  }

  // private checkPDFExistence(filePath: string): Promise<boolean> {
  //   return new Promise<boolean>((resolve, reject) => {
  //     // Create a new XMLHttpRequest to check if the PDF exists
  //     const xhr = new XMLHttpRequest();
  //     xhr.open('HEAD', filePath);
  //     xhr.onload = () => {
  //       resolve(xhr.status === 200);
  //     };
  //     xhr.onerror = () => {
  //       reject(new Error('Error while checking PDF existence'));
  //     };
  //     xhr.send();
  //   });
  // }

  // private showErrorMessage(): void {
  //   Swal.fire({
  //     icon: 'error',
  //     title: 'Employee Hierarchy PDF Not Available',
  //     text: 'The employee hierarchy PDF has not been uploaded by the admin.',
  //   });
  // }

  // private showSuccessMessage(): void {
  //   Swal.fire({
  //     icon: 'success',
  //     title: 'Employee Hierarchy PDF Available',
  //     text: 'You can view the employee hierarchy PDF.',
  //     confirmButtonText: 'OK',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.showViewer = true;
  //     }
  //   });
  // }

  // filePathemp: any;

  // ngOnInit(): void {
  //   this.viewEmpHierarchyPDF();
  // }
  // viewEmpHierarchyPDF(): void {
  //   this.filePathemp = `assets/employee_hierarchy/employee_hierarchy.pdf`;
  //   console.log('employee heirarchy', this.filePathemp);
  //   window.open(this.filePathemp, '_blank')
  //   // this.modalservice.open(this.popupview,{size:'lg'})
  // }
}