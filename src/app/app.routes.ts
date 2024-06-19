import { type Routes } from '@angular/router';
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
import { AdminIndexComponent } from './core/admin/pages/admin-index/admin-index.component';
import { AdminAnalyticsComponent } from './core/admin/pages/admin-analytics/admin-analytics.component';
import { OrderManagementComponent } from './core/admin/pages/order-management/order-management.component';
import { UserManagementComponent } from './core/admin/pages/user-management/user-management.component';
import { CategoriesManagementComponent } from './core/admin/pages/categories-management/categories-management.component';
import { ProductsManagementComponent } from './core/admin/pages/products-management/products-management.component';
import { OrderDetailsComponent } from './core/admin/pages/order-details/order-details.component';
import { VoucherManagementComponent } from './core/admin/pages/voucher-management/voucher-management.component';
import { VoucherEditComponent } from './core/admin/pages/voucher-edit/voucher-edit.component';
import { VoucherNewComponent } from './core/admin/pages/voucher-new/voucher-new.component';
import { MyOrdersComponent } from './features/profile/components/my-orders/my-orders.component';
import { adminGuard } from './core/admin/guards/admin.guard';
import { NewProductComponent } from './core/admin/pages/products-management/pages/new-product/new-product.component';
import { ProductDetailsComponent } from './core/admin/pages/products-management/pages/product-details/product-details.component';
import { EditProductComponent } from './edit-product/edit-product.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminIndexComponent,
    canActivate: [adminGuard()],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: AdminAnalyticsComponent,
      },
      {
        path: 'categories',
        component: CategoriesManagementComponent,
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            component: ProductsManagementComponent,
          },
          {
            path: 'new',
            component: NewProductComponent,
          },
          {
            path: ':productId',
            children: [
              {
                path: '',
                component: ProductDetailsComponent,
              },
              {
                path: 'edit',
                component: EditProductComponent,
              },
            ],
          },
        ],
      },
      {
        path: 'orders',
        children: [
          {
            path: '',
            component: OrderManagementComponent,
          },
          {
            path: ':orderId',
            component: OrderDetailsComponent,
          },
        ],
      },
      {
        path: 'vouchers',
        children: [
          {
            path: '',
            component: VoucherManagementComponent,
          },
          {
            path: 'new',
            component: VoucherNewComponent,
          },

          {
            path: ':voucherId',
            children: [
              {
                path: '',
                redirectTo: '/admin/vouchers',
                pathMatch: 'full',
              },
              {
                path: 'edit',
                component: VoucherEditComponent,
              },
            ],
          },
        ],
      },
      {
        path: 'users',
        component: UserManagementComponent,
      },
    ],
  },
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
            component: MyOrdersComponent,
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
