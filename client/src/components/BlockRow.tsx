import React, { Component, useEffect, useState } from "react";
import {Card, Button, Badge, Form} from 'react-bootstrap' ;
import { isBlock } from "typescript";
import {ITodo,IBlock} from '../data-models/models'    
import blockchainImg from '../resources/bc2.png' // relative path to image 

export const BlockRow : React.FC<IBlock> = (props) => {

    // Custom interface
    const [blockHash, setBlockhash] = React.useState<string>("");

    useEffect( () => {
        console.log("initializing");
        
    },[])

    return (
        <div className="block">
             <p className="blockinfolarge"> NUMBER:  {props.number}</p>    
            <p className="blockinfosmall"> BLOCKHASH:  {props.hash}</p>    
            <p className="blockinfolarge"> GAS:  {props.gasLimit}</p>   
            <p className="blockinfosmall"> TRANSACTION:  {props.transactions}</p>   
            <p className="blockinfomedium"> SIZE:  {props.size}</p>   
          
         {props.gasLimit}
       </div>   
    )
}
