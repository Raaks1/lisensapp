import { ISearch } from "./Search";
import { useAppContext } from './AppContext';
import { Fragment } from 'react';
import {
  Button,
  Container,
  Card
} from 'react-bootstrap';
import './UserComponent.css';
import { AuthenticatedTemplate } from "@azure/msal-react";





const UserComponent = (props: { user: ISearch }) => {
  const { user } = props;
  const app = useAppContext();
 
 
 

  return (
<AuthenticatedTemplate>
    <>

    <Card className="cards"
    border="light" 

    bg="light"
    
    text="dark"
    style={{ width: '100%' }}> 

      <Card.Header className="heedsone"><h3 className="head">Search results:</h3></Card.Header>
      
    <Card.Body className="cards">
        <p><h3>Name: </h3><span className="details">{user.displayName}</span></p>
        <p><h4>User Id:</h4><span className="details"> {user.id}</span></p>  
    
   
        </Card.Body>
 

     
  
   {/*  {user.subscribedSku && (
        
        <ul>
          {user.displayName.split(",").map((user) => (
            <li>{user}</li>
          ))}
        </ul>
          )}} 



{/* <p><Card.Title>Assigned:</Card.Title> {user.plan?.map(plan => (<div key={plan.servicePlanId}>
             

              <p><h6>ServicePlanId:</h6> {plan.servicePlanId} </p>
              <p><h6>Service:</h6> {plan.service}</p>
             
             
        
            
</div>))}</p> */}


 
 <p><Card.Header className="heedsone"> <h3 className="head">Commercial subscriptions:</h3></Card.Header> {app.lisens?.map(lisens => (<Fragment key={lisens.id}>
<Card.Body className="cards">
    <p><span className='detail'>SkuId:</span> {lisens.skuId} (The unique identifier for the SKU.)</p>
     <p><span className='detail'>SkuPartNumber:</span> {lisens.skuPartNumber}</p>
     <p><span className='detail'>Id:</span> {lisens.id}</p></Card.Body>
       
     <Card.Header className="heedsone"> <h3 className="head">ServiceplanInfo:</h3></Card.Header>
  <Card.Body className="cards">  <p>
     {lisens.servicePlans?.map(({ servicePlanName, servicePlanId, appliesTo }) => (<p key={servicePlanId}><span id="test">ServicePlanName: </span>{servicePlanName}, <span id="test">ServicePlanId:</span> {servicePlanId}, AppliesTo: {appliesTo} </p>))}
     </p></Card.Body> 

   </Fragment>))}</p> 
   {/*  <p><h6>Assigned Plans:  </h6>
      
      {user.assignedPlan && <pre>{JSON.stringify(user.assignedPlan, undefined, 2)}</pre>}</p>  
 <p><h6>Commerical subscriptions:</h6>
 {user.subscribedSku && <pre>{JSON.stringify(user.subscribedSku, undefined, 2)}</pre>}</p> */}




 

  
  
 
    </Card>
    </>
    </AuthenticatedTemplate>
  );
}; 

export default UserComponent;
