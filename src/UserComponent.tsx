import { ISearch } from "./Search";
import { useAppContext } from './AppContext';
import { Fragment } from 'react';
import {
  Button,
  Container,
  Card
} from 'react-bootstrap';





const UserComponent = (props: { user: ISearch }) => {
  const { user } = props;
  const app = useAppContext();
 

  return (
    <div className="user">
      <div className="displayName">
        <p>{user.displayName}</p>
      
      </div>
       <p><h6>User Id:</h6>{user.id}</p>
    

     
  
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

     
          
 
 <p><Card.Title>Commercial Subscriptions:</Card.Title> {app.lisens?.map(lisens => (<Fragment key={lisens.id}>
              <p><h6>SkuId:</h6> {lisens.skuId} (The unique identifier for the SKU.)</p>
              <p><h6>SkuPartNumber:</h6> {lisens.skuPartNumber}</p>
              <p><h6>Id:</h6> {lisens.id}</p>
  
              <p className='serviceplan'><h6>ServiceplanInfo:</h6> <span className='plans'> {lisens.servicePlans?.map(({servicePlanName, servicePlanId, appliesTo}) =>(<p key={servicePlanId}>ServicePlanName: {servicePlanName}, ServicePlanId: {servicePlanId}, AppliesTo: {appliesTo} </p>))}
             </span></p>
             
              
        </Fragment>))}</p> 
      
    {/* <p><h6>Assigned Plans:  </h6>
      
      {user.assignedPlan && <pre>{JSON.stringify(user.assignedPlan, undefined, 2)}</pre>}</p>  
 <p><h6>Commerical subscriptions:</h6>
{user.subscribedSku && <pre>{JSON.stringify(user.subscribedSku, undefined, 2)}</pre>}</p>*/}
  
    </div> 
  );
}; 

export default UserComponent;
