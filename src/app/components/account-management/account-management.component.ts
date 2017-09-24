import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { UtilService } from '../../services/util.service';
import { AccountingService } from '../../services/accounting.service';

import { Account } from '../../models';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css'],
  providers: [UtilService, AccountingService]
})
export class AccountManagementComponent implements OnInit {

  subscriptionItems: any;
  transactionItems: any;
  addAccount: Account;

  amountOptions: SelectItem[];
  statusOptions: SelectItem[];

  count: number;
  monthlyCount:number;
  quarterlyCount:number;
  activeCount:number;
  diff:number;

  constructor(private utilService: UtilService, private accountingService: AccountingService) {
    this.amountOptions = utilService.getAmountValues();
    this.statusOptions = utilService.getStatusValues();
  }

  ngOnInit() {
    this.loadAccountInformation();
    this.addAccount = this.initializeAccount();

    this.getMemberCount();
    this.getMonthlySubscriptions();
    this.getQuarterlySubscriptions();
    this.getActiveSubscriptions();

    //this.getDiff();
  }

  loadAccountInformation() {
    this.subscriptionItems = this.accountingService.getSubscriptions();
    this.transactionItems = this.accountingService.getTransactions();
  }

  initializeAccount() {
    let acc = {
      id: '',
      gymid: '',
      employeeName: '',
      amount: 1000,
      startDate: null,
      status: 'ACTIVE',
      comments: '',
      phone: '',
      localContact: '',
      homeContact: '',
      doctorDetails: '',
      ailments: 'None'
    };
    return acc;
  }

  addAccountInformation(model: Account) {
    this.accountingService.save(model);
    this.addAccount = this.initializeAccount();
  }

  getMemberCount() {
    this.accountingService.getSubscriptions().subscribe(items => {
      this.count = items.length; 
    });
  }

  getMonthlySubscriptions(){
    this.accountingService.getMonthlySubscriptions().subscribe(items => {
      this.monthlyCount = items.length;
    }); 
  }

  getQuarterlySubscriptions() {
    this.accountingService.getQuarterlySubscriptions().subscribe(items => {
      this.quarterlyCount = items.length;
    })
  }

  getActiveSubscriptions() {
    this.accountingService.getActiveSubscriptions().subscribe(items => {
      this.activeCount = items.length;
    })
  }

  getDiff() {
    this.accountingService.getSubscriptions().subscribe(items => {
      this.count = items.length; 

      this.accountingService.getMonthlySubscriptions().subscribe(items => {
        this.monthlyCount = items.length;
      }); this.diff = this.count - this.monthlyCount; console.log("Diff: " + this.diff);
    });
  }

  
}
