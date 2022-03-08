import React, { Component, useEffect, useState } from "react";
import {Form} from 'react-bootstrap' ;
import {ITodo} from '../data-models/models'    


export const TodoTaskCard : React.SFC<ITodo>  = (props : ITodo) => {
    
    const [created, setCreated] = useState(Boolean );
    useEffect( () => {
     try {
        props.id = 1                   ;
        props.title = "Erster Task"    ;
        props.description = "SECRET"   ;
        props.startDate   = new Date() ;
        props.endDate     = new Date() ;
        props.status      = "Pending"  ;
        props.completed   = false      ;
        setCreated( created => true )  ;
     }
    catch( error )
          { console.log("Error occured in Form Creating:")}     
        },[]) ;

return (
   <div> 
        <Form.Group className="mb-3">
            <Form.Label>CHAIN ID</Form.Label>
            <Form.Control placeholder="00000000" disabled />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>CONTRACT Informations</Form.Label>
            <Form.Text id="" > </Form.Text>
    
            <Form.Select disabled>
            <option>Disabled select</option>
            </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Check type="checkbox" label="Can't check this" disabled />
        </Form.Group>
   </div>)
}