import { Component } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';

import { NavComponent } from './shared/components/nav/nav.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ScrollToTopService } from './shared/services/ScrollToTop/scroll-to-top.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavComponent, FooterComponent],
  providers: [ScrollToTopService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(
    private router: Router,
    private scrollToTop: ScrollToTopService
  ) {}
}
