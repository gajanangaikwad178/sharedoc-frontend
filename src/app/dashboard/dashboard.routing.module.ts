import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { BasicFormComponent } from './basic-form/basic-form.component';
import { DashboardHomeComponent } from './dashboard-home.component';
import { TaskDetailsComponent } from './task/task-details.component';
import { TaskListComponent } from './task/task-list.componenet';
import { TaskKanbanBoardComponent } from './task-kanban-board/task-kanban-board.component';
import { FormWizardComponent } from './form-wizard/form-wizard.component';
import { RegisterCandidateComponent } from './register-candidate/register-candidate.component';
import { UploadsalarySlipsComponent } from './uploadsalary-slips/uploadsalary-slips.component';
import { UploadHolidaysComponent } from './upload-holidays/upload-holidays.component';
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
import { EmployeeCalendarComponent } from './employee-calendar/employee-calendar.component';
import { EmployeeLeaveComponent } from './employee-leave/employee-leave.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { UserAddTaskComponent } from './user-add-task/user-add-task.component';
import { EmployeeJoiningFormComponent } from './employee-joining-form/employee-joining-form.component';
import { AdminRegistrationComponent } from './admin-registration/admin-registration.component';
import { AdminFileUploadComponent } from './admin-file-upload/admin-file-upload.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { AdminFileDownloadComponent } from './admin-file-download/admin-file-download.component';
import { UserFileShareComponent } from './user-file-share/user-file-share.component';
import { UserFileDownloadComponent } from './user-file-download/user-file-download.component';


const routes: Routes = [
    {
        path: '', component: DashboardComponent,
        
        children: [
            { path: '', component: DashboardHomeComponent },
            { path: 'task-details', component: TaskDetailsComponent },
            { path: 'task-list', component: TaskListComponent },
            { path: 'task-kanban-board', component: TaskKanbanBoardComponent },
            { path: 'basic-form', component: BasicFormComponent },
            { path: 'form-wizard', component: FormWizardComponent },
            { path: 'register-candidate', component: RegisterCandidateComponent },
            { path: 'upload-salary-slips', component: UploadsalarySlipsComponent },
            { path: 'upload-holidays', component: UploadHolidaysComponent },
            { path: 'add-leaves', component: AddLeavesComponent },
            { path: 'upload-form16', component: UploadForm16Component },
            { path: 'upload-Investment-declaration-admin', component: InvestmentDeclarationUploadByAdminComponent },
            { path: 'bulk-employee-registration', component: BulkEmployeeRegistrationComponent },
            { path: 'exit-form-by-user', component: ExitFormByAdminComponent },
            { path: 'upload-employee-hierarchy', component: UploadEmployeeHierarchyComponent },
            { path: 'form16-for-user', component: Form16ForUserComponent },
            { path: 'apply-leave', component: ApplayLeaveComponent },
            { path: 'balance-leave', component: UserBalanceLeaveComponent },
            { path: 'leave-status', component: UserLeaveStatusComponent },
            { path: 'upcoming-holiday', component: UserUpcomingHolidayComponent },
            { path: 'payment-slip', component: UserPaymentSlipComponent },
            { path: 'exit-form', component: UserExitFormComponent },
            { path: 'investment-declaration', component: UserInvestmentDeclarationComponent },
            { path: 'employee-hierarchy', component: UserEmployeeHierarchyComponent },
            { path: 'user-personal-details', component: UserPersonalDetailsComponent },
            { path: 'calendar', component: CalendarComponent },
            { path: 'employee-calendar', component: EmployeeCalendarComponent },
            { path: 'employee-leave', component: EmployeeLeaveComponent },
            { path: 'add-task', component: AddTaskComponent }, 
            { path: 'user-add-task', component: UserAddTaskComponent },
            { path: 'emp-joining-form', component: EmployeeJoiningFormComponent },
            {path: 'admin-registration', component: AdminRegistrationComponent}, 
            {path: 'admin-file-upload', component: AdminFileUploadComponent}, 
            {path: 'admin-list', component: AdminListComponent},
            {path: 'user-list', component: AdminUserListComponent},
            {path: 'file-download',component: AdminFileDownloadComponent}, 
            {path: 'file-share',component: UserFileShareComponent},
            {path: 'user-file-download',component: UserFileDownloadComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }