import { Component } from '@angular/core';
import { UserAccountService } from 'src/app/services/user-account.service';

@Component({
  selector: 'app-user-upcoming-holiday',
  templateUrl: './user-upcoming-holiday.component.html',
  styleUrls: ['./user-upcoming-holiday.component.css']
})
export class UserUpcomingHolidayComponent {
  holidays: any[] = [];

  constructor(private accountService: UserAccountService) { }

  ngOnInit(): void {
    this.getUpcomingHolidays()
  }

  getUpcomingHolidays() {
    this.accountService.getUpcomingHolidays().subscribe(holidays => {
      this.holidays = holidays;
    },
      error => {
        console.error('failed to fetch holidays', error);
      }
    );
  }
  
}
