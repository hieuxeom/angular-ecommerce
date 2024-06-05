import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../../shared/services/UserServices/user.service';
import { TableModule } from 'primeng/table';
import { AdminService } from '../../services/AdminServices/admin.service';
import { response } from 'express';
import { IUser } from '../../../../shared/interfaces/user';
import { formatDate } from '../../../../shared/utils/formatDate';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, RouterModule, TableModule, RippleModule, ToastModule],
  providers: [MessageService],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent {
  public listUsers: IUser[] = [];
  public fetchState: 'onfetch' | 'finished' = 'onfetch';
  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private _messageService: MessageService
  ) {}

  ngOnInit() {
    this.getListUsers();
  }

  private getListUsers() {
    this.adminService.getAllUsers().subscribe((response) => {
      this.listUsers = response.data.map((user): IUser => {
        return {
          ...user,
          createdAt: formatDate(user.createdAt),
        };
      });

      this.fetchState = 'finished';
    });
  }

  public handleDeactivateUser(userId: string) {
    this.adminService.deactivateUser(userId).subscribe((response) => {
      this._messageService.add({
        severity: 'error',
        summary: 'Deactivate',
        detail: 'Account deactivate successfully',
      });
      this.getListUsers();
    });
  }

  public handleReactivateUser(userId: string) {
    this.adminService.reactivateUser(userId).subscribe((response) => {
      this._messageService.add({
        severity: 'success',
        summary: 'Reactivate',
        detail: 'Account reactivated successfully',
      });
      this.getListUsers();
    });
  }
}
