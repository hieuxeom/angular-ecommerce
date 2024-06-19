import {ViewportScroller} from '@angular/common';
import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollToTopService {
  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe({
        next: () => {
          this.viewportScroller.scrollToPosition([0, 0]);
        }
      });
  }

  public scrollToTop() {
    return this.viewportScroller.scrollToPosition([0, 0]);
  }
}
