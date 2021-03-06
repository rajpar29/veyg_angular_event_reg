import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { EventRegistrationComponent } from './event-registration/event-registration.component';
import { UserInfoComponent } from './user-registration/user-info/user-info.component';
import { CartComponent } from './cart/cart.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { CommingSoonComponent } from './comming-soon/comming-soon.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent
  },
  {
    path: 'user-registration',
    component: UserRegistrationComponent
  },
  {
    path: 'user-info',
    component: UserInfoComponent
  },
  {
    path: 'event-registration',
    component: EventRegistrationComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'order-status/:response',
    component: OrderStatusComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
