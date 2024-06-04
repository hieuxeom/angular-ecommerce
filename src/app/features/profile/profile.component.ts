import { Component } from '@angular/core';
import { UserService } from '../../shared/services/UserServices/user.service';
import type { IUser, IUserAuth } from '../../shared/interfaces/user';
import { Router, RouterModule } from '@angular/router';
import { HrComponent } from '../../shared/components/hr/hr.component';
import { AuthService } from '../../core/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, HrComponent],
  providers: [UserService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  public userData: IUser | undefined;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private _router: Router,
    private _cookieService: CookieService
  ) {
    if (this.authService.isLoggedIn()) {
      this.getUserData();
    } else {
      window.location.href = '/auth/login';
    }
  }

  public getUserData() {
    this.userService.getMe().subscribe((response) => {
      this.userData = response.data;
    });
  }

  public handleSignOut() {
    this._cookieService.delete('access_token');
    this._cookieService.delete('refresh_token');
    return this._router.navigate(['/auth', 'login']);
  }
}
