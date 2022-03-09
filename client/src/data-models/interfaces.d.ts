import { FormEventHandler } from "react";

export interface IMenu {

    account    : string ;
    networkId  : number ;
    handleInput ? : (_input :Event)  => void ;
    testSubmit  ? : (_input :FormEvent<HTMLFormElement>)  => FormEventHandler<HTMLFormElement> ;
}