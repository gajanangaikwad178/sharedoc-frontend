
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserAccountService } from 'src/app/services/user-account.service';

interface SignInSignOutResponse {
  date: string;
  inTime: string;
  outTime: string;
}

@Component({
  selector: 'app-employee-calendar',
  templateUrl: './employee-calendar.component.html',
  styleUrls: ['./employee-calendar.component.css'],
  providers: [DatePipe]
})
export class EmployeeCalendarComponent implements OnInit {

  holidayList: any;
  userArray!: string | null;
  userId: any;
  // inTimeOutTime: any;
  inTimeOutTime: any[] = [];

  constructor(private accountService: UserAccountService, private datePipe: DatePipe) { }

  allMonths: any = [
    { name: 'January', days: [] },
    { name: 'February', days: [] },
    { name: 'March', days: [] },
    { name: 'April', days: [] },
    { name: 'May', days: [] },
    { name: 'June', days: [] },
    { name: 'July', days: [] },
    { name: 'August', days: [] },
    { name: 'September', days: [] },
    { name: 'October', days: [] },
    { name: 'November', days: [] },
    { name: 'December', days: [] }
  ];
  currentDate: any = new Date();
  currentYear: any = +this.currentDate.getFullYear();
  totalDays!: any;
  datesArr: any = [];
  showList = false;
  status: any;
  month: any;
  selDate!: string;
  monthsArr!: any[];
  istrue: boolean = false;
  hasInOutTime: boolean = false;

  ngOnInit(): void {

    this.getDays();
    this.getmonthDays();

    this.accountService.getHolidayList().subscribe((holidayDates: any) => {
      console.log("Holiday Dates", holidayDates);
      this.holidayList = holidayDates;
    });

    this.userArray = localStorage.getItem('userId');
    console.log("userArray", this.userArray)
    this.userId = this.userArray;
    this.accountService.getSignInSignOut(this.userId).subscribe(
      (signInSignOutResponse: SignInSignOutResponse[]) => {
        console.log("Received Response from api", signInSignOutResponse)
        this.inTimeOutTime = signInSignOutResponse.map((item: SignInSignOutResponse) => {
          const inTimeParts = item.inTime ? item.inTime.split(':') : [];
          const outTimeParts = item.outTime ? item.outTime.split(':') : [];

          const inTime = new Date(this.currentYear, this.getMonthFromDate(item.date), this.getDayFromDate(item.date), +inTimeParts[0], +inTimeParts[1], +inTimeParts[2]);
          const outTime = new Date(this.currentYear, this.getMonthFromDate(item.date), this.getDayFromDate(item.date), +outTimeParts[0], +outTimeParts[1], +outTimeParts[2]);

          const totalHours = this.calculateTimeDifference(inTime, outTime);
          console.log("Total Hours for", item.date, ":", totalHours);

          // Check if totalHours is greater than or equal to 9
          const backgroundColor = totalHours >= 9 ? '#99FF99' : '';
          console.log("Background Color:", backgroundColor);

          return {
            date: item.date,
            inTime: inTime,
            outTime: outTime,
            totalHours: totalHours,
            backgroundColor: backgroundColor
          };
        });
      },
      (error: any) => {
        console.error("API error", error);
        this.inTimeOutTime = [];
      }
    );
  }

  getDays() {
    for (let i = 1; i <= 31; i++) {
      this.datesArr.push(i);
    }
  }

  getmonthDays() {
    for (let i = 0; i < this.allMonths.length; i++) {
      this.month = this.allMonths[i];
      this.totalDays = new Date(this.currentYear, i + 1, 0).getDate();
      console.log("Month total days", this.totalDays);
      this.month.date = Array.from({ length: this.totalDays }, (_, j) => (j + 1).toString());
      const updatedDays = [];
      for (let k = 0; k < this.month.date.length; k++) {
        let d = this.datePipe.transform(new Date(this.currentYear, i, k + 1), "EEE dd-MM-yyyy");
        updatedDays.push(d);
      }
      this.month.days = updatedDays;
      console.log("Month total date with days in array:", this.month);
    }
  }

  getMonthFromDate(dateString: string): number {
    const dateParts = dateString.split('-');
    return +dateParts[1] - 1; // Months are zero-based in JavaScript Date object
  }

  getDayFromDate(dateString: string): number {
    const dateParts = dateString.split('-');
    return +dateParts[2];
  }

  convertDateString(inputDate: string): string {
    const dateParts = inputDate.split(' '); // Split the input string into parts
    const date = dateParts[1].split('-'); // ["01", "01", "2023"]
    const day = date[0].padStart(2, '0'); // "01"
    const month = date[1].padStart(2, '0'); // "01"
    const year = date[2]; // "2023"
    const formattedDate = `${year}-${month}-${day}`; // Format the date manually into the desired "YYYY-MM-DD" format
    return formattedDate;
  }

  calculateTimeDifference(startDate: Date, endDate: Date): number {
    const diffInMilliseconds = Math.abs(endDate.getTime() - startDate.getTime());
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
    console.log("Total hours:", diffInHours); // Add this line
    return diffInHours;
  }

  dayColor(day: any) {
    if (!this.holidayList) {
      return {}; // Return default style if holidayList is not initialized
    }

    // Check if the day has inTime and outTime present in the API response
    const matchingDay = this.inTimeOutTime.find((data: any) => data.date === this.convertDateString(day));

    if (matchingDay) {
      return { 'background-color': matchingDay.backgroundColor }; // Use precalculated background color
    }

    // Check for holidays and weekends
    this.istrue = this.holidayList.some((holiday: any) => holiday.date === this.convertDateString(day));
    if (this.istrue) {
      return { 'background-color': '#ECEC90' }; // Yellow color for holidays
    }
    if (day.includes("Sat") || day.includes("Sun")) {
      return { 'background-color': (day.includes("Sat") || day.includes("Sun") || this.status == 'GovtHday') ? '#CCE5FF' : 'smokewhite' }; // Blue color for weekends, light blue for GovtHday
    }
    return {}; // Default style for other dates
  }

  nextYear() {
    this.month = '';
    this.currentYear += 1;
    this.getmonthDays();
  }

  prevYear() {
    this.currentYear -= 1;
    this.getmonthDays();
    this.month = '';
  }

  toggleList(event: MouseEvent) {
    event.stopPropagation();
    this.showList = !this.showList;
  }

  selectValue(day: any, value: string) {
    this.status = value;
    this.showList = !false;
    this.selDate = day.concat(value);
    console.log("present date", this.selDate);
    this.month.days[day.slice(4, 6) - 1] = this.selDate;
    console.log("month of daay", this.month);
  }

}