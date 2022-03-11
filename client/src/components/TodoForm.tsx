import React, { Component, useEffect,useState } from "react";
import {Card, Form ,Button} from 'react-bootstrap'
import { IMenu } from "../data-models/interfaces";
import { ChangeEvent } from 'react';

export const TodoForm = (props :IMenu) => { 

    const [title, setTitle]      = useState('Erster Task');
    const [lastName,   setLastName]      = useState('Wertal');
    const [description, setDescription]  = useState('in Bern suchen ..');
    const [owner, setOwner]              = useState('WERTALPA');

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
        <h5>CONTRACT:</h5>
        <p className="small"> ACCOUNT</p>
        <Button style={{float: 'right'}}  variant="outline-dark" size="sm" > {props.account && <div>{props.account} </div>}  </Button> 
         <Form onSubmit={props.testSubmit}  >
        <div>
        <label>
        Titel:
        <input name="Titel" value={title}  placeholder="1 Task" onChange={e => handleChange(e)}  />
        </label><br/>
         </div>    
     <div>
     <label>
        Description:
        <input name="Beschreibung" placeholder="in Bern zu tun" value={description} onChange={e => handleChange(e)}  />
        </label><br/>
     </div>
      <div>
      <label>
        Task-Owner:
        <input name="Owner" value={owner} placeholder="WERTALPA" onChange={e => handleChange(e)}  />
        </label><br/>
      </div>
        <input type="submit" value="Create" class="custom-btn" />
        </Form>
     </div>

      
    )
}