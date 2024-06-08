import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-index',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-index.component.html',
  styleUrl: './admin-index.component.css',
})
export class AdminIndexComponent {}
