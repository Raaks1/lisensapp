import React from 'react'
import {
  Button,
  Container,
  Card
} from 'react-bootstrap';
import { BrowserRouterProps , HashRouterProps} from 'react-router-dom';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { useAppContext } from './AppContext';
import { Fragment } from 'react';
import './Assignedplans.css'
import CardHeader from 'react-bootstrap/esm/CardHeader';







export default function AssignedPlans(_props: HashRouterProps) {
  const app = useAppContext();
  
  return (
   
    <AuthenticatedTemplate>


    <>



<Card
border="light" 

bg="light"

text="dark"
style={{ width: '100%' }}> 
      
<div>
     
      <Card.Header>
      <h2 className="header">User Details:</h2></Card.Header>

      <Card.Body > 
         
      <p> <h3>Name:</h3> {app.user?.displayName}</p>
      <p ><h4>UserPrincipalName:</h4> {app.user?.userPrincipalName}</p>  
      <p key={app.user?.id}><h5>User id:</h5> {app.user?.id} </p>
      

   
 {/*} { <p> <Card.Title><h5>Service:</h5></Card.Title> {app.plan?.map(plan => (<Fragment key={plan?.servicePlanId}>
 <p> {plan?.service}</p>
 <p> {plan?.servicePlanId}</p>
 <p> {plan?.capabilityStatus}</p>
 <p> {plan?.assignedDateTime}</p>
 
 </Fragment>))}</p>}*/}
       
 <p><Card.Header><h4 className='header'>Commercial Subscriptions:</h4></Card.Header> {app.lisens?.map(lisens => (<Fragment key={lisens.id}>
  <p><span className='detail'>SkuId:</span> {lisens.skuId} (The unique identifier for the SKU.)</p>
  <p><span className='detail'>SkuPartNumber:</span> {lisens.skuPartNumber}</p>
  <p><span className='detail'>Id:</span> {lisens.id}</p>
  
 <Card.Header> <h4 className='header'>ServiceplanInfo:</h4> </Card.Header> {lisens.servicePlans?.map(({servicePlanName, servicePlanId, appliesTo}) =>(<p key={servicePlanId}>
    <span className='plann'>  ServicePlanName:</span> {servicePlanName},<span className='plann'> ServicePlanId:</span> {servicePlanId} {/* AppliesTo: {appliesTo}*/} </p>))}
 
 
  
</Fragment>))}</p> 
       
       
       
        </Card.Body>
              
      </div>
     
      </Card>
  
        </>
      
    </AuthenticatedTemplate>
   
  )

}



