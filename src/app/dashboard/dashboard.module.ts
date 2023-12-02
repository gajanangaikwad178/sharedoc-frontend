import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { DashboardHomeComponent } from './dashboard-home.component';
import { BasicFormComponent } from './basic-form/basic-form.component';
import { TaskDetailsComponent } from './task/task-details.component';
import { TaskListComponent } from './task/task-list.componenet';
import { TaskKanbanBoardComponent } from './task-kanban-board/task-kanban-board.component';
import { FormWizardComponent } from './form-wizard/form-wizard.component';
import {RegisterCandidateComponent} from './register-candidate/register-candidate.component'
import { UploadsalarySlipsComponent } from './uploadsalary-slips/uploadsalary-slips.component';
import { UploadHolidaysComponent } from './upload-holidays/upload-holidays.component';
import { FormsModule } from '@angular/forms';
import { AddLeavesComponent } from './add-leaves/add-leaves.component';
import { UploadForm16Component } from './upload-form16/upload-form16.component';
import { InvestmentDeclarationUploadByAdminComponent } from './investment-declaration-upload-by-admin/investment-declaration-upload-by-admin.component';
import { BulkEmployeeRegistrationComponent } from './bulk-employee-registration/bulk-employee-registration.component';
import { ExitFormByAdminComponent } from './exit-form-by-admin/exit-form-by-admin.component';
import { UploadEmployeeHierarchyComponent } from './upload-employee-hierarchy/upload-employee-hierarchy.component';
import { Form16ForUserComponent } from './form16-for-user/form16-for-user.component';
import { ApplayLeaveComponent } from './applay-leave/applay-leave.component';
import { UserBalanceLeaveComponent } from './user-balance-leave/user-balance-leave.component';
import { UserLeaveStatusComponent } from './user-leave-status/user-leave-status.component';
import { UserUpcomingHolidayComponent } from './user-upcoming-holiday/user-upcoming-holiday.component';
import { UserPaymentSlipComponent } from './user-payment-slip/user-payment-slip.component';
import { UserExitFormComponent } from './user-exit-form/user-exit-form.component';
import { UserInvestmentDeclarationComponent } from './user-investment-declaration/user-investment-declaration.component';
import { UserEmployeeHierarchyComponent } from './user-employee-hierarchy/user-employee-hierarchy.component';
import { UserPersonalDetailsComponent } from './user-personal-details/user-personal-details.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EmployeeCalendarComponent } from './employee-calendar/employee-calendar.component';
import { EmployeeLeaveComponent } from './employee-leave/employee-leave.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { UserAddTaskComponent } from './user-add-task/user-add-task.component';
import { EmployeeJoiningFormComponent } from './employee-joining-form/employee-joining-form.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AdminRegistrationComponent } from './admin-registration/admin-registration.component';
import { AdminFileUploadComponent } from './admin-file-upload/admin-file-upload.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { AdminFileDownloadComponent } from './admin-file-download/admin-file-download.component';
import { UserFileShareComponent } from './user-file-share/user-file-share.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UserFileDownloadComponent } from './user-file-download/user-file-download.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DashboardRoutingModule,
        FormsModule,
        FullCalendarModule,
        NgxExtendedPdfViewerModule,
        PdfViewerModule,
        NgMultiSelectDropDownModule.forRoot()
    ],
    declarations: [
        DashboardHomeComponent,
        TaskDetailsComponent,
        TaskListComponent,
        TaskKanbanBoardComponent,
        BasicFormComponent,
        FormWizardComponent,
        RegisterCandidateComponent,
        UploadsalarySlipsComponent,
        UploadHolidaysComponent,
        AddLeavesComponent,
        UploadForm16Component,
        InvestmentDeclarationUploadByAdminComponent,
        BulkEmployeeRegistrationComponent,
        ExitFormByAdminComponent,
        UploadEmployeeHierarchyComponent,
        Form16ForUserComponent,
        ApplayLeaveComponent,
        UserBalanceLeaveComponent,
        UserLeaveStatusComponent,
        UserUpcomingHolidayComponent,
        UserPaymentSlipComponent,
        UserExitFormComponent,
        UserInvestmentDeclarationComponent,
        UserEmployeeHierarchyComponent,
        UserPersonalDetailsComponent,
        CalendarComponent,
        EmployeeCalendarComponent,
        EmployeeLeaveComponent,
        AddTaskComponent,
        UserAddTaskComponent,
        EmployeeJoiningFormComponent,
        AdminRegistrationComponent,
        AdminFileUploadComponent,
        AdminListComponent,
        AdminUserListComponent,
        AdminFileDownloadComponent,
        UserFileShareComponent,
        UserFileDownloadComponent
    ]
})
export class DashboardModule { }