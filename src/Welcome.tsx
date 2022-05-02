import {
    Button,
    Container
  } from 'react-bootstrap';
  import { BrowserRouterProps } from 'react-router-dom';
  import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
  import { useAppContext } from './AppContext';

  
  export default function Welcome(props: BrowserRouterProps) {
    const app = useAppContext();
  
    return (
      <div className="p-5 mb-4 bg-light rounded-3">
        <Container fluid>
          <h1>Microsoft API Graph </h1>
          <p className="lead">
             Microsoft Graph API to access a user's data from React
          </p>
          <AuthenticatedTemplate>
            <div>
              <h4>Welcome {app.user?.displayName || ''}!</h4>
              <p>Email: {app.user?.email}</p>
              <p>userPrincipalName: {app.user?.userPrincipalName}</p>
              <p>Id: {app.user?.id}</p>
              <p>Role: {app.user?.jobTitle}</p>
              <p>Phone: {app.user?.mobilePhone}</p>
              <h5>License Details</h5>
              <p>Serviceplan: {app.license?.servicePlans}</p>
              <p>SkuId: {app.license?.skuid}</p>
              <p>SkuPartNumber: {app.license?.skuPartNumber}</p>
              <p>Id: {app.license?.id}</p>
              <h5>License</h5>
              <p>License: {app.lisens?.licenseDetails}</p>
              <p>Id: {app.lisens?.id}</p>
              <h5>ServicePlan</h5>
              <p>Can be assigned to: {app.serviceplan?.appliesTo}</p>
              <p>Status: {app.serviceplan?.provisioningStatus}</p>
              <p>Unique plan id: {app.serviceplan?.servicePlanId}</p>
              <p>Plan Name: {app.serviceplan?.servicePlanName}</p>
              <p>Assigned License: {app.assigned?.assignedLicenses}</p>
              
                   
                    
                    
            </div>
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <Button variant='success' onClick={app.signIn!}>Click here to sign in</Button>
          </UnauthenticatedTemplate>
        </Container>
      </div>
    );
  }