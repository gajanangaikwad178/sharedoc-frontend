import { Component, ElementRef, OnInit, Renderer2, ViewChild, HostListener, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountService } from '../services/user-account.service';
import { first } from 'rxjs/operators';

import { User } from '../models/user';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
// declare var $: any;
declare const $: any;

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {

  userId: any
  name: any;
  role!: 'USER';
  signIn = true;
  time = new Date();
  today = new Date();
  user: User = new User
  SignName = "Sign In"
  ViewSwipe = "View Swipe"
  isheaders: boolean = false;
  obj: any;
  intervalId: any;
  isLoginBox: boolean = false;

  isPayrollCollapsed = true;
  userRole!: any;
  private body!: JQuery;
  private window!: JQuery;
  collapsedMap: { [key: string]: boolean } = {};

  @ViewChild('dropdownToggle') dropdownToggle!: ElementRef;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }
  document: any;
  data$: Observable<User> | undefined;
  error$: Observable<string> | undefined;
  JSON = JSON;
  isProfileMenuExpanded = false;
  innerWidth!: number;
  showProfile = false;

  viewPermission!: boolean;
  view!: boolean;

  uploadPermission!: boolean;
  upload!: boolean;

  downloadPermission!: boolean;
  download!: boolean;


  constructor(private router: Router,
    private accountService: UserAccountService,
    private renderer: Renderer2, private el: ElementRef

  ) {
    this.body = $('body');
    this.window = $(window);

    // redirect to home if already logged in
    if (this.accountService.userValue) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit(): void {

    this.collapsedMap = {
      sidebarMultilevel: true,  // Initially closed
      sidebarMultilevel2: true,
      sidebarMultilevel3: true,
      sidebarMultilevel4: true,
      HRA: true,
      EA: true,
      ORGDTLS: true,
      PM: true
    };
    this.initMenu();

    this.disableBrowserBackButton();
    const userobject = localStorage.getItem('userloggedData') || '';
    const uservalue = JSON.parse(userobject);
    this.name = uservalue.name;
    this.userId = uservalue.userId;
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    this.userId = localStorage.getItem('userId');
    console.log('isLoggedIn dashboard', isLoggedIn);
    if (isLoggedIn == 'false') {
      console.log('isLoggedIn inside if', isLoggedIn);
      this.router.navigate(['']);
    }

    this.role = 'USER';
    this.userRole = this.role;

    this.viewPermission = uservalue.View;
    this.view = this.viewPermission

    this.uploadPermission = uservalue.Upload;
    this.upload = this.uploadPermission

    this.downloadPermission = uservalue.Download;
    this.download = this.downloadPermission
    
    if (this.role === 'USER') {
      debugger
      this.isUser()
    } 
    // else {
    //   this.isEmployee()
    // }

    // Current time
    // this.intervalId = setInterval(() => {
    //   this.time = new Date();
    // }, 1000);

    // Current Day with Date
    // this.today

    const loginStatus = localStorage.getItem('loginStatus');
    if (loginStatus === 'loggedIn') {
      this.SignName = "Sign Out";
    } else if (loginStatus === 'loggedOut') {
      this.SignName = "Sign In";
    }
  }

  initMenu() {
    // Search Toggle
    $('#top-search').on('click', () => {
      $('#search-dropdown').addClass('d-block');
    });

    // Hide search on opening other dropdowns
    $('.topbar-dropdown').on('show.bs.dropdown', () => {
      $('#search-dropdown').removeClass('d-block');
    });

    // Activate the menu in topbar based on the URL
    $(".navbar-nav a").each((index: number, element: HTMLElement) => {
      const pageUrl = window.location.href.split(/[?#]/)[0];
      const href = element.getAttribute('href'); // Get the href attribute
      if (href === pageUrl) {
        $(element).addClass("active").parent().addClass("active")
          .parent().addClass("active").parent().addClass("active")
          .parent().addClass("active").prev().addClass('active');
      }
    });

    setTimeout(() => {
      const activatedItem = document.querySelector('li.menuitem-active .active') as HTMLElement;
      if (activatedItem != null) {
        const simplebarContent = document.querySelector('.left-side-menu .simplebar-content-wrapper') as HTMLElement;
        const activatedItemRect = activatedItem.getBoundingClientRect();
        const offset = activatedItemRect.top + window.scrollY - 300;
        if (simplebarContent && offset > 100) {
          simplebarContent.scrollTo({ top: offset, behavior: 'smooth' });
        }
      }
    }, 200);

    // Topbar - main menu
    $('.navbar-toggle').on('click', () => {
      $('.navbar-toggle').toggleClass('open');
      $('#navigation').slideToggle(400);
    });
  }


  openDropdown() {
    if (this.dropdownToggle) {
      this.renderer.addClass(this.dropdownToggle.nativeElement, 'show');
    }
  }

  isAdmin(): boolean {
    return this.userRole === 'Admin';
  }

  isEmployee(): boolean {
    return this.userRole === 'Employee'
  }

  isSuperAdmin(): boolean {
    return this.userRole === 'Super ADMIN'
  }

  isADMIN(): boolean {
    return this.userRole === 'ADMIN'
  }

  isUser(): boolean {
    return this.userRole === 'USER'
  }

  viewForAdmin(): boolean {
    return this.view === true
  }

  uploadForAdmin(): boolean {
    return this.upload === true
  }

  ForAdmin(): boolean {
    return this.upload === true
  }

  downloadForAdmin(): boolean {
    return this.download === true
  }

  signButton(SignName: any) {
    if (SignName == "Sign In") {
      var json = {
        "userId": this.userId,
        "password": "",
        "loginStatus": "signIn"
      }
      this.accountService.signInSignOutRecord(json)
        .pipe(first())
        .subscribe(data => {
          this.user = data;
          this.SignName = "Sign Out"
          localStorage.setItem('loginStatus', 'loggedIn');
          console.log(this.user, " this.user");
        })
    } else if (SignName == "Sign Out") {
      var json = {
        "userId": this.userId,
        "password": "",
        "loginStatus": "signOut"
      }
      this.accountService.signInSignOutRecord(json)
        .pipe(first())
        .subscribe(data => {
          this.user = data;
          this.SignName = "Sign In"
          localStorage.setItem('loginStatus', 'loggedOut');
          console.log(this.user, " this.user");
        })
    }
  }

  toggleSignInOut() {
    this.signIn = !this.signIn;
  }

  getViewSwipe(swipeType: any) {
    console.log(swipeType, "swipeType");
    if (swipeType == 'View Swipe') {
      this.ViewSwipe = "Hide Swipe"
      var json = {
        "userId": this.userId,
        "password": "",
        "loginStatus": ""
      }
      this.accountService.viewSwipe(json)
        .pipe(first())
        .subscribe(data => {
          console.log('view swipe', data);
          this.isheaders = true
          this.obj = data
          console.log(data);
        })
    } else if (swipeType == 'Hide Swipe') {
      this.isheaders = false
      this.ViewSwipe = 'View Swipe'
    }
  }

  @HostListener('window:onpopstate', ['$event'])
  onPopStste(event: any) {
    history.forward();
  }

  disableBrowserBackButton() {
    history.pushState(null, 'null', location.href);
    window.onpopstate = function () {
      history.go(1);
    };
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', String(false));
    Swal.fire('Logged Out sucessfully!');
    this.router.navigate(['']);
  }

  toggleCollapse(id: string): void {
    this.collapsedMap[id] = !this.collapsedMap[id];
  }

  isCollapsed(id: string): boolean {
    return this.collapsedMap[id];
  }

  HRAtoggleCollapse(id: string): void {
    this.collapsedMap[id] = !this.collapsedMap[id];
  }

  HRAisCollapsed(id: string): boolean {
    return this.collapsedMap[id];
  }

  EAtoggleCollapse(id: string): void {
    this.collapsedMap[id] = !this.collapsedMap[id];
    this.isLoginBox = !this.isLoginBox;
  }

  EAisCollapsed(id: string): boolean {
    return this.collapsedMap[id];
  }

  OrgDtlstoggleCollapse(id: string): void {
    this.collapsedMap[id] = !this.collapsedMap[id];
    this.isLoginBox = !this.isLoginBox;
  }

  OrgDtlsisCollapsed(id: string): boolean {
    return this.collapsedMap[id];
  }

  PMtoggleCollapse(id: string): void {
    this.collapsedMap[id] = !this.collapsedMap[id];
  }

  PMisCollapsed(id: string): boolean {
    return this.collapsedMap[id];
  }

  toggleSidebar(): void {
    console.log("call in toggle sidebar");
    if (window.innerWidth >= 768 && document.body.getAttribute('data-sidebar-size') === 'default') {
      document.body.setAttribute('data-sidebar-size', 'condensed');
    }
    else if (window.innerWidth >= 768 && document.body.getAttribute('data-sidebar-size') === 'condensed') {
      document.body.setAttribute('data-sidebar-size', 'default');
    }
    else if (window.innerWidth < 768 && document.body.classList.contains('sidebar-enable')) {
      document.body.classList.remove('sidebar-enable');
    }
    else if (window.innerWidth < 768 && !document.body.classList.contains('sidebar-enable')) {
      document.body.classList.add('sidebar-enable');
    }
  }

}
