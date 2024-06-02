import { NgModule } from '@angular/core';
import { RouterModule, type Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth.guard';
import { profileGuard } from './core/auth/guards/profile.guard';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { PasswordRecoveryComponent } from './core/auth/pages/password-recovery/password-recovery.component';
import { SignupComponent } from './core/auth/pages/signup/signup.component';
import { CartComponent } from './features/cart/cart.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { HomeComponent } from './features/home/home.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';
import { ProductComponent } from './features/product/product.component';
import { ProfileComponent } from './features/profile/profile.component';
import { InformationComponent } from './features/profile/components/information/information.component';
import { ListAddressComponent } from './features/profile/components/list-address/list-address.component';
import { ChangePasswordComponent } from './features/profile/components/change-password/change-password.component';
import { EditAddressComponent } from './features/profile/components/edit-address/edit-address.component';
import { CreateAddressComponent } from './features/profile/components/create-address/create-address.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'product',
    children: [
      { path: '', component: ProductComponent },
      {
        path: ':productId',
        component: ProductDetailComponent,
      },
    ],
  },
  {
    path: 'cart',
    canActivate: [profileGuard()],
    children: [
      { path: '', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent },
    ],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [profileGuard()],
    children: [
      {
        path: '',
        component: InformationComponent,
      },
      {
        path: 'list-address',
        children: [
          {
            path: '',
            component: ListAddressComponent,
          },
          {
            path: 'new',
            component: CreateAddressComponent,
          },
          {
            path: ':addressId',
            component: EditAddressComponent,
          },
        ],
      },
      {
        path: 'orders',
        children: [
          {
            path: '',
            component: EditAddressComponent,
          },
          {
            path: ':orderId',
            component: EditAddressComponent,
          },
        ],
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
    ],
  },
  {
    path: 'auth',
    canActivate: [authGuard()],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'sign-up', component: SignupComponent },
      { path: 'password-recovery', component: PasswordRecoveryComponent },
      { path: '**', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
