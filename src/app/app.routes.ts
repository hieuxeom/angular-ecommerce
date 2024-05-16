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
import { EditAddressesComponent } from './features/profile/components/edit-addresses/edit-addresses.component';
import { EditProfileComponent } from './features/profile/components/edit-profile/edit-profile.component';
import { ListAddressComponent } from './features/profile/components/list-address/list-address.component';
import { ProfileComponent } from './features/profile/profile.component';

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
      { path: '', component: EditProfileComponent },
      { path: 'list-address', component: ListAddressComponent },
      {
        path: 'edit-address',
        children: [
          { path: '', redirectTo: 'list-address', pathMatch: 'full' },
          { path: ':addressId', component: EditAddressesComponent },
        ],
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
