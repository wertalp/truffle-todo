import React, { Component, useEffect, useState } from "react";
import {Card, Button, Badge} from 'react-bootstrap' ;
import {ITodo} from '../data-models/models'         ;
import  logo from '../resources/bg3.png'          ;


export const TodoTaskCard : React.SFC<ITodo>  = (props : ITodo) => {
    
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
<Card className="card border-primary mb-3" style={{ width: '18rem' ,margin: '10px'}}>
  <Card.Img variant="top" src={logo} className="infofoto"/>
  <Badge>{props.owner}</Badge>
  <Card.Body>
    <Card.Title>{props.title}</Card.Title>
    <Card.Text>
        {props.description}
    </Card.Text>
    <Button variant="primary" style={{float: 'right'}}>Mint to BC</Button>
  </Card.Body>
  <Badge bg="dark"> <h1 className="small">{props.addresse}</h1> </Badge>
</Card>
   </>)
}