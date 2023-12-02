import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

//const baseUrl ='https://hrms.fossgentechnologies.in/api';
interface addTask {
  taskStatus: string;
  status: string;
  projectName: string;
  taskName: string;
  startDate: string;
  endDate: string;
}
@Injectable({
  providedIn: 'root'
})

export class UserAccountService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

    constructor(private router: Router,
      private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }
    public get userValue() {
        return this.userSubject.value;
    }
   
    login(emailaddress: string, password: string) {
      debugger
        var userData={
            "userId":emailaddress,
            "password":password
        }
        return this.http.post(`${environment.dmsBaseURL}${environment.dmsLogin}`,userData)
            .pipe(map(user => {
              console.log(user);
              debugger
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }
    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }
    


// FILE SHARE SYSTEM
// 1
userRegister(fullname: string, userId: string, password: string, emailaddress: string, phone: string, gender: string, role: string,companyId: string) {
  debugger
  var userData={
      "name":fullname,
      "userId":userId,
      "password":password,
      "emailId":emailaddress,
      "phoneNo":phone,
      "gender":gender,
      "role":role,
      "userCompanyName":companyId
  }
  
  return this.http.post(`${environment.fssBaseURL}${environment.fssRegistration}`,userData);
}

// 2
getAllCompanyList() {
  return this.http.get<User[]>(`${environment.fssBaseURL}${environment.fssGetAllCompanyList}`);
}

// 3
getUserOfCompany(companyName:any,userId:any,){
  debugger
  const userobject = localStorage.getItem('userloggedData') || '';
    const uservalue = JSON.parse(userobject);
    this.token = uservalue.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
  return this.http.get<User[]>(`${environment.fssBaseURL}${environment.fssUserCompanyList}/${companyName}/${userId}`,{headers});
}
//4
fileUplaodAndShare(formObject: FormData){
  debugger
  const userobject = localStorage.getItem('userloggedData') || '';
  const uservalue = JSON.parse(userobject);
  this.token = uservalue.token;
  const headers = new HttpHeaders({
    'Authorization':`Bearer ${this.token}`
  });
  return this.http.post(`${environment.fssBaseURL}${environment.fssfileUplaodAndShare}`, formObject,{ headers});
}

//5
getUserDocumentList(userId: any) {
  debugger
  const userobject = localStorage.getItem('userloggedData') || '';
  const uservalue = JSON.parse(userobject);
  this.token = uservalue.token;
  const headers = new HttpHeaders({
    'Authorization':`Bearer ${this.token}`
  });
  return this.http.get<any[]>(`${environment.fssBaseURL}${environment.fssUserDocumentList}/${userId}`,{ headers});
}

//6
downlodShareFile(fileName: string): Observable<any> {
  const userobject = localStorage.getItem('userloggedData') || '';
  const uservalue = JSON.parse(userobject);
  this.token = uservalue.token;
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });
  return this.http.get<any>(`${environment.fssBaseURL}${environment.fssfileDownload}/${fileName}`, { headers, responseType: 'arraybuffer' as 'json' });
}


