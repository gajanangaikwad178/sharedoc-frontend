import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserAccountService } from 'src/app/services/user-account.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-payment-slip',
  templateUrl: './user-payment-slip.component.html',
  styleUrls: ['./user-payment-slip.component.css']
})
export class UserPaymentSlipComponent {

  user:User = new User
  month: any;
  months: String[] = ['January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'];
  year: any;
  years: number[] = [];
  userId: any
  filePath = '';
  name: any;
  currentYear: any;
  paymentStatus: Boolean = true;
  showViewer: Boolean = false;

  constructor(private accountService: UserAccountService,private router: Router) {
    this.currentYear = new Date().getFullYear();
    console.log('currentYear', this.currentYear)
    const startYear = this.currentYear - 100; // Change the range as per your requirement
    for (let year = this.currentYear; year >= startYear; year--) {
      this.years.push(year);
    }
   }

   ngOnInit(): void {
    const userobject = localStorage.getItem('userloggedData');
    if (userobject) {
      const uservalue = JSON.parse(userobject);
      this.name = uservalue?.name;
      this.userId = localStorage.getItem('userId');
    }
  }

  selectMonth(event: any) {
    this.month = event.target.value;
  }

  selectYear(event: any) {
    debugger
    this.year = event.target.value;
  }

  downloadPaymentSlip() {
    var json = {
      "userId": this.userId,
      "month": this.month,
      "year": this.year
    }
    this.accountService.getPaymentSlip(json)
      .pipe(first())
      .subscribe(response =>{
        debugger
        if (response[0].message === "Payment slip not available") {
          alert('Payment slip not available')
        } else {
          if (response[0].dataURI !== null) {
            this.filePath = response[0].dataURI;
            if (this.filePath !== null) {
              this.paymentStatus = false
            }
          }
        }
      })
  }

  ViewPdf(): void {
      this.showViewer = true;
  }
}
