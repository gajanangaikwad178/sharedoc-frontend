import { HttpClient } from '@angular/common/http';
import { Component, signal, ChangeDetectorRef, OnInit,  ViewEncapsulation} from '@angular/core';
import { CalendarOptions, EventApi, DayCellMountArg } from '@fullcalendar/core';
import { UserAccountService } from 'src/app/services/user-account.service';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit{
  ​
    calendarVisible = signal(true);
    calendarOptions!: CalendarOptions;
    currentEvents = signal<EventApi[]>([]);
    holidays: Date[] = []
    leavesData: any[] = [];
    startDate: any[] = [];
    endDate: any[] = [];
    status: string[] = [];
  ​
    constructor(private changeDetector: ChangeDetectorRef, private accountService : UserAccountService, private httpClient: HttpClient) {
    }
  ​
    ngOnInit(): void {
      this.accountService.getAllLeavesList().subscribe((data: any) => {
        this.leavesData = data;
      });
      this.accountService.getHolidayList().subscribe((data: any) => {
        this.holidays = (data as any[]).map((item: any) => new Date(item.date));
      });
      this.calendarOptions = {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        weekends: true,
        events: this.leavesData,
        dayCellDidMount: this.customizeDayCell.bind(this)
      };
    }
  ​
    customizeDayCell(arg: DayCellMountArg) {
      const date = arg.date;
      const isHoliday = this.isHoliday(date);
      if (isHoliday) {
        arg.el.style.background = '#FF0000';
      }
      const currentDate = new Date(arg.date);
      currentDate.setHours(0, 0, 0, 0);
      this.leavesData.forEach((leave) => {
        if (leave.startDate && leave.endDate) {
          const leaveStartDate = new Date(leave.startDate);
          const leaveEndDate = new Date(leave.endDate);
          leaveStartDate.setHours(0, 0, 0, 0);
          leaveEndDate.setHours(0, 0, 0, 0);
          if (leave.status === 'pending' && currentDate >= leaveStartDate && currentDate <= leaveEndDate) {
            arg.el.style.backgroundColor = 'yellow';
          } else if (leave.status === 'approved' && currentDate >= leaveStartDate && currentDate <= leaveEndDate) {
            arg.el.style.backgroundColor = 'green';
          }
        }
      });
    }
  ​
    isHoliday(date: Date): boolean {
      return this.holidays.some((holiday) => this.isSameDate(holiday, date));
    }
  ​
    isSameDate(date1: Date, date2: Date): boolean {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    }
  }