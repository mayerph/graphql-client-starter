import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoaderService } from 'src/app/modules/loader/services/loader.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  loaderChange: Subscription
  authChange: Subscription
  isLoading = false
  isAuth = false

  constructor(
    private loaderService: LoaderService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loaderChange = this.loaderService.loaderChange.subscribe((state) => {
        this.changeLoader(state)
    })
    this.authService.authChange.subscribe((isAuth) => {
      this.isAuth = isAuth
    })

    this.authService.authState()
  }

  changeLoader(state): void {
    this.isLoading = state
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout()
  }
}
