import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

@Injectable()
export class UtilService {

  amount: SelectItem[];
  statusValues: SelectItem[];

  constructor() { 
    this.amount = [];
    this.amount.push({ label: '1000', value: 1000 });
    this.amount.push({ label: '2700', value: 2700 });

    this.statusValues = [];
    this.statusValues.push({ label: 'Active', value: 'ACTIVE' });
    this.statusValues.push({ label: 'Inactive', value: 'INACTIVE' });
    this.statusValues.push({ label: 'Disabled', value: 'DISCONTINUED' });
  }

  getAmountValues() {
    return this.amount;
  }

  getStatusValues() {
    return this.statusValues;
  }

}
