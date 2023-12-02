// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:4000/web',
  // baseUrl:'https://hrms.fossgentechnologies.in/api/api',
  baseUrl:'http://localhost:8082/api',
  dmsBaseURL:'http://localhost:8080/api/v1/dms',
  fssBaseURL:'http://localhost:8080/api/v1/dms',


  fssGetAllCompanyList: '/company/list',
  fssRegistration:'/user/register',
  fssCompanyOnBoarding:'/company/register',
  fssUserCompanyList:'/user/list',
  fssfileUplaodAndShare:'/user/uploadFile',
  fssUserDocumentList:'/user/filelist',
  fssfileDownload:'/user/downloadfile',
  uploadedDocumentList:'/file/fileList',
  // DMS
  dmsLogin:'/user/login',
  dmcRegistration:'/user/register',
  dmcAdminList:'/user/adminlist',
  dmcUserList:'/user/userlist',
  dmcUpdateAdmin:'/user/update',
  fileUpload:'/user/uploadfile',
  fileDownload:'/user/downloadfile',
  documentList:'/user/documentlist',
  

    login: '/v1/login' ,
    registration:'/v1/registration',
    ragistercandidate: '/v1/registerCandidate',
    uploadSalarySlips:  '/v1/uploadPaymentSlipPdf',
    getAllUsers: '/v1/getUsers',
    createHolidays: '/v1/createHolidays',
    bulkHolidayUpload :'/v1/uploadBulkHolidayFile',
    getAllHolidays : '/v1/upcomingHolidays',
    addLeaves: '/v1/addLeaves',
    uploadForm16: '/v1/uploadForm16',
    getFile: '/v1/viewform16',
    getAllInvestmentDeclarationByUsers: '/v1/getAllInvestmentDeclarationByUsers',
    uploadInvestmentDeclaration: '/v1/uploadInvestmentDeclaration',
    deleteInvestmentDeclaration: '/v1/deleteInvestmentDeclaration',
    uploadBulkUserRegistationFile: '/v1/uploadBulkUserRegistationFile',
    getAllExitFormByUsers: '/v1/getAllExitFormByUsers',
    uploadExitForm: '/v1/uploadExitForm',
    deleteExitForm: '/v1/deleteExitForm',
    uploadEmployeeHierarchy: '/v1/uploadEmployeeHierarchy',
    deleteEmployeeHierarchy: '/v1/deleteEmployeeHierarchy',
    paymentSlipPDF : '/v1/downloadPaymentSlip',
    signIn: '/v1/signInSignOut',
    loggedUserId: '/v1/loggedUserId',
    viewSwipe: '/v1/getSwipeDetails',
    uploadExitFormByUser: '/v1/uploadExitFormByUser',
    applyEmployeeLeaves:"/v1/applyEmployeeLeaves",
    getAllBalanceLeaves:"/v1/getAllLeaves",
    getLeaveStatus: "/v1/getAllLeaveStatusById/",
    viewform16: "/v1/viewform16",
    uploadInvestmentDecByUSer:"/v1/uploadInvestmentDeclarationByUser",
    downlodform16: '/v1/viewform16',
    getAllUserPersonalDtls: '/v1/getAllUserPersonalDtls',
    getAllLeavesList:'/v1/getAllLeavesList',
    employeeLeave:'/v1/allLeaves',
    addTask:'/v1/task',
    allTask:'/v1/allTask',
    updateTask:'/v1/updateTaskStatus',
    employeeDetails:'/v1/employeeDetails',
    employeePersonalDtls:'/v1/employeePersonalDtls',
    uploadCertificatePdf:'/v1/uploadCertificatePdf',
    viewEmployeeCertificate:'/v1/viewEmployeeCertificate',
    exitFormFinalDate: '/v1/exitFormFinalDate',
    deleteForm16: '/v1/form16',
    deleteInvestmentDeclarationOfUser:'/v1/deleteInvestmentDeclarationOfUser',
    deleteExitFormOfUser:'/v1/deleteExitFormOfUser',
    postEmployeeData:'/v1/userPersonalDtls',
    getSignInSignOut:'/v1/getSignInSignOut',
    updateStatus:'/v1',
    updateStatus1:'/status/hrReason',
    getUserTask:'/v1/perticulartask',
    employeeHierarchyPDF : '/v1/getEmployeeHierarchy',
    getInvestmentDeclarationFormat : '/v1/getInvestmentDeclarationFormat',
    downloadExitForm : '/v1/getExitForm'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
