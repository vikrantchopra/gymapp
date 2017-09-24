import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HorizonService } from './services/horizon.service';
import { AppComponent } from './app.component';
import { AccountManagementComponent } from './components/account-management/account-management.component';

import {TabViewModule, DataTableModule, PanelModule, ButtonModule, InputTextModule, SelectButtonModule} from 'primeng/primeng';
//import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountManagementComponent,
    //TrasactionDetailsComponent,
    TransactionDetailsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    SelectButtonModule,
    DataTableModule, 
    TabViewModule
  ],
  providers: [HorizonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
