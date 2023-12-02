import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserAccountService } from '../services/user-account.service';
import Swal from 'sweetalert2';
import { er } from '@fullcalendar/core/internal-common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { User } from 'src/user';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  loginForm!: FormGroup;
  signUpForm!: FormGroup;
  userSignUpForm!: FormGroup;
  companies: any[] | undefined;
  loginSuccess = false;
  // user:User = new User
  userLoggedDataValue: any;
  userIdValue: any;
  companyName:any;
  enteredCaptcha!: string;
  captchaCode!: string;
  captchaInput = '';
  role: any;
  // signUpForm!: FormGroup;
  isSignupFormValid: boolean = false;
  showPassword: boolean = false;
  loginData: any;
  userId!: string;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: UserAccountService,
    private modalservice: NgbModal
  ) {
    // this.signUpForm = this.formBuilder.group({
    //   'fullname': ['', Validators.required],
    //   'emailaddress': ['', Validators.required],
    //   'phone': ['', Validators.required],
    //   'password': ['', Validators.required],
    //   'gender': ['', Validators.required],
    //   'role': ['', Validators.required],
    //   'userId': ['', Validators.required]
    // })
  }

  ngAfterViewInit(): void {
    this.generateCaptcha();
  }

  @ViewChild('content') popupview !: ElementRef;

  viewTermsAndConditions() {
    this.modalservice.open(this.popupview, { size: 'lg' });
  }

  ngOnInit() {
    this.getAllCompany()
    // this.captchaCode = this.getCaptchaCode();

    this.loginForm = this.formBuilder.group({
      emailaddress: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.signUpForm = this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Za-z@.\- ]*$/)]],
      // userId: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]*$/)]],
      // password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/)
      // ]],
      emailaddress: ['', [Validators.required, Validators.email, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      // gender: ['', Validators.required],
      // role: ['', Validators.required],
      address:['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[A-Za-z@.\- ]*$/)]],
      checkbox: ['', Validators.requiredTrue]
    });

    this.userSignUpForm = this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[A-Za-z@.\- ]*$/)]],
      userId: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]*$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/)
      ]],
      emailaddress: ['', [Validators.required, Validators.email, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      gender: ['', Validators.required],
      companyId: ['', Validators.required],
      role: ['', Validators.required],
    });
    // this.generateCaptcha();

    //   this.signUpForm.valueChanges.subscribe(() => {
    //   this.isSignupFormValid = this.signUpForm.valid;
    // });

  }

  recoverPwd: boolean = false;
  login: boolean = true;
  signUp: boolean = false;
  userSignUp: boolean = false;

  showRecoveryPWDForm() {
    this.recoverPwd = true
    this.login = false;
    this.signUp = false;
    this.userSignUp = false;
  }

  showSignUp() {
    this.signUp = true;
    this.recoverPwd = false
    this.login = false;
    this.userSignUp = false;
  }

  showLogin() {
    location.reload()
    this.login = true;
    this.recoverPwd = false
    this.signUp = false;
    this.userSignUp = false;
  }
  userShowSignUp() {
    this.userSignUp = true;
    this.signUp = false;
    this.recoverPwd = false
    this.login = false;
    
  }
  get f() { return this.loginForm.controls; }

  get signupVal() {
    return this.signUpForm.controls;
  }

  get usersignupVal() {
    return this.userSignUpForm.controls;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    debugger
    // if (this.enteredCaptcha !== this.captchaCode) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Invalid CAPTCHA',
    //     text: 'Please enter the correct CAPTCHA code.',
    //   });
    //   this.generateCaptcha();
    //   return;
    // }

    this.submitted = true;
    debugger
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      Swal.fire({
        icon: 'error',
        // title: 'Enter valid Credentials ',
        text: 'Please enter userId and Password.',
      });
      return;
    }
    debugger
    this.loading = true;
    this.accountService.login(this.f['emailaddress'].value, this.f['password'].value).pipe(first()).subscribe({
      next: (response) => {
debugger
        this.loginData = response;
        console.log(this.loginData);
        if(this.loginData.Status === 'true'){
          // const Logintoken = this.loginData.token;
          // localStorage.setItem('token', Logintoken);
          // const token = localStorage.getItem('token');
          // if(token){
            // const decodedToken = jwt_decode(token);
          // if (decodedToken) {
          //     const userId = decodedToken.sub;
          //     debugger
          //     const role = decodedToken.role;
          //     console.log(userId,role);

            this.userLoggedDataValue = JSON.stringify(this.loginData);
            localStorage.setItem('userloggedData', JSON.stringify(this.loginData));
            this.userIdValue = this.loginData.userId;
            console.log('userId',this.userIdValue);
            this.companyName = this.loginData.userCompanyName;
            console.log('Company name', this.companyName);
            localStorage.setItem('userId', this.userIdValue);
            localStorage.setItem('companyName', this.companyName);
            this.role = 'USER';
              const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
              this.router.navigateByUrl(returnUrl);
          // }
        // }
          
        // }
        
        console.log('Response', this.loginData);
        debugger
        // if(this.loginData.status == true){
          localStorage.setItem('isLoggedIn', String(true));
          Swal.fire('Login Sucessfully.');
          // this.accountService.loggedUserId(this.f['emailaddress'].value).subscribe(userloggedData => {
          //   console.log("userloggedData", userloggedData);
          //   this.userLoggedDataValue = JSON.stringify(userloggedData);
          //   console.log("id after login", userloggedData);
          //   localStorage.setItem('userloggedData', JSON.stringify(userloggedData));
          //   this.userIdValue = userloggedData.userId;
          //   localStorage.setItem('userId', userloggedData.userId);
          //   console.log("userIdValue", this.userLoggedDataValue);

          //   this.role = userloggedData.role;
          //   console.log(this.role);
          //   const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
          //   this.router.navigateByUrl(returnUrl);
          // })
        } 
      else{
          {
            Swal.fire({
              icon: 'error',
              title: 'Error ',
              text: 'Enter correct password.',
            });
            this.loading = false;
          }
        }
        },
        error: error => {
          Swal.fire({
            icon: 'error',
            title: 'Error ',
            text: 'User not found.',
          });
          this.loading = false;
        }
      });
  }

  getCaptchaCode(): string {
    
    return this.captchaCode;
  }

  setCaptchaCode(code: string): void {
    this.captchaCode = code;
  }

  onSignUpSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    // if (this.signUpForm.invalid) {
    //   return;
    // }

    if (this.signUpForm.valid) {
      this.loading = true;
      this.accountService.companyOnBoard(this.signupVal['fullname'].value, this.signupVal['address'].value, this.signupVal['emailaddress'].value, this.signupVal['phone'].value)
        .pipe(first())
        .subscribe({
          next: (response) => {
            debugger
            const message = this.extractMessageFromResponse(response);
            console.log(message);
            if (message === 'Company Onboarding is successfully done.') {
              this.loginSuccess = true;
              Swal.fire({
                text: message,
                icon: 'success'
              }).then(() => {
                this.showLogin();
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error ',
                text: message,
              });
            }
          },
          error: error => {

          }
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error ',
        text: 'Please fill correct form!',
      });
    }

  }

  extractMessageFromResponse(response: any): string {
    if (response && response.message) {
      return response.message;
    } else {
      return response.message;
    }
  }

  refreshCaptcha() {
    this.generateCaptcha();
  }

  generateCaptcha() {
    const canvas: HTMLCanvasElement = document.getElementById('captcha') as HTMLCanvasElement;
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (context === null) {
      console.error('Could not get rendering context for captcha canvas.');
      return;
    }
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    const startAngle = -45;
    const endAngle = 45;
    const angleRange = endAngle - startAngle;
    const fontSizeMin = 20;
    const fontSizeMax = 30;
    const fontSizeRange = fontSizeMax - fontSizeMin;
    for (let i = 0; i < 6; i++) {
      const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
      captcha += randomChar;
      const fontSize = fontSizeMin + Math.random() * fontSizeRange;
      const textColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
      context.font = `${fontSize}px Arial`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillStyle = textColor;
      const angle = startAngle + Math.random() * angleRange;
      context.translate(20 + i * 30, canvas.height / 2);
      context.rotate((angle * Math.PI) / 180);
      context.fillText(randomChar, 0, 0);
      context.rotate((-angle * Math.PI) / 180);
      context.translate(-(20 + i * 30), -canvas.height / 2);
    }
    this.captchaCode = captcha;
    this.captchaInput = '';
    this.setCaptchaCode(captcha);
  }




  onUserSignUp() {
    this.submitted = true;
    // stop here if form is invalid
    // if (this.signUpForm.invalid) {
    //   return;
    // }

    if (this.userSignUpForm.valid) {
      console.log(this.userSignUpForm);
      this.loading = true;
      debugger
      this.accountService.userRegister(this.usersignupVal['fullname'].value, this.usersignupVal['userId'].value, this.usersignupVal['password'].value, this.usersignupVal['emailaddress'].value, this.usersignupVal['phone'].value, this.usersignupVal['gender'].value,this.usersignupVal['role'].value, this.usersignupVal['companyId'].value)
        .pipe(first())
        .subscribe({
          next: (response) => {
            debugger
            const message = this.extractMessageFromResponse(response);
            Swal.fire(message);
            if (message === 'You are successfully registered') {
              this.loginSuccess = true;
              Swal.fire({
                text: message,
                icon: 'success'
              }).then(() => {
                this.showLogin();
              });
              // this.signUpForm.reset();
              
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error ',
                text: message,
              });
            }
          },
          error: error => {

          }
        });
    } else {

      Swal.fire({
        icon: 'error',
        title: 'Error ',
        text: 'Please fill correct form!',
      });
    }

  }

  getAllCompany() {
    this.accountService.getAllCompanyList().subscribe((users:any) => {
      debugger
      this.companies = users.Content;
      console.log( this.companies);
    },
      error => alert("Faild to featch users"))
  }
}


