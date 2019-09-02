import { Component, OnInit } from '@angular/core';
import { User } from '../../services/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  displayedColumns: string[] = ['id', 'username', 'password'];
  message: string;

  constructor(private userService: UsersService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers = (): void => {
    this.userService
      .getUsers()
      .subscribe(users => this.users = users);
  }

  create(username: string, password: string): void {
    const newUser = new User();
    newUser.username = username;
    newUser.password = password;

    this.userService.createUser(newUser)
      .subscribe({
        next: () => {
          this.getUsers();
        },
        error: (error) => {
          this.message = error.statusText;
        }
      });
  }
}
