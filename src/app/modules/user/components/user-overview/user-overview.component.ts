import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/modules/loader/services/loader.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/modules/message/services/message.service';


@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.css']
})
export class UserOverviewComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['image', 'id', 'username', 'email', 'role', 'star'];
  displayedSmallColumns = ['id', 'username'];
  defaultImage = 'http://127.0.0.1:8000/static/images/user/default/userImage_default.png'
  dataSource = new MatTableDataSource<User>();
  userCreatedSubscription: Subscription;
  userDeletedSubscription: Subscription;
  userUpdatedSubscription: Subscription;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private loaderService: LoaderService,
    private messageService: MessageService
    ) { }

  ngOnInit() {
    this.getUsers()
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

  getUsers(): void {
    this.loaderService.changeLoader(true)
    this.userService.getUsers().subscribe(
      users => {
        this.loaderService.changeLoader(false)
        this.dataSource.data = users
      },
      error => {
        this.loaderService.changeLoader(false)
        this.messageService.createMessage(error)
        throw error
      }
    );
  }

  async updateUserInDataSource(user: User) {
    const index = this.dataSource.data.map((e) => e['id'] ).indexOf(user.id)
    this.dataSource.data[index] = user
    this.dataSource._updateChangeSubscription()
    console.log(user)
    
    /*if (index > -1) {
      this.dataSource.data.splice(index, 1)
      this.dataSource._updateChangeSubscription()
    }
    this.dataSource.data = await this.dataSource.data.filter((u) => {
      if (u.id === user.id) {
        return user
      }
      return u
    })
    this.dataSource._updateChangeSubscription()*/
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
    this.loaderService.changeLoader(true)
    this.userService.deleteUser(user.id).subscribe(
      success => {
        if (success) {
          this.loaderService.changeLoader(false)
          this.removeUserFromDataSource(user.id)
        }
      },
      error => {
        this.loaderService.changeLoader(false)
        this.messageService.createMessage(error)
        throw error
      })
  }

  removeUserFromDataSource(id: string) {
    const index = this.dataSource.data.map((e) => e['id'] ).indexOf(id)
    if (index > -1) {
      this.dataSource.data.splice(index, 1)
      this.dataSource._updateChangeSubscription()
    }
  }

  ngOnDestroy() {
    this.userDeletedSubscription.unsubscribe()
    this.userCreatedSubscription.unsubscribe()
    this.userUpdatedSubscription.unsubscribe()
  }
}