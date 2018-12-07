import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { DataSource } from '@angular/cdk/table';
import { Observable, BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns = ['id', 'username', 'email', 'role', 'star'];
  users: User[] = []
  subject = new BehaviorSubject(null)
  dataSource = new UserListDataSource(this.subject.asObservable())
  //dataSource = new MatTableDataSource<User>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService) { }

  ngOnInit() { 
    this.userService.getUsers().subscribe(users => {
      //this.dataSource.data = users
      
      this.subject.next(this.users.concat(users))
    });
  }

  ngAfterViewInit() {
    //this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    //this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.id).subscribe((success) => {
      if (success) {
        console.log(success)
        this.subject.next(this.subject.value.filter((u) => u.id !== user.id))
      } else {
        console.log('nicht erfolgreich')
      }
    })
  }

}




export class UserListDataSource extends DataSource<any> {
  constructor(private _userList$: Observable<User[]>) {
    super()
  }

  connect(): Observable<User[]> {
    return this._userList$
  }
  disconnect() {

  }
}