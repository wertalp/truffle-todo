// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Tasky { 
   
     struct Task {
       uint   id ;
       string title ;
       string description;
       bool   finished ;  
       uint   createdTime ;
     }
    event TaskCreated(address _from, address _to, uint _amount);
     Task  t ;
     mapping( address => Task) tasks ;
     int count = 0 ; 

  constructor( string  memory _title , string memory _beschreibung, bool _finished)  {
      count++ ;
      t = Task(count ,_title,_beschreibung, _finished, now) ;
      createTask(t);
   } 

   function createTask(Task memory _task) private {
    count ++;
     t = Task(_task);
    tasks[address] = t ;

    emit TaskCreated(msg.sender, t, false);
  }



 
}