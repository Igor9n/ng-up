import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../services/user';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User;
  message: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
  ) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService
      .getUser(id)
      .subscribe({
        next: (user) => {
          this.user = user;
        },
        error: (error) => {
          this.message = error.error;
        }
      });
  }

  delete(): void {
    this.userService.deleteUser(this.user.id)
      .subscribe({
        next: (response) => {
          this.message = response;
          this.user = null;
        },
        error: (error) => {
          this.message = error.error;
        }
      });
  }
}
