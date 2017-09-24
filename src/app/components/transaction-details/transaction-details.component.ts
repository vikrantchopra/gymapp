import { Component, OnInit } from '@angular/core';
import { AccountingService } from '../../services/accounting.service';
@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css'],
  providers: [AccountingService]
})
export class TransactionDetailsComponent implements OnInit {

  totalCreditedAmount: number = 0;
  totalDebitedAmount: number = 0;
  balanceAmount: number = 0;

  constructor(private accountingService: AccountingService) { }

  ngOnInit() {
    this.getBalanceSheet();
  }

  /*
  getCreditAmount() {
    var amount = 0;
    this.accountingService.totalCredits().subscribe(items => {
      items.forEach(element => {
        amount += element.Amount;
      }); this.totalCreditedAmount = amount;
    })
  }

  getDebitAmount() {
    var amount = 0;
    this.accountingService.totalDebits().subscribe(items => {
      items.forEach(element => {
        amount += element.Amount;
      }); this.totalDebitedAmount = amount;
    })
  }
  */

  getBalanceSheet() {
    
    this.accountingService.totalCredits().subscribe(items => {
      items.forEach(element => {
        this.totalCreditedAmount += element.Amount; 
      });
      this.accountingService.totalDebits().subscribe(items => {
        items.forEach(element => {
          this.totalDebitedAmount += element.Amount;
        }); 
      });this.balanceAmount = this.totalCreditedAmount - this.totalDebitedAmount;
    })
  }

  /*
  getDiff() {
    this.accountingService.getSubscriptions().subscribe(items => {
      this.count = items.length; 

      this.accountingService.getMonthlySubscriptions().subscribe(items => {
        this.monthlyCount = items.length;
      }); this.diff = this.count - this.monthlyCount; console.log("Diff: " + this.diff);
    });
  }
  */

}
