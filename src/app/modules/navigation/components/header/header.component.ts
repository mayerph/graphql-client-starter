import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoaderService } from 'src/app/modules/loader/services/loader.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { Permission as PermissionEnum } from 'src/app/modules/role/enums/permisson.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  loaderChange: Subscription
  permissions = PermissionEnum
  isLoading = false

  constructor(
    private loaderService: LoaderService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loaderChange = this.loaderService.loaderChange.subscribe((state) => {
        this.changeLoader(state)
    })
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