//7
getUploadedDocumentList(companyName: any) {
  debugger
  const userobject = localStorage.getItem('userloggedData') || '';
  const uservalue = JSON.parse(userobject);
  this.token = uservalue.token;
  const headers = new HttpHeaders({
    'Authorization':`Bearer ${this.token}`
  });
  return this.http.get<any[]>(`${environment.dmsBaseURL}${environment.uploadedDocumentList}/${companyName}`,{ headers});
}












  registerCandidate(formObject: any){
    return this.http.post(`${environment.baseUrl}${environment.ragistercandidate}`,  formObject);
  }

  uploadSalarySlips(formObject: any) {
    return this.http.post(`${environment.baseUrl}${environment.uploadSalarySlips}`, formObject);
  }

  getAllUsers() {
    return this.http.get<User[]>(`${environment.baseUrl}${environment.getAllUsers}`);
  }

  createHolidays(user: User) {
    return this.http.post(`${environment.baseUrl}${environment.createHolidays}`, user);
  }

  uploadBulkHolidayFile(formObject: any) {
    return this.http.post(`${environment.baseUrl}${environment.bulkHolidayUpload}`, formObject);
  }

  getUpcomingHolidays() {
    return this.http.get<User[]>(`${environment.baseUrl}${environment.getAllHolidays}`);
  }

  addLeave(user: User) {
    return this.http.post(`${environment.baseUrl}${environment.addLeaves}` , user);
  }

  uploadForm16(formObject: any) {
    return this.http.post(`${environment.baseUrl}${environment.uploadForm16}`, formObject);
  }

  getFile(userId: string, year: string) {
    const body = { userId, year };
    return this.http.post(`${environment.baseUrl}${environment.getFile}`, body );
  }

  deleteForm16(userId: string, year: string)  {
    return this.http.delete(`${environment.baseUrl}/${environment.deleteForm16}/${userId}/${year}`,);
  }

  
  getAllInvestmentDeclarationByUsers() {
    return this.http.get<User[]>(`${environment.baseUrl}${environment.getAllInvestmentDeclarationByUsers}`);
  }

  uploadInvestmentDecByAdmin(formObject: any) {
    return this.http.post(`${environment.baseUrl}${environment.uploadInvestmentDeclaration}`, formObject)
  }

  deleteInvestmentDecaration(){
    return this.http.delete(`${environment.baseUrl}${environment.deleteInvestmentDeclaration}`);
  }

  deleteInvestmentDeclarationOfUser(userId: string): Observable<any> {
    const url = `${environment.baseUrl}/${environment.deleteInvestmentDeclarationOfUser}/${userId}`;
    return this.http.delete(url);
  }

  uploadBulkUserRegistationFile(formObject: any) {
    return this.http.post(`${environment.baseUrl}${environment.uploadBulkUserRegistationFile}`, formObject);
  }

  getAllExitFormByUsers() {
    return this.http.get<User[]>(`${environment.baseUrl}${environment.getAllExitFormByUsers}`);
  }

  uploadExitFormByAdmin(formObject: any) {
    return this.http.post(`${environment.baseUrl}${environment.uploadExitForm}`, formObject);
  }

  deleteExitForm(): Observable<any> {
    return this.http.delete(`${environment.baseUrl}${environment.deleteExitForm}`);
  }

  deleteExitFormOfUser(userId: string) {
    return this.http.delete<any>( `${environment.baseUrl}/${environment.deleteExitFormOfUser}/${userId}`);
  }

  uploadEmployeeHierarchy(formObject: any) {
    return this.http.post(`${environment.baseUrl}${environment.uploadEmployeeHierarchy}`, formObject)
  }

  deleteEmpoyeeHierarchy(){
    return this.http.delete(`${environment.baseUrl}${environment.deleteEmployeeHierarchy}`);
  }

  getPaymentSlip(json: any) {
    return this.http.post<any>(`${environment.baseUrl}${environment.paymentSlipPDF}`, json);
  }
​
  signInSignOutRecord(json: any) {
    return this.http.post<any>(`${environment.baseUrl}${environment.signIn}`, json);
  }
​
  loggedUserId(emailaddress: string) {
    debugger
    var userData = {
      "userId": emailaddress,
      "password": ''
    }
    return this.http.post<any>(`${environment.baseUrl}${environment.loggedUserId}`, userData);
  }
​
  viewSwipe(json: any) {
    return this.http.post<any>(`${environment.baseUrl}${environment.viewSwipe}`, json);
  }
​
  uploadExitFormByUser(formObject: any) {
    return this.http.post<any>(`${environment.baseUrl}${environment.uploadExitFormByUser}`, formObject)
  }
​
  public applayLeave(user: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}${environment.applyEmployeeLeaves}`, user);
  }
​
  public getAllLeaves(json: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}${environment.getAllBalanceLeaves}`, json);
  }
​
  getLeaveStatus(id: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.baseUrl}${environment.getLeaveStatus}`+ id);
  }
​
  getFilex(userId: string, year: string): Observable<any> {
    const body = { userId, year };
    return this.http.post<any>(`${environment.baseUrl}${environment.viewform16}`, body);
  }
​
  public uploadInvestmentDecByUSer(formObject: any) {
    return this.http.post<any>(`${environment.baseUrl}${environment.uploadInvestmentDecByUSer}`, formObject)
  }

  downlodform16(userId: string, year: string) {
    const body = { userId, year };
    return this.http.post<any>(`${environment.baseUrl}${environment.downlodform16}`, body);
  }

  postPersonalData(userId: any): Observable<String> {
    // const url = 'http://localhost:8082/api/v1/getAllUserPersonalDtls';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<string>(`${environment.baseUrl}${environment.getAllUserPersonalDtls}`, userId, { headers, responseType: 'text' as 'json' });
  }

  postEmployeeData(data: any): Observable<String> {
    const url = `${environment.baseUrl}${environment.postEmployeeData}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<string>(url, data, { headers, responseType: 'text' as 'json' });
  }

  getAllLeavesList() {
    return this.http.get(`${environment.baseUrl}${environment.getAllLeavesList}`);
  }

  getSignInSignOut(userId: string) {
    const url = `${environment.baseUrl}${environment.getSignInSignOut}/${userId}`;
    return this.http.get<any[]>(url);
  }

  getHolidayList(){
    return this.http.get<User[]>(`${environment.baseUrl}${environment.getAllHolidays}`);
  }

  getAllLeaveRequests() {
    return this.http.get<User[]>(`${environment.baseUrl}${environment.employeeLeave}`);
  }

  updateStatus(userId: string, status: string, hrReason: string) {
    const url = `${environment.baseUrl}${environment.updateStatus}/${userId}${environment.updateStatus1}`;

    const params = new HttpParams().set('status', status)
      .set('hrReason', hrReason);
    return this.http.put<any>(url, null, { params });
  }

  getAllTask() {
    return this.http.get<addTask[]>(`${environment.baseUrl}${environment.allTask}`);
  }

  updateTaskStatus(data: any) {
    return this.http.post<any>(`${environment.baseUrl}${environment.updateTask}`, data);
  }

  getUserTask(userId: any) {
    return this.http.get<any[]>(`${environment.baseUrl}${environment.getUserTask}/${userId}`);
  }

  addTask(user: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}${environment.addTask}`, user);
  }

  getEmployeeDetails() {
    return this.http.get<addTask[]>(`${environment.baseUrl}${environment.employeeDetails}`);
  }

  addEmployeePersonalDtls(employee: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}${environment.employeePersonalDtls}`, employee);
  }

  uploadCertificatePdf(formObject: any) {
    return this.http.post<any>(`${environment.baseUrl}${environment.uploadCertificatePdf}`, formObject);
  }

  viewEmployeeDetails(employeeId: string, documentName: string): Observable<any[]> {
    const body = { employeeId, documentName };
    return this.http.post<any>(`${environment.baseUrl}${environment.viewEmployeeCertificate}`, body);
  }

  ExitFormConfirm(requestData :any): Observable<any[]>{
    return this.http.post<any>(`${environment.baseUrl}${environment.exitFormFinalDate}`,requestData);
  }

  employeeHierarchyPDF() {
    return this.http.get<any>(`${environment.baseUrl}${environment.employeeHierarchyPDF}`);
  }

  getInvestmentDeclarationFormat() {
    return this.http.get<any>(`${environment.baseUrl}${environment.getInvestmentDeclarationFormat}`);
  }

  downloadExitForm() {
    return this.http.get<any>(`${environment.baseUrl}${environment.downloadExitForm}`);
  }







