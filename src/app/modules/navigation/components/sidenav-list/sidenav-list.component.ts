import { Component, OnInit, EventEmitter, Output } from '@angular/core'
import { AuthService } from 'src/app/modules/auth/services/auth.service'
import { Permission as PermissionEnum } from 'src/app/modules/role/enums/permisson.enum'

@Component({
    selector: 'app-sidenav-list',
    templateUrl: './sidenav-list.component.html',
    styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit {
    @Output() closeSidenav = new EventEmitter<void>()
    permissions = PermissionEnum

    constructor(private authService: AuthService) {}

    ngOnInit() {}

    onClose() {
        this.closeSidenav.emit()
    }

    onLogout() {
        this.authService.logout()
    }
}
