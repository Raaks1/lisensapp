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
      <h5 className='Header'>User Details:</h5></Card.Header>

      <Card.Body > 
         
      <p><Card.Title>Name:</Card.Title> {app.user?.displayName}</p>
      <p><Card.Title>UserPrincipalName:</Card.Title> {app.user?.userPrincipalName}</p>  
<p key={app.user?.id}><Card.Title>User id:</Card.Title> {app.user?.id} </p>
      

   
  { <p> <Card.Title><h5>Service:</h5></Card.Title> {app.plan?.map(plan => (<Fragment key={plan?.service}>
 <p> {plan?.service}</p>
 <p> {plan?.servicePlanId}</p>
 <p> {plan?.assignedDateTime}</p>
 <p> {plan?.assignedDateTime}</p>
 
 </Fragment>))}</p>}
       
 <p><Card.Title>Commercial Subscriptions:</Card.Title> {app.lisens?.map(lisens => (<Fragment key={lisens.id}>
  <p><h6>SkuId:</h6> {lisens.skuId} (The unique identifier for the SKU.)</p>
  <p><h6>SkuPartNumber:</h6> {lisens.skuPartNumber}</p>
  <p><h6>Id:</h6> {lisens.id}</p>
  
  <p className='serviceplan'><h6>ServiceplanInfo:</h6> <span className='plans'> {lisens.servicePlans?.map(({servicePlanName, servicePlanId, appliesTo}) =>(<p key={servicePlanId}>
  ServicePlanName: {servicePlanName}, ServicePlanId: {servicePlanId}, AppliesTo: {appliesTo} </p>))}
 </span></p>
 
  
</Fragment>))}</p> 
       
       
       
        </Card.Body>
              
      </div>
     
      </Card>
  
        </>
      
    </AuthenticatedTemplate>
   
  )

}



