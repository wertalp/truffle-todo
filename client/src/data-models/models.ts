 enum CATEGORY {
    PRIVAT   = 'privat'  ,
    PUBLIC   = 'public'  ,
    BUSINESS = 'business',
    SECRET   = 'secret'
}
 export   interface ITodo_new {
        id          : number ,
        title       : string ,
        description : string ,
        status      : string ,
        startDate   : Date   ,  
        endDate     : Date   ,
        completed   : boolean,  
        category    ?: CATEGORY 
    }

    export   interface ITodo {
        id          : number ,
        title       : string ,
        description : string ,
        owner       : string ,
        addresse?    : string 
     }

     export interface IBlock{
         number ? : number   ,
         hash   : string   ,
         transactions ?: string[];
         size     ?: number,
         gasLimit ? : number
     }


