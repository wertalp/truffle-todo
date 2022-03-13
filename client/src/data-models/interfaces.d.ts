import { FormEventHandler } from "react";

export interface IMenu {

    account    : string ;
    networkId  : number ;
    userPoolId ?: string ;
    handleInput ? : (_input :Event)  => void ;
    formSubmit  ? : (_input :FormEvent<HTMLFormElement>)  => void ;
    connectBC   ? : () => void ;
}