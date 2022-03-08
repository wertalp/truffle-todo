import React, { Component, useEffect,useState } from "react";
import {Card, Form ,Button} from 'react-bootstrap'
import { IMenu } from "../data-models/interfaces";


export const TodoForm = (props :IMenu) => { 

    const [title, setTitle]      = useState('');
    const [lastName,   setLastName]      = useState('');
    const [description, setDescription]  = useState('');
    const [owner, setOwner]              = useState('');

    useEffect( () => {

    
    },[]) ;


 const handleChange = (event: any ) => {
    console.log(event.target.value);
 }


return (
     <div className="taskform">
        <h5>Account:</h5>
        {props.account &&  <h5> <Button type="button" className="btn btn-light"> {props.account} </Button> </h5> }
         <Form >
        <div>
        <label>
        Titel:
        <input name="Titel" value={title} onChange={e => setTitle(e.target.value)}  />
        </label><br/>
         </div>    
     <div>
     <label>
        Description:
        <input name="Beschreibung" value={description} onChange={e => setDescription(e.target.value)}  />
        </label><br/>
     </div>
      <div>
      <label>
        Task-Owner:
        <input name="Owner" value={owner} onChange={e => setOwner(e.target.value)}  />
        </label><br/>
      </div>
        <input type="submit" value="Submit" />
        </Form>
        <Button>{props.account && <div>Accounts are: {props.account} </div>}  </Button> 
        {title}
     </div>

      
    )
}