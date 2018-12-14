import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.css']
})
export class UserOverviewComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['id', 'username', 'email', 'role', 'star'];
  displayedSmallColumns = ['id', 'username'];
  dataSource = new MatTableDataSource<User>();
  userCreatedSubscription: Subscription;
  userDeletedSubscription: Subscription;
  userUpdatedSubscription: Subscription;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private userService: UserService
    ) { }

  ngOnInit() { 
    this.userService.getUsers().subscribe(users => {
      this.dataSource.data = users
    });

    this.userCreatedSubscription = this.userService.subscribeUserCreated().subscribe(({data}) => {
      this.addUserToDataSource(data.userCreated)
    })

    this.userDeletedSubscription = this.userService.subscribeUserDeleted().subscribe(({data}) => {
      this.removeUserFromDataSource(data.userDeleted)
    })

    this.userUpdatedSubscription = this.userService.subscribeUserUpdated().subscribe(({data}) => {
      this.updateUserInDataSource(data.userUpdated)
    })
  }

  updateUserInDataSource(user: User) {
    this.dataSource.data = this.dataSource.data.filter((u) => {
      if (u.id === user.id) {
        return user
      }
      return u
    })
    this.dataSource._updateChangeSubscription()
  }

  addUserToDataSource(user: User): void {
    this.dataSource.data.push(user)
    this.dataSource._updateChangeSubscription()
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.id).subscribe((success) => {
      if (success) {
        this.removeUserFromDataSource(user.id)
      } else {
        console.log('nicht erfolgreich')
      }
    })
  }

  removeUserFromDataSource(id: string) {
    this.dataSource.data = this.dataSource.data.filter((u) => u.id !== id)
    this.dataSource._updateChangeSubscription()
  }

  ngOnDestroy() {
    this.userCreatedSubscription.unsubscribe()
  }
}