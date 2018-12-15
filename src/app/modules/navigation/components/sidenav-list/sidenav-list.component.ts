import { Component, OnInit, EventEmitter, Output, } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  authChange: Subscription
  isAuth = false

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authChange = this.authService.authChange.subscribe((isAuth) => {
      this.isAuth = isAuth
    })

    this.authService.authState()
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.authService.logout()
  }

}
