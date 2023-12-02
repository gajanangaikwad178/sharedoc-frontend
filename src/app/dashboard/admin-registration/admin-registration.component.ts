import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs';
import { UserAccountService } from 'src/app/services/user-account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.css']
})
export class AdminRegistrationComponent {

  signUpForm!: FormGroup;
  submitted = false;
  loading = false;
  loginSuccess = false;
  companies: any[] = [];

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private router: Router,private accountService: UserAccountService,
  private modalservice: NgbModal
  ){
    
  }
  ngOnInit() {

    this.signUpForm = this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[A-Za-z@.\- ]*$/)]],
      userId: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]*$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/)
      ]],
      emailaddress: ['', [Validators.required, Validators.email, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      gender: ['', Validators.required],
      companyId: ['', Validators.required],
    });
  }

  get signupVal() {
    return this.signUpForm.controls;
  }

  // GET COMPANY LIST WITH COMPANY ID AND COMPANY NAME
  getAllCompanyList() {
    this.accountService.getAllCompanyList().subscribe(users => {
      this.companies = users;
    },
      error => alert("Faild to featch users"))
  }

  // onUserSignUp() {
  //   this.submitted = true;
  //   // stop here if form is invalid
  //   // if (this.signUpForm.invalid) {
  //   //   return;
  //   // }

  //   if (this.signUpForm.valid) {
  //     console.log(this.signUpForm);
  //     this.loading = true;
  //     debugger
  //     this.accountService.userRegister(this.signupVal['fullname'].value, this.signupVal['userId'].value, this.signupVal['password'].value, this.signupVal['emailaddress'].value, this.signupVal['phone'].value, this.signupVal['gender'].value, this.signupVal['companyId'].value)
  //       .pipe(first())
  //       .subscribe({
  //         next: (response) => {
  //           debugger
  //           const message = this.extractMessageFromResponse(response);
  //           Swal.fire(message);
  //           if (message === 'You are successfully registered') {
  //             this.loginSuccess = true;
  //             // this.showLogin();
  //             Swal.fire(message);
  //             this.signUpForm.reset();
              
  //           } else {
  //             Swal.fire({
  //               icon: 'error',
  //               title: 'Error ',
  //               text: message,
  //             });
  //           }
  //         },
  //         error: error => {

  //         }
  //       });
  //   } else {

  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error ',
  //       text: 'Please fill correct form!',
  //     });
  //   }

  // }

  extractMessageFromResponse(response: any): string {
    if (response && response.message) {
      return response.message;
    } else {
      return response.message;
    }
  }
}
