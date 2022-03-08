 enum CATEGORY {
    PRIVAT   = 'privat'  ,
    PUBLIC   = 'public'  ,
    BUSINESS = 'business',
    SECRET   = 'secret'
}
 export   interface ITodo {
        id          : number ,
        title       : string ,
        description : string ,
        status      : string ,
        startDate   : Date   ,  
        endDate     : Date   ,
        completed   : boolean,  
        category    ?: CATEGORY 
    }

