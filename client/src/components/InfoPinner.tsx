import React, { Component, useEffect, useState } from "react";
import {Card, Button, Badge, Form} from 'react-bootstrap' ;
import {ITodo} from '../data-models/models'    
import blockchainImg from '../resources/bc2.png' // relative path to image 


export const InfoPinner : React.SFC<ITodo>  = (props : ITodo) => {
    
    const [created, setCreated] = useState(Boolean );
    useEffect( () => {
     try {
        props.id = 1                   ;
        props.title = "Erster Task"    ;
        props.description = "SECRET"   ;
        setCreated( created => true )  ;
     }
    catch( error )
          { console.log("Error occured in Form Creating:")}     
        },[]) ;

return (
   <> 
<Card className="card border-info mb-3" style={{ width: '12rem'}}>
  <Card.Img variant="top" src={blockchainImg} className="infofoto"  />
     {props.title ? <Badge> props.title </Badge> : <Badge></Badge>}
  <Card.Body>
    <Card.Text>
    <Form>
  <fieldset disabled>
    <Form.Group className="mb-3">
      <Form.Label htmlFor="disabledTextInput">Description</Form.Label>
      <Form.Control id="disabledTextInput" placeholder={props.description} />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label htmlFor="disabledSelect">Owner</Form.Label>
      <Form.Select id="disabledSelect">
        <option>{props.owner}</option>
      </Form.Select>
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Check
        type="checkbox"
        id="disabledFieldsetCheck"
        label="Can't check this"
      />
    </Form.Group>
  </fieldset>
</Form>
    </Card.Text>
  </Card.Body>
</Card>
   </>)
}