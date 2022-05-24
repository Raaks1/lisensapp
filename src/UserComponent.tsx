import { ISearch } from "./Search";
import { useAppContext } from './AppContext';
import { Fragment } from 'react';
import {
  Button,
  Container,
  Card
} from 'react-bootstrap';
import './UserComponent.css';





const UserComponent = (props: { user: ISearch }) => {
  const { user } = props;
  const app = useAppContext();
 
 
 

  return (

    <Card>
      <Card.Header><h2 className="head">Search Results:</h2></Card.Header>
    <div className="user">
     
        <p> <h3>Name:</h3> <span className="details">{user.displayName}</span></p>
        <p><h3>User Id:</h3><span className="details"> {user.id}</span></p>  
    
     
        
    

     
  
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

     
          
 
 <p><Card.Header> <h3 className="head">Commercial Subscriptions:</h3></Card.Header> {app.lisens?.map(lisens => (<Fragment key={lisens.id}>
        <div className="margin">     <p><h5>SkuId:</h5> {lisens.skuId} (The unique identifier for the SKU.)</p>
              <p><h5>SkuPartNumber:</h5> {lisens.skuPartNumber}</p>
              <p><h5>Id:</h5> {lisens.id}</p>  </div> 
  
             <Card.Header><h3 className="head">ServiceplanInfo:</h3></Card.Header> {lisens.servicePlans?.map(({servicePlanName, servicePlanId, appliesTo}) =>(<p key={servicePlanId}><span id="test">ServicePlanName: </span>{servicePlanName}, <span id="test">ServicePlanId:</span> {servicePlanId}, AppliesTo: {appliesTo} </p>))}
           
              
        </Fragment>))}</p> 
   {/*  <p><h6>Assigned Plans:  </h6>
      
      {user.assignedPlan && <pre>{JSON.stringify(user.assignedPlan, undefined, 2)}</pre>}</p>  
 <p><h6>Commerical subscriptions:</h6>
 {user.subscribedSku && <pre>{JSON.stringify(user.subscribedSku, undefined, 2)}</pre>}</p> */}





  
    </div> 
    </Card>
  );
}; 

export default UserComponent;
