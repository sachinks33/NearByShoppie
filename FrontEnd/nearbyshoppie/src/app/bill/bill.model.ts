export class BillModel{
    constructor(
        public customerName:String,
        public shopName:String,
        public customerMobile: number,
        public pinCode:number,
        public customerLocation:String,
        public status:String,
        public bill:any,
        public total:number

    ){}
}