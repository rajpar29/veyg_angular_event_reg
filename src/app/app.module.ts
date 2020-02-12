import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { EventRegistrationComponent } from './event-registration/event-registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './home-page/home-page.component';


import {
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatChipsModule,
  MatListModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatRippleModule,
  MatTableModule,
  MatToolbarModule,
  MatAutocompleteModule,
  MatRadioModule,
  MatSnackBarModule,
  MatCardModule,
  MatDividerModule,
  MatSelectModule
} from "@angular/material";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgxSpinnerModule } from "ngx-spinner";
import { UserInfoComponent } from './user-registration/user-info/user-info.component';
import { CartComponent } from './cart/cart.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { HttpClientModule } from '@angular/common/http';
import { CommingSoonComponent } from './comming-soon/comming-soon.component';



@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    EventRegistrationComponent,
    HomePageComponent,
    UserInfoComponent,
    CartComponent,
    OrderStatusComponent,
    CommingSoonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    HttpClientModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features

    NgxSpinnerModule,


    FormsModule,
    ReactiveFormsModule,

    MatSelectModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatDialogModule,
    MatListModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatTooltipModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatTableModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatSnackBarModule,
    CommonModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
