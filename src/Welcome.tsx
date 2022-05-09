import {
    Button,
    Container,
    Card
  } from 'react-bootstrap';
  import { BrowserRouterProps , HashRouterProps} from 'react-router-dom';
  import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
  import { useAppContext } from './AppContext';
import { ReactElement, JSXElementConstructor, ReactFragment, Fragment } from 'react';



  
  export default function Welcome(props: HashRouterProps) {
    const app = useAppContext();
    const users = app?.users || [];
   
  
    return (
      <div className="p-5 mb-4 bg-light rounded-3">
        <Container fluid>
          <h1>Microsoft API Graph </h1>
          <p className="lead">
             Users Microsoft details
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
            <h5>User Info:</h5></Card.Header>
            <Card.Body >  <p><Card.Title>Name:</Card.Title> {user?.displayName}</p>
              <p><Card.Title>Id:</Card.Title> {user?.id}</p>
              
             
              { <p><Card.Title>License:</Card.Title> {user?.licenseDetails?.map(license => (<Fragment key={license.id}>
              <p>Serviceplan: {license.servicePlans?.map(plan=> plan.servicePlanName).join(', ')}</p>
              <p>SkuId: {license.skuId}</p>
              <p>SkuPartNumber: {license.skuPartNumber}</p>
          
              <p>Id: {license.id}</p>
              </Fragment>))}</p> }
             
             
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