export interface Transaction {
    id: string,
    employeeName: string,       //John Doe
    type: string,       // Credit/Debit
    amount: number,     // 1000 / 2700
    paymentDate: Date   // 01/01/2099
}