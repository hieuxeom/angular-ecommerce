import { EditProfileComponent } from './features/profile/components/edit-profile/edit-profile.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductComponent } from './features/product/product.component';
import { CartComponent } from './features/cart/cart.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { SignupComponent } from './core/auth/pages/signup/signup.component';
import { PasswordRecoveryComponent } from './core/auth/pages/password-recovery/password-recovery.component';
import { ProfileComponent } from './features/profile/profile.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';
import { CommentsSectionComponent } from './features/product-detail/components/comments-section/comments-section.component';
import { ReviewsSectionComponent } from './features/product-detail/components/reviews-section/reviews-section.component';
import { ListAddressComponent } from './features/profile/components/list-address/list-address.component';
import { EditAddressesComponent } from './features/profile/components/edit-addresses/edit-addresses.component';

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
