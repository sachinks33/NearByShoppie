export class UserModel{
    constructor(
        public userType:string,
        public name:string,
        public mobile: number,
        public email:string,
        public pinCode:number,
        public location:string,
        public password:string
    ){}
}