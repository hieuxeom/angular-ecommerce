import {Component, type OnChanges, type SimpleChanges} from '@angular/core';
import {RouterModule, Router, NavigationEnd} from '@angular/router';
import {AuthService} from '../../../core/auth/services/auth.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  providers: [AuthService],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  public isLoggedIn: boolean | undefined;

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationEnd) {
          this.isLoggedIn = this.authService.isLoggedIn();
        }
      }
    });
  }
}
