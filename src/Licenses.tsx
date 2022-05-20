import {
    Button,
    Container,
    Card
  } from 'react-bootstrap';
  import { BrowserRouterProps , HashRouterProps} from 'react-router-dom';
  import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
  import { useAppContext } from './AppContext';
import { Fragment } from 'react';
import './Licences.css'




  
  export default function Licenses(_props: HashRouterProps) {
    const app = useAppContext();
    const users = app?.users || [];
    
   
  
    return (
      <div className="p-5 mb-4 bg-light rounded-3">
        <Container fluid>
          <h1>Microsoft 365 Licenses </h1>
          <p className="lead">
             Users subscription information
          </p>

          <AuthenticatedTemplate>


          <>
  {[
    'Primary',
    'Secondary',
    'Success',
    'Danger',
    'Warning',
    'Info',
    'Light',
    'Dark',
  ].map((variant) => (


<Card
border="light" 

bg="light"
key={variant}
text="dark"
style={{ width: '100%' }}> 
            {users?.map(user => (<div key={user.id}>
           
           
            <Card.Header>
            <h5>User Details:</h5></Card.Header>
            <Card.Body >  <p><Card.Title>Name:</Card.Title> {user?.displayName}</p>
                          <p><Card.Title>UserPrincipalName:</Card.Title> {user?.userPrincipalName}</p>   
              <p key={user.id}><Card.Title>User id:</Card.Title> {user?.id} </p>
            
       {/* <p>  {app.user?.assignedPlans?.map(plan=> plan.service).join(', ')}</p>  
         
        { <p> <Card.Title><h6>Service:</h6></Card.Title> {app.user?.map(user => (<Fragment key={user.id}>
        {app.user?.assignedPlans?.map(plan=> plan.service).join(', ')}</Fragment>))}</p>} */}
             
             <p><Card.Title>Commercial Subscriptions:</Card.Title> {app.lisens?.map(lisens => (<Fragment key={lisens.id}>
  
  <p className='serviceplan'><h6>ServiceplanInfo:</h6> <span className='plans'> {lisens.servicePlans?.map(({servicePlanName, servicePlanId, appliesTo}) =>(<p key={servicePlanId}>ServicePlanName: {servicePlanName}, ServicePlanId: {servicePlanId}, AppliesTo: {appliesTo} </p>))}
 </span></p>
 <p><h6>SkuId:</h6> {lisens.skuId} (The unique identifier for the SKU.)</p>
  <p><h6>SkuPartNumber:</h6> {lisens.skuPartNumber}</p>
  <p><h6>Id:</h6> {lisens.id}</p>
  
</Fragment>))}</p> 
             
             
              </Card.Body>
                    
            </div>))}
           
            </Card>
              ))}
              </>
           
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
      
            <Button variant='success' onClick={app.signIn!}>Click here to sign in</Button>
          </UnauthenticatedTemplate>
        </Container>
      </div>
    );
  }