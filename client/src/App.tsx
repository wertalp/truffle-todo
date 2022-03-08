import React, { Component, useEffect, useState } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import {Menu} from './components/Menu' ;
import {TodoForm} from './components/TodoForm' ;
import {TodoTaskCard} from './components/TodoTaskCard';
import {ITodo} from './data-models/models' ;
import {Button} from 'react-bootstrap' ;

import "./App.css";
import { isTemplateTail } from "typescript";


const App = () =>  {


  const myArray : number[] = [1,2,3,4,5,6,7,8] ;


  const [storageValue, setStorageValue] = useState(null);
  const [web3, setWeb3] = useState( null)    ;
  const [accounts, setAccounts] = useState<string[]>([]) ;
  const [contract, setContract] = useState() ;
  const [netId, setNetid] = useState(1)      ;
  const [network, setNetwork] = useState(null)   ;
  


  const todo: ITodo = {
    id          : 1,
    title       :  "DEMO Title" ,
    description :  "Demo desc" ,
    status      : "Pending" ,
    startDate   : new Date()   ,  
    endDate     : new Date()   ,
    completed   :  false,  


};
 
  useEffect( () => {
       const initialize = async () => {
        try {
          // Get network provider and web3 instance.
          const web3 = await getWeb3();
  
          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts();

          setAccounts( accounts) ;
          
          // Get the contract instance.
          const networkId = await web3.eth.net.getId();
          setNetid(networkId);
          const deployedNetwork = SimpleStorageContract.networks[networkId];
          const instance = new web3.eth.Contract(
            SimpleStorageContract.abi,
            deployedNetwork && deployedNetwork.address,
          );
       
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          setContract(instance);
          setWeb3( web3) ;
 
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }} ;
       initialize() ;
       //runExample() ;

       },[]) ;


  const runExample = async () => {

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
   setStorageValue(response) ;
  };
 
    if (!web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    } 
    return (
      <div className="App">
        <Menu account={accounts[0]} networkId={74557}/> 
        <h1>BlockChain Todo List</h1>
        <ul> 
        {accounts && accounts.map( acc => <li> {acc} </li>) }
        </ul>
      
        <TodoTaskCard id={1} description={"MEI desc"} status={"Pending"} title="Mein Title" startDate={new Date()} endDate={new Date()}completed={false}  />
        <div>The stored value is: {netId}</div>
      <TodoForm account={accounts[0]}  networkId={1223}></TodoForm>
      </div>
    );
}

export default App;