token:any;
  getAllAdminList(){
    debugger
    const userobject = localStorage.getItem('userloggedData') || '';
    const uservalue = JSON.parse(userobject);

    this.token = uservalue.token;
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${this.token}`
      
    });
    console.log(this.token);
    return this.http.get<any[]>(`${environment.dmsBaseURL}${environment.dmcAdminList}`,{ headers: headers});
    // return this.http.get<any[]>(`${environment.dmsBaseURL}${environment.dmcAdminList}`,{headers});
  }

  getAllUserList(){
    debugger
    const userobject = localStorage.getItem('userloggedData') || '';
    const uservalue = JSON.parse(userobject);
    this.token = uservalue.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${this.token}`
    });
    console.log(this.token);
    return this.http.get<any[]>(`${environment.dmsBaseURL}${environment.dmcUserList}`,{ headers: headers});
  }

  updateAdminPermission(formObject: any) {
    const userobject = localStorage.getItem('userloggedData') || '';
    const uservalue = JSON.parse(userobject);
    this.token = uservalue.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${this.token}`
    });
    return this.http.put(`${environment.dmsBaseURL}${environment.dmcUpdateAdmin}`, formObject,{ headers: headers});
  }

  fileUplaod(formObject: FormData){
    debugger
    const userobject = localStorage.getItem('userloggedData') || '';
    const uservalue = JSON.parse(userobject);
    this.token = uservalue.token;
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${this.token}`
    });
    return this.http.post(`${environment.dmsBaseURL}${environment.fileUpload}`, formObject,{ headers});
  }

  // downlodFile(fileName:any) {
  //   debugger
  //   const userobject = localStorage.getItem('userloggedData') || '';
  //   const uservalue = JSON.parse(userobject);
  //   this.token = uservalue.token;
  //   const headers = new HttpHeaders({
  //     'Authorization':`Bearer ${this.token}`
  //   });
  //   return this.http.get<any>(`${environment.dmsBaseURL}${environment.fileDownload}/${fileName}`, { headers});
  // }

  getDocumentList(userId: any) {
    debugger
    const userobject = localStorage.getItem('userloggedData') || '';
    const uservalue = JSON.parse(userobject);
    this.token = uservalue.token;
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${this.token}`
    });
    return this.http.get<any[]>(`${environment.dmsBaseURL}${environment.documentList}/${userId}`,{ headers});
  }

  downlodFile(fileName: string): Observable<any> {
    const userobject = localStorage.getItem('userloggedData') || '';
    const uservalue = JSON.parse(userobject);
    this.token = uservalue.token;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(`${environment.dmsBaseURL}${environment.fileDownload}/${fileName}`, { headers, responseType: 'arraybuffer' as 'json' });
  }



  companyOnBoard(fullname: string, address: string, emailaddress: string, phone: string,) {
    debugger
    var userData={
        "companyName":fullname,
        // "compId":userId,
        "emailId":emailaddress,
        "contactNo":phone,
         "companyAddress":address,
         // "password":password,
        // "role":role,
        // "view":viewCheckbox,
        // "upload":uploadCheckbox,
        // "download":downloadCheckbox
    }
    return this.http.post(`${environment.dmsBaseURL}${environment.fssCompanyOnBoarding}`,  userData);
}
  
}

