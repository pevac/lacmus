class  Client {
    public id: string;
    public name: string;
    public gender: string;
    public phone: string;
    public email: string;
    public address: string;
    public description: string;

    constructor(client: Client) {
        this.id = client.id;
        this.name = client.name;
        this.gender = client.gender;
        this.phone = client.phone;
        this.email = client.email;
        this.address = client.address;
        this.description = client.description;
    }
}

export class  ClientResponce extends Client {
    public birthYear: number;
    public birthMonth: number;
    public birthDay: number;
    constructor(client: ClientForm) {
        super(client);
        this.birthYear = new Date(client.fullBirthDay).getFullYear();
        this.birthMonth = new Date(client.fullBirthDay).getMonth();
        this.birthDay = new Date(client.fullBirthDay).getDate();
    }
}

export class  ClientForm extends Client {
    public fullBirthDay: Date;
    constructor(client: ClientResponce) {
        if( client != null ) {
            super(client);
            this.fullBirthDay = client.birthYear&&client.birthMonth&&client.birthDay ?
                new Date(`${client.birthYear}-${client.birthMonth}-${client.birthDay}`) : null;
        }
    }
}

// export class  Client {
//     public name: string;
//     public gender: string;
//     public phone: string;
//     public email: string;
//     public address: string;
//     public description: string;
//     public birthYear: number;
//     public birthMonth: number;
//     public birthDay: number;

//     constructor(client: Client) {
//         if(client != null) {
//             this.name = client.name;
//             this.gender = client.gender;
//             this.phone = client.phone;
//             this.email = client.email;
//             this.address = client.address;
//             this.description = client.description;
//             this.birthYear = client.birthYear;
//             this.birthMonth = client.birthMonth;
//             this.birthDay = client.birthDay;
//         }
//     }
   
//     get fullBirthDay(): any {
//         if(this.birthYear || this.birthMonth || this.birthDay) {
//            return  new Date(`${this.birthYear}-${this.birthMonth}-${this.birthDay}`);
//         } else {
//             return null;
//         }
//     }

//     set fullBirthDay(bd: any) {
//         this.birthYear = new Date(bd.fullBirthDay).getFullYear();
//         this.birthMonth = new Date(bd.fullBirthDay).getMonth();
//         this.birthDay = new Date(bd.fullBirthDay).getDate();
//     }
// }
