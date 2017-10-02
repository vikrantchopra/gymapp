import { Component, OnInit } from '@angular/core';
import { AccountingService } from '../../services/accounting.service';
import { Transaction } from '../../models';

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
  cAmount:number = 0;

  latestTransaction: Transaction;
  transactionType: string = '';

  // for auto complete
  nameText: any;
  nameResults: any[];
  selectedName: string;

  // transaction details for selected name
  selectedTransaction: Transaction;
  selectedType: string;
  selectedTransactionItems: any;

  addTrans: Transaction;

  last5Transactions: any;
  data: any;

  constructor(private accountingService: AccountingService) {
    
  }

  chartData(cAmount:number, dAmount:number) {//console.log("Chart Data: " + cAmount);
    this.data = {
      labels: ['Credits','Debits'],
      datasets: [
          {
              data: [cAmount, dAmount],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB"
              ]
          }]    
      };
  }

  ngOnInit() {
    this.load();
    this.latestTransaction = this.initTransaction();
    this.addTrans = this.initTransaction();
    this.getLast5Transactions();
    
  }

  load() {
    this.getBalanceSheet();
    this.getLatestTransaction();
    //this.chartData();
  }

  initTransaction() {
    let transaction = {
      id: '',
      employeeName: '',
      amount: 0,
      paymentDate: null,
      type: ''
    };
    return transaction;
  }

  addTransaction(model: any) {
    model.type = "Debit";
    this.accountingService.saveTransaction(model);
    this.addTrans = this.initTransaction();
  }

  getBalanceSheet() {

    this.accountingService.totalCredits().subscribe(items => {
      items.forEach(element => {
        this.totalCreditedAmount += element.Amount;
      });//console.log("Total Credits: " + this.totalCreditedAmount);
      this.accountingService.totalDebits().subscribe(items2 => {
        items2.forEach(element2 => {
          console.log("Debit Amount:" + element2.Amount);
          this.totalDebitedAmount += +element2.Amount;
        }); this.balanceAmount = this.totalCreditedAmount - this.totalDebitedAmount; this.chartData(this.totalCreditedAmount, this.totalDebitedAmount);
      });
    })
  }

  getCreditedAmount():number {
    //var cAmount = 0;
    this.accountingService.totalCredits().subscribe(items =>{
      items.forEach(element => {
        this.cAmount += element.Amount;
      }); console.log("Credit:" + this.cAmount);return this.cAmount;
    });
    return this.cAmount;
  }

  getDebitedAmount() {
    var dAmount = 0;
    this.accountingService.totalDebits().subscribe(items =>{
      items.forEach(element => {
        dAmount += +element.Amount;
      });return dAmount;
    });
  }

  getLatestTransaction() {
    //var item: any;
    this.accountingService.getTransactions().subscribe(result => {
      this.latestTransaction.amount = result[0].Amount;
      this.latestTransaction.employeeName = result[0].Name;
      this.latestTransaction.paymentDate = result[0].PaymentDate;
      this.transactionType = result[0].Type;

      //console.log("Latest Transaction Amount: " + this.latestTransaction.amount);
    })
  }

  filterSingleName(event) {
    let query = event.query;

    this.accountingService.getTransactions().subscribe(res => {
      this.nameResults = this.filterName(query, res);
    })
  }

  filterName(query, results: any[]): any[] {
    console.log("Result length:" + results.length);

    let filtered: any[] = [];

    for (let i = 0; i < results.length; i++) {
      let name = results[i].Name; console.log("Name:" + name);
      if (name.toLowerCase().indexOf(query.toLowerCase()) == 0) {//this.selectedName = name;
        filtered.push(name);
      }
    }
    // filter the results to get the unique results
    filtered = filtered.filter((x, i, a) => x && a.indexOf(x) == i);
    return filtered;
  }

  setSelectedName() {
    this.selectedName = this.nameText;
    this.selectedTransaction = this.initTransaction();

    this.getSelectedRecord(this.selectedName);
    this.selectedTransactionItems = this.getSelectedRecords(this.selectedName);
  }

  clearName(event) {
    this.selectedName = event.data;
  }

  getSelectedRecord(name: string) {
    return this.accountingService.getSelectedRecord(name).subscribe(result => {
      this.selectedTransaction.employeeName = result.Name;
      this.selectedTransaction.amount = result.Amount;
      this.selectedTransaction.paymentDate = result.PaymentDate;
      this.selectedType = result.Type;
    })
  }

  getSelectedRecords(name: string) {
    return this.accountingService.getSelectedRecords(name);
  }

  getLast5Transactions() {
    this.last5Transactions = this.accountingService.getOnlyFive();
  }

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

  getDiff() {
    this.accountingService.getSubscriptions().subscribe(items => {
      this.count = items.length; 

      this.accountingService.getMonthlySubscriptions().subscribe(items => {
        this.monthlyCount = items.length;
      }); this.diff = this.count - this.monthlyCount; console.log("Diff: " + this.diff);
    });
  }
  */
