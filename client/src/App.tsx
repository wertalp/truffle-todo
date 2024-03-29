import React, { Component, useEffect, useState } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import {Menu} from './components/Menu' ;
import {TodoForm} from './components/TodoForm' ;
import {TodoTaskCard} from './components/TodoTaskCard';
import {ITodo} from './data-models/models' ;
import {Button, Container,Row,Col,CardGroup} from 'react-bootstrap' ;
import { ChangeEvent } from 'react';

import "./App.css";
import { isTemplateTail } from "typescript";
import Footer from "./components/Footer";
import Web3 from "web3";
import { InfoPinner } from "./components/InfoPinner";
import {getAllBlocks} from './utils/utils';


const App = () =>  {

  const myArray   : number[] = [1,2,3,4,5,6,7,8] ;

  const [storageValue, setStorageValue] = useState(null);
  const [web3, setWeb3] = useState( null)    ;
  const [accounts, setAccounts] = useState<string[]>([]) ;
  const [contract, setContract] = useState<any>(null) ;
  const [netId, setNetid] = useState(1)      ;
  const [network, setNetwork] = useState<string>("")   ;

  const [title, setTitle] = useState<string>("")   ;
  const [description, setDescription] = useState<string>("")   ;
  const [owner, setOwner] = useState<string>("")   ;
  const [testTodos, setTestTodos] = useState<ITodo[]>([])   ;
  const [accountBalance, setAccountBalance] = useState<string>("")   ;
  

  const todo: ITodo = {
    id          : 2,
    title       :  "DEMO Title" ,
    description :  "Demo desc"  ,
    owner       :  "wertalpa"
};
 
  useEffect( () => {
       const initialize = async () => {
        try {
          // Get network provider and web3 instance.
          const web3 = await getWeb3();
          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts();
          await setAccounts( accounts) ;
          // Get the contract instance.
          const networkId = await web3.eth.net.getId();
          await setNetid(networkId);

          await web3.eth.getBalance(accounts[0])
          .then( (result: any  ) => web3.utils.fromWei(result,"ether"))
          .then( (balance: any ) => setAccountBalance(balance));

          web3.eth.getBlock(12).then( (block:any) =>  console.log("BlockNUmmer" + block)) ;

          getAllBlocks(web3).then( blocks => JSON.stringify(blocks) )
                            .then(console.log) ;

      try{
          const deployedNetwork = SimpleStorageContract.networks[networkId];
          const instance = new web3.eth.Contract(
            SimpleStorageContract.abi,
            deployedNetwork && deployedNetwork.address);
          setContract(instance);
          setWeb3( web3) ;
        }
      catch(error){
        alert("Fehler");
      }
  } catch (error) {
    // Catch any errors for any of the above operations.
    alert(
      `Failed to load web3, accounts, or contract. Check console for details.`,
    );
    console.error(error);
  }} ;
  initialize() ;
       //runExample() ;

       },[network,testTodos,accounts,accountBalance]) ;



  const infosetter = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    switch (event.target.name){
      case "Titel":          await  setTitle(event.target.value)       ; return ;
      case "Beschreibung":   await setDescription(event.target.value)  ; return ;
      case "Owner":          await setOwner(event.target.value)        ; return ;
    }
    let title = event.target.value ;
     setNetwork( titlt => title.concat(event.target.value)) ;
  }

  
  const testSubmit = (event :ChangeEvent<HTMLInputElement> ) => {
    event.preventDefault();
    //alert (event.target) ;
    console.log(event.target) ;
    setTestTodos( testTodos => [{id:10,owner: owner , description: description,title:title},...testTodos] );
  }

   const generateTodos = () => {
    return (      
      <Row xs={1} md={2}  >
        {testTodos.map((todo, idx) => ( <Col> 
          <TodoTaskCard id={todo.id} title={todo.title} description={todo.description} owner={todo.owner} addresse={accounts[0]}>
          </TodoTaskCard> </Col>
        ))}
      </Row>)
      } 

  const runExample = async () => {
    await contract.methods.set(5).send({ from: accounts[0] });
    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();
    setStorageValue(response) ;
  };

    if (!web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    } 
    return (
      <div className="App">
        <Menu account={accounts[0]} networkId={74557}/> 
        <h3>BlockChain Todo List</h3>
    <Container fluid="lg">
   <Row>
    <Col>   
    <div className="right-float">
    <TodoForm account={accounts[0]}  networkId={1223} testSubmit={testSubmit} handleInput={infosetter}></TodoForm>
    
    <InfoPinner id={1} title={title} description={description} owner={owner} ></InfoPinner> 
    </div>
    </Col>
    <Col > <div className="span-border">
      <h3> Verträge in Account: </h3> {accounts[0]} 
      {accountBalance && <h3> {accountBalance}</h3>}
    { testTodos && generateTodos() }
      </div> 
    </Col>
  </Row>
 
</Container>
</div>
    );
}

export default App;
