import React, { Component, useEffect, useState } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Todo from "./contracts/Todo.json";
import getWeb3 from "./getWeb3";
import Web3 from "web3";
import {Menu} from './components/Menu' ;
import {TodoForm} from './components/TodoForm' ;
import {TodoTaskCard} from './components/TodoTaskCard';
import {IBlock, ITodo} from './data-models/models' ;
import {Button, Container,Row,Col,CardGroup} from 'react-bootstrap' ;
import { ChangeEvent } from 'react';

import "./App.css";
import { isTemplateTail } from "typescript";
import Footer from "./components/Footer";
import { InfoPinner } from "./components/InfoPinner";
import {getAllBlocks, createContract,showError} from './utils/utils';
import {BlockRow} from './components/BlockRow' ;

import { Amplify, Auth } from 'aws-amplify';

import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';


import awsExports from './aws-exports';

Amplify.configure(awsExports);

const App = ( ) =>  {

  const myArray   : number[] = [1,2,3,4,5,6,7,8] ;

  const [storageValue, setStorageValue] = useState(null);
  const [web3, setWeb3] = useState(null)    ;
  const [accounts, setAccounts] = useState<string[]>([]) ;
  const [contract, setContract] = useState<Web3.eth.Contract>(null) ;
  const [netId, setNetid] = useState(1)      ;
  
  const [title, setTitle] = useState<string>("")   ;
  const [description, setDescription] = useState<string>("")   ;
  const [owner, setOwner] = useState<string>("")   ;
  const [testTodos, setTestTodos] = useState<ITodo[]>([])   ;
  const [accountBalance, setAccountBalance] = useState<string>("")   ;
  const [blocks ,setBlocks] = useState<IBlock[]>([]);
  const [connected,setConnected] = useState<boolean>(false) ; 
  const [iamconfig,setIamConfig] = useState<any>({});
  
  const todo: ITodo = {
    id          : 2,
    title       :  "DEMO Title" ,
    description :  "Demo desc"  ,
    owner       :  "wertalpa"
};
   let myweb3 : Web3  ;
   const currentConfig = Auth.configure();

  useEffect( () => {
    const startwebup = async () => {
      if (window.ethereum ){ 
        try {
          console.log("Aufruf useeffect initialize conencted: "+connected)                 ;  
          console.log("Aufruf useeffect initialize AUTH: "+ JSON.stringify(currentConfig)) ;  
          getWeb3()
              .then( (web3)   => setWeb3(web3),
                    (error)  => showError(error) ) ;
           }
           catch(e: any ) {
           console.log("error"); 
           }
      }}

     
    const initialize = async () => {
     
      try {
        web3.eth.requestAccounts().then( (account : any ) => {setAccounts(account) })
        web3.eth.net.getId().then( (netId:any) => setNetid(netId))
        web3.eth.getBalance(accounts[0])
            .then( (result: any  ) => web3.utils.fromWei(result,"ether"))
            .then( (balance: any ) => setAccountBalance(balance));

        getAllBlocks(web3).then( blocks => setBlocks(blocks) )
                          .then(console.log) ;
        setIamConfig(currentConfig);                   
       }
       catch (error) {
        alert(
           `Failed to load web3, accounts, or contract. Check console for details.`,
         );
         console.error(error);
        }
      }

      startwebup() ; 
      connected && initialize() ;
  
       },[connected, netId]) ;


  const infosetter = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    switch (event.target.name){
      case "Titel":          await  setTitle(event.target.value)       ; return ;
      case "Beschreibung":   await setDescription(event.target.value)  ; return ;
      case "Owner":          await setOwner(event.target.value)        ; return ;
    }
    let title = event.target.value ;
    
  }

  const connecttoBC = async () => {
    setConnected(connected => ! connected) ;
   // setNetid(netId => netId +1) ;
  }

  
  const formSubmit = async (event :ChangeEvent<HTMLInputElement> ) => {
    event.preventDefault();
    //alert (event.target) ;
    console.log(event.target) ;
    let instance = await new web3.eth.Contract(
      Todo.abi,
      "0x55EF2E4015AcC605789BA5D09299e50007dbd0e3",
      {
        from: '0x56D199C4C9479DEcFd9504785ADD14aeeDEe732a', // default from address
        gasPrice: '200000000000000' }) ;
     setContract(instance);  
     instance.methods.createTask("Fenster Putzen").send({ from: accounts[0] }).
      then( (info: any) => console.log(JSON.stringify(info) ));
        
    // Get the value from the contract to prove it worked.
    const response = await instance.methods.createTask("WIEDER").call(); 

    //runExample() ;
    setWeb3(web3) ;

    setTestTodos( testTodos => [{id:10,owner: owner , description: description,title:title},...testTodos] );
  }

   const generateTodos = () => {
    return (      
      <Row xs={1} lg={2}  >
        {testTodos.map((todo, idx) => ( <Col> 
          <TodoTaskCard id={todo.id} title={todo.title} description={todo.description} owner={todo.owner} addresse={accounts[0]}>
          </TodoTaskCard> </Col>
        ))}
      </Row>)
      } 


   const generateBlocks = () => {
     return (
      <ul>
      {blocks.filter( (item, index, array) => index >= array.length-3  )
      .map( (block : IBlock, index :number, array :IBlock[]) => 
              { 
                return <li>  <BlockRow 
                                hash={block.hash} 
                                number={block.number} 
                                size={block.size} 
                                transactions={block.transactions}
                                gasLimit={block.gasLimit} > 
                            </BlockRow></li>}  )}
      </ul>
     )
   }   

  const runExample = async () => {
    await contract.methods.createTask("FensterPutzen").send({ from: accounts[0] });
    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();
    setStorageValue(response) ;
  };


    return (
      <div className="App">
        <Menu account={accounts[0]} networkId={netId} connectBC={connecttoBC} userPoolId={iamconfig.userPoolId} /> 
        <h3>BlockChain Todo List </h3>
    <Container fluid="lg">
   <Row>
    <Col md="2">   
    <div className="marge-float-right">
      <TodoForm account={accounts[0]}  networkId={1223} formSubmit={formSubmit} handleInput={infosetter}></TodoForm>
    </div>
    <div className='InfoBox marge-float-right'>
      <InfoPinner id={1} title={title} description={description} owner={owner} ></InfoPinner> 
    </div>
    </Col>

    <Col md="6" > <div className="span-border">
      <h5> Verträge in Account: </h5> {accounts[0]} 
      {accountBalance && <h5> {accountBalance}</h5>}
     { testTodos && generateTodos() }
      </div> 
    </Col>

    <Col md="3"> 
     { blocks && generateBlocks()}
    </Col>
  </Row>
 
</Container>
<AmplifySignOut/>
</div>
    );
}

export default withAuthenticator(App);
