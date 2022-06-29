import { ISearch } from "./Search";
import { useAppContext } from './AppContext';
import { Fragment } from 'react';
import {
  
  Container,
  Card
} from 'react-bootstrap';
import './UserComponent.css';
import { AuthenticatedTemplate } from "@azure/msal-react";





const UserComponent = (props: { user: ISearch }) => {
  const { user } = props;
  const app = useAppContext();
 
 
 

  return (
    <Container fluid>
    <div className="shadow p-5 mb-4 bg-light rounded-3 text-dark">
<AuthenticatedTemplate>
    <>

    <Card className="cards"
    style={{ width: "100%", border: "none" }}

    bg="light"
    
    text="dark"> 
<div className="hider">
      <Card.Header className="headersone"><h4 className="header">Search results:</h4></Card.Header></div>
      
    <Card.Body className="cards">
    <div className="p1">
    <div className="h3">Name: </div>{user.displayName}</div>
    <div className="p1">
    <div className="h3">PrincipalName: </div>{user.principalName} </div> 
    <div className="p1">
    <div className="h3"> User Id:</div> {user.id} </div>
    
   
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


 
 <div><div className="hider"><Card.Header className="headerstwo"> <h4 className="header">Commercial subscriptions:</h4></Card.Header></div> {app.lisens?.map(lisens => (<Fragment key={lisens.id}>
<Card.Body className="cards">
    <p><span className='detail'>SkuId:</span> {lisens.skuId} (The unique identifier for the SKU.)</p>
     <p><span className='detail'>SkuPartNumber:</span> {lisens.skuPartNumber}</p>
     <p><span className='detail'>Id:</span> {lisens.id}</p></Card.Body>
       
     <div className="hider">     <Card.Header className="headerstwo"> <h4 className="header">ServiceplanInfo:</h4></Card.Header></div>
  <Card.Body className="cards">  {app.org?.map((org) =>  ( <Fragment key={org?.id}>


                      {" "}
                      {org.assignedPlans?.map(
                        (
                          {
                            service,
                            servicePlanId,
                            capabilityStatus,
                            assignedDateTime,
                          },
                          i
                        ) => (
                          <p key={app.user?.id + "_" + i}>
                            <span id="test"> Service:</span> {service}{" "}
                           
                         
                          </p>
                        )
                      )}
                    
                
                    </Fragment>))}</Card.Body>
                    <Card.Body className="cards">
     {lisens.servicePlans?.map(({ servicePlanName, servicePlanId, appliesTo }) => (<p key={servicePlanId}>

  
       <span id="test">ServicePlanName: </span>{servicePlanName} <span id="test">ServicePlanId:</span> {servicePlanId} <span id="test">AppliesTo: </span> {appliesTo}</p>))}   
   
       </Card.Body>
   </Fragment>))}</div> 
   {/*  <p><h6>Assigned Plans:  </h6>
      
      {user.assignedPlan && <pre>{JSON.stringify(user.assignedPlan, undefined, 2)}</pre>}</p>  
 <p><h6>Commerical subscriptions:</h6>
 {user.subscribedSku && <pre>{JSON.stringify(user.subscribedSku, undefined, 2)}</pre>}</p> */}




 

  
  
 
    </Card>
    </>
    </AuthenticatedTemplate>
    </div>
    </Container>
  );
}; 

export default UserComponent;
