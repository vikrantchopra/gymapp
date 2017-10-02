import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { UtilService } from '../../services/util.service';
import { AccountingService } from '../../services/accounting.service';

import { Account, Subscription } from '../../models';
import { OverlayPanel } from 'primeng/primeng';

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

  editSubscription: Subscription;
  displayEditDialog:boolean;

  selectedRecord: any;
  displayEmergencyDialog: boolean;

  amountOptions: SelectItem[];
  statusOptions: SelectItem[];

  count: number;
  monthlyCount:number;
  quarterlyCount:number;
  activeCount:number;
  inactiveCount: number;

  selectedRecords: any[];

  subscriptionData: any;
  statusData: any;

  constructor(private utilService: UtilService, private accountingService: AccountingService) {
    this.amountOptions = utilService.getAmountValues();
    this.statusOptions = utilService.getStatusValues();
  }

  ngOnInit() {
    this.loadAccountInformation();
    this.addAccount = this.initializeAccount();
    this.editSubscription = this.initializeAccount();

    this.getMemberCount();
    this.getMonthlySubscriptions();
    this.getQuarterlySubscriptions();
    this.getActiveSubscriptions();

    this.getSubscriptionChartData();
    this.getStatusChartData();
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
      type: '',
      phone: '',
      localContact: '',
      homeContact: '',
      doctorDetails: '',
      ailments: 'None'
    };
    return acc;
  }

  addAccountInformation(model: any) {
    model.type = "Credit";
    this.accountingService.save(model);
    this.addAccount = this.initializeAccount();
  }

  selectEmergencyDetails(emergencyDetails: any) {
    this.selectedRecord = emergencyDetails;
    this.displayEmergencyDialog = true;
  }

  selectPersonalDetails(event, personalDetails: any, overlayPanel: OverlayPanel) {
    this.selectedRecord = personalDetails;
    overlayPanel.toggle(event);
  }

  onDialogHide() {
    this.selectedRecord = null;
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
    });
  }

  getSubscriptionChartData() {
    this.accountingService.getMonthlySubscriptions().subscribe(items => {
      this.monthlyCount = items.length;

      this.accountingService.getQuarterlySubscriptions().subscribe(items => {
        this.quarterlyCount = items.length;

        this.subscrtiptionChart(this.monthlyCount, this.quarterlyCount);
      });
    }); 
  }

  subscrtiptionChart(monthlyNumber: number, quarterlyNumber: number){
    this.subscriptionData = {
      labels: ['Monthly Members','Quarterly Members'],
      datasets: [
          {
              data: [monthlyNumber, quarterlyNumber],
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

  getActiveSubscriptions() {
    this.accountingService.getActiveSubscriptions().subscribe(items => {
      this.activeCount = items.length;
    });
  }

  getInactiveSubscriptions() {
    this.accountingService.getInactiveSubscriptions().subscribe(items => {
      this.inactiveCount = items.length;
    });
  }

  statusChart(active: number, inactive: number) {
    this.statusData = {
      labels: ['Active','Inactive'],
      datasets: [
          {
              data: [active, inactive],
              backgroundColor: [
                  "#4BC0C0",
                  "#FFCE56"
              ],
              hoverBackgroundColor: [
                  "#4BC0C0",
                  "#FFCE56"
              ]
          }]    
      };
  }

  getStatusChartData(){
    this.accountingService.getActiveSubscriptions().subscribe(items => {
      this.activeCount = items.length;

      this.accountingService.getInactiveSubscriptions().subscribe(items => {
        this.inactiveCount = items.length;

        this.statusChart(this.activeCount, this.inactiveCount);
      });
    }); 
  }

  onEditRow(item: any) {
    this.editSubscription = this.cloneSubscripition(item);
    this.displayEditDialog = true;
  }

  cloneSubscripition(item: any) {
    let acc = {
      id: item.id,
      gymid: item.GymId,
      employeeName: item.Name,
      amount: item.Amount,
      startDate: item.StartDate,
      status: item.Status,
      comments: item.Comments,
      phone: item.Phone,
      localContact: item.LocalContact,
      homeContact: item.HomeContact,
      doctorDetails: item.DoctorDetails,
      ailments: item.Ailments
    };
    return acc;
  }

  updateSubscription(model: Subscription) {
    this.accountingService.update(model);
    this.displayEditDialog = false;
    this.editSubscription = this.initializeAccount();
  }

  /*getDiff() {
    this.accountingService.getSubscriptions().subscribe(items => {
      this.count = items.length; 

      this.accountingService.getMonthlySubscriptions().subscribe(items => {
        this.monthlyCount = items.length;
      }); this.diff = this.count - this.monthlyCount; console.log("Diff: " + this.diff);
    });
  }*/

  
}
