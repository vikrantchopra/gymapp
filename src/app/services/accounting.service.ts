import { Injectable } from '@angular/core';
import { HorizonService } from './horizon.service';

import { Account } from '../models';

const MONTHLY_AMOUNT: Number = 1000;
const QUARTERLY_AMOUNT: Number = 2700;

@Injectable()
export class AccountingService {

  items: any;
  
  subscriptionTable = this.horizon.table("subscription");
  transactionTable = this.horizon.table("transaction");
  
  constructor(private horizon: HorizonService) { }

  getSubscriptions() {
    return this.subscriptionTable
      .order('StartDate', 'descending')
      .watch();
  }

  getTransactions() {
    return this.transactionTable
    .order('PaymentDate', 'descending')
    .watch();
  }

  save(model: Account) {
    //model.startDate = new Date();
    this.subscriptionTable.store({
      id: model.id,
      GymId: model.gymid,
      Name: model.employeeName,
      Phone: model.phone,
      Amount: model.amount,
      StartDate: model.startDate = new Date(),
      Validity: this.calculateValidity(model.amount, model.startDate),
      Email: this.generateEmail(model.employeeName),
      Status: "ACTIVE",
      Comments: model.comments,
      Type: this.getSubscriptionType(model.amount),
      LocalContact: model.localContact,
      HomeContact: model.homeContact,
      DoctorDetails: model.doctorDetails,
      Ailments: model.ailments
    });

    this.transactionTable.store({
      Name: model.employeeName,
      Type: "Credit",
      Amount: model.amount,
      PaymentDate: new Date()
    });
  }

  calculateValidity(amount: number, startDate: Date) {
    let month = (amount === MONTHLY_AMOUNT) ? startDate.getMonth() + 1 : startDate.getMonth() + 3;
    let year = startDate.getFullYear();

    return new Date(year, month, 0);
  }

  generateEmail(name: string) {
    return name.toLowerCase().replace(" ", ".") + "@kofax.com";
  }

  getSubscriptionType(amount: number) {
    return (amount === MONTHLY_AMOUNT) ? "Monthly" : "Quarterly";
  }

  getMonthlySubscriptions() {
    return this.subscriptionTable.findAll({Type: "Monthly"}).watch();
  }

  getQuarterlySubscriptions() {
    return this.subscriptionTable.findAll({Type: "Quarterly"}).watch();
  }

  getActiveSubscriptions() {
    return this.subscriptionTable.findAll({Status: "ACTIVE"}).watch();
  }

  totalCredits() {
    return this.transactionTable.findAll({Type: "Credit"}).watch();
  }

  totalDebits() {
    return this.transactionTable.findAll({Type: "Debit"}).watch();
  }

}
