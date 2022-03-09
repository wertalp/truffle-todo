import React, { Component, useEffect,useState } from "react";
import {Card, Form ,Button} from 'react-bootstrap'
import { IMenu } from "../data-models/interfaces";
import { ChangeEvent } from 'react';

export const TodoForm = (props :IMenu) => { 

    const [title, setTitle]      = useState('');
    const [lastName,   setLastName]      = useState('');
    const [description, setDescription]  = useState('');
    const [owner, setOwner]              = useState('');

    useEffect( () => {

    
    },[]) ;


 const handleChange = async (event: ChangeEvent<HTMLInputElement> ) => {
    event.preventDefault() ;
      
   switch (event.target.name) {

      case "Titel":          await setTitle(event.target.value) ; 
                             props.handleInput(event)       ; return ;
      case "Beschreibung":   await setDescription(event.target.value); 
                             props.handleInput(event)  ; return ;
      case "Owner":          await setOwner(event.target.value) ;
                             props.handleInput(event)    ; return ;
   }
   
    console.log(event.target.value);
 }


return (
     <div className="taskform">
        <h5>Account:</h5>
        {props.account &&  <h5> <Button type="button" className="btn btn-light"> {props.account} </Button> </h5> }
         <Form onSubmit={props.testSubmit} >
        <div>
        <label>
        Titel:
        <input name="Titel" value={title} onChange={e => handleChange(e)}  />
        </label><br/>
         </div>    
     <div>
     <label>
        Description:
        <input name="Beschreibung" value={description} onChange={e => handleChange(e)}  />
        </label><br/>
     </div>
      <div>
      <label>
        Task-Owner:
        <input name="Owner" value={owner} onChange={e => handleChange(e)}  />
        </label><br/>
      </div>
        <input type="submit" value="Submit" />
        </Form>
        <Button>{props.account && <div>Accounts are: {props.account} </div>}  </Button> 
     </div>

      
    )
}