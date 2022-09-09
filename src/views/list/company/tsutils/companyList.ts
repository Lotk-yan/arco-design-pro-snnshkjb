import axios from "axios";

export interface companyRecord {
    id:number;
    comId?:string;
    comName:string;
    linkMan?:string;
    linkManId?:number;
    linkPhone?:string;
    address?:string;
    postalCode?:string;
    legalPerson?:string;
    creditCode?:string;
    paymentAccountNo?:string;
    paymentBank?:string;
}

export function queryCompanySelect(params: { comName?: string }) {
    return axios.post('/company/querySelect',params)
}





