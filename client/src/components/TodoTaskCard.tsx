import React, { Component, useEffect, useState } from "react";
import {Card, Button, Badge} from 'react-bootstrap' ;
import {ITodo} from '../data-models/models'    


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
<Card className="card border-primary mb-3" style={{ width: '18rem' }}>
  <Card.Img variant="top" src="holder.js/100px180" />
  <Badge>{props.owner}</Badge>
  <Card.Body>
    <Card.Title>{props.title}</Card.Title>
    <Card.Text>
     {props.id}
    </Card.Text>
    <Button variant="primary">Mint to BC</Button>
  </Card.Body>
</Card>
   </>)
}