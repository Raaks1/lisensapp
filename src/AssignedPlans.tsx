import React from 'react'
import {
  Button,
  Container,
  Card,
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
    <div className="p-5 mb-4 mt-4 bg-light rounded-3 text-dark">
      <Container fluid>
      <h1 className="header">User overview</h1>
        <p className="lead">Logged in user's personal license and service information</p>
    <AuthenticatedTemplate>


    <>



<Card
border="none" 

bg="light"

text="dark"
style={{ width: '100%' }}> 
      

<div className="hider"> 
      <Card.Header className='heedsone'>
      <h4 className="header">User Details:</h4></Card.Header></div>

      <Card.Body className='cards'> 
         
      <p> <h3>Name:</h3> {app.user?.displayName}</p>
      <p ><h4>UserPrincipalName:</h4> {app.user?.userPrincipalName}</p>  
      <p key={app.user?.id}><h5>User id:</h5> {app.user?.id} </p>
      
      </Card.Body>
   
 {/*} { <p> <Card.Title><h5>Service:</h5></Card.Title> {app.plan?.map(plan => (<Fragment key={plan?.servicePlanId}>
 <p> {plan?.service}</p>
 <p> {plan?.servicePlanId}</p>
 <p> {plan?.capabilityStatus}</p>
 <p> {plan?.assignedDateTime}</p>
 
 </Fragment>))}</p>}*/}
       
 <div className="hider"><Card.Header className='heedstwo'><h4 className='header'>Commercial Subscriptions:</h4></Card.Header></div>
  {app.lisens?.map(lisens => (<Fragment key={lisens.id}>
     <Card.Body className='cards'>
  <p><span className='detail'>SkuId:</span> {lisens.skuId} (The unique identifier for the SKU.)</p>
  <p><span className='detail'>SkuPartNumber:</span> {lisens.skuPartNumber}</p>
  <p><span className='detail'>Id:</span> {lisens.id}</p>   </Card.Body>
  <div className="hider">
 <Card.Header className="heedstwo"> <h4 className='header'>ServiceplanInfo:</h4> </Card.Header></div>
 <Card.Body className="cards"><p>
  {lisens.servicePlans?.map(({servicePlanName, servicePlanId, appliesTo}) =>(<p key={servicePlanId}>
    <span className='plann'>  ServicePlanName:</span> {servicePlanName},<span className='plann'> ServicePlanId:</span> {servicePlanId} {/* AppliesTo: {appliesTo}*/} </p>))}</p></Card.Body>
 
 
  
</Fragment>))}
       
       
       
        
              
     
     
      </Card>
  
        </>
      
    </AuthenticatedTemplate>
    </Container>
    </div>
  )

}






/** Joar lagrer data */

const domedata1 = [
  {
      "assignedDateTime": "2021-11-24T12:30:45Z",
      "capabilityStatus": "Enabled",
      "service": "LearningAppServiceInTeams",
      "servicePlanId": "b76fb638-6ba6-402a-b9f9-83d28acb3d86"
  },
  {
      "assignedDateTime": "2021-11-24T12:30:45Z",
      "capabilityStatus": "Enabled",
      "service": "SharePoint",
      "servicePlanId": "db4d623d-b514-490b-b7ef-8885eee514de"
  },
  {
      "assignedDateTime": "2021-01-22T07:24:03Z",
      "capabilityStatus": "Enabled",
      "service": "MIPExchangeSolutions",
      "servicePlanId": "cd31b152-6326-4d1b-ae1b-997b625182e6"
  },
  {
      "assignedDateTime": "2020-11-29T12:38:08Z",
      "capabilityStatus": "Enabled",
      "service": "M365CommunicationCompliance",
      "servicePlanId": "a413a9ff-720c-4822-98ef-2f37c2a21f4c"
  },
  {
      "assignedDateTime": "2020-11-29T12:38:08Z",
      "capabilityStatus": "Enabled",
      "service": "M365LabelAnalytics",
      "servicePlanId": "d9fa6af4-e046-4c89-9226-729a0786685d"
  },
  {
      "assignedDateTime": "2020-11-29T12:38:08Z",
      "capabilityStatus": "Enabled",
      "service": "exchange",
      "servicePlanId": "a6520331-d7d4-4276-95f5-15c0933bc757"
  },
  {
      "assignedDateTime": "2020-08-31T14:35:07Z",
      "capabilityStatus": "Enabled",
      "service": "CRM",
      "servicePlanId": "afa73018-811e-46e9-988f-f75d2b1b8430"
  },
  {
      "assignedDateTime": "2020-08-31T14:35:07Z",
      "capabilityStatus": "Enabled",
      "service": "ProjectProgramsAndPortfolios",
      "servicePlanId": "b21a6b06-1988-436e-a07b-51ec6d9f52ad"
  },
  {
      "assignedDateTime": "2020-08-31T14:35:07Z",
      "capabilityStatus": "Enabled",
      "service": "ccibotsprod",
      "servicePlanId": "ded3d325-1bdc-453e-8432-5bac26d7a014"
  },
  {
      "assignedDateTime": "2020-08-31T14:35:07Z",
      "capabilityStatus": "Enabled",
      "service": "Office365InsiderRisk",
      "servicePlanId": "d587c7a3-bda9-4f99-8776-9bcf59c84f75"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:43Z",
      "capabilityStatus": "Deleted",
      "service": "SCO",
      "servicePlanId": "882e1d05-acd1-4ccb-8708-6ee03664b117"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:37Z",
      "capabilityStatus": "Enabled",
      "service": "SCO",
      "servicePlanId": "c1ec4a95-1f05-45b3-a911-aa3fa01094f5"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:37Z",
      "capabilityStatus": "Enabled",
      "service": "Adallom",
      "servicePlanId": "2e2ddb96-6af9-4b1d-a3f0-d6ecfd22edb2"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:37Z",
      "capabilityStatus": "Enabled",
      "service": "exchange",
      "servicePlanId": "efb0351d-3b08-4503-993d-383af8de41e3"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:36Z",
      "capabilityStatus": "Enabled",
      "service": "SharePoint",
      "servicePlanId": "e95bec33-7c88-4a70-8e19-b10bd9d0c014"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:37Z",
      "capabilityStatus": "Enabled",
      "service": "TeamspaceAPI",
      "servicePlanId": "57ff2da0-773e-42df-b2af-ffb7a2317929"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:34Z",
      "capabilityStatus": "Enabled",
      "service": "MicrosoftThreatProtection",
      "servicePlanId": "bf28f719-7844-4079-9c78-c1307898e192"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:35Z",
      "capabilityStatus": "Enabled",
      "service": "PowerAppsService",
      "servicePlanId": "9c0dab89-a30c-4117-86e7-97bda240acd2"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:37Z",
      "capabilityStatus": "Deleted",
      "service": "SCO",
      "servicePlanId": "882e1d05-acd1-4ccb-8708-6ee03664b117"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:37Z",
      "capabilityStatus": "Enabled",
      "service": "exchange",
      "servicePlanId": "5136a095-5cf0-4aff-bec3-e84448b38ea5"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:36Z",
      "capabilityStatus": "Enabled",
      "service": "exchange",
      "servicePlanId": "8e0c0a52-6a6c-4d40-8370-dd62790dcd70"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:37Z",
      "capabilityStatus": "Enabled",
      "service": "ProcessSimple",
      "servicePlanId": "07699545-9485-468e-95b6-2fca3738be01"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:36Z",
      "capabilityStatus": "Enabled",
      "service": "Adallom",
      "servicePlanId": "8c098270-9dd4-4350-9b30-ba4703f3b36b"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:38Z",
      "capabilityStatus": "Enabled",
      "service": "exchange",
      "servicePlanId": "9f431833-0334-42de-a7dc-70aa40db46db"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:38Z",
      "capabilityStatus": "Enabled",
      "service": "RMSOnline",
      "servicePlanId": "5689bec4-755d-4753-8b61-40975025187c"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:35Z",
      "capabilityStatus": "Enabled",
      "service": "exchange",
      "servicePlanId": "6db1f1db-2b46-403f-be40-e39395f08dbb"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:34Z",
      "capabilityStatus": "Enabled",
      "service": "Bing",
      "servicePlanId": "94065c59-bc8e-4e8b-89e5-5138d471eaff"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:35Z",
      "capabilityStatus": "Enabled",
      "service": "Sway",
      "servicePlanId": "a23b959c-7ce8-4e57-9140-b90eb88a9e97"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:35Z",
      "capabilityStatus": "Enabled",
      "service": "To-Do",
      "servicePlanId": "3fb82609-8c27-4f7b-bd51-30634711ee67"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:38Z",
      "capabilityStatus": "Enabled",
      "service": "AADPremiumService",
      "servicePlanId": "eec0eb4f-6444-4f95-aba0-50c24d67f998"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:34Z",
      "capabilityStatus": "Enabled",
      "service": "MicrosoftOffice",
      "servicePlanId": "531ee2f8-b1cb-453b-9c21-d2180d014ca5"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:36Z",
      "capabilityStatus": "Enabled",
      "service": "MicrosoftCommunicationsOnline",
      "servicePlanId": "4828c8ec-dc2e-4779-b502-87ac9ce28ab7"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:34Z",
      "capabilityStatus": "Enabled",
      "service": "CRM",
      "servicePlanId": "28b0fa46-c39a-4188-89e2-58e979a6b014"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:35Z",
      "capabilityStatus": "Enabled",
      "service": "MicrosoftCommunicationsOnline",
      "servicePlanId": "0feaeb32-d00e-4d66-bd5a-43b5b83db82c"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:36Z",
      "capabilityStatus": "Enabled",
      "service": "exchange",
      "servicePlanId": "b1188c4c-1b36-4018-b48b-ee07604f6feb"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:36Z",
      "capabilityStatus": "Enabled",
      "service": "PowerBI",
      "servicePlanId": "70d33638-9c74-4d01-bfd3-562de28bd4ba"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:38Z",
      "capabilityStatus": "Enabled",
      "service": "AzureAdvancedThreatAnalytics",
      "servicePlanId": "14ab5db5-e6c4-4b20-b4bc-13e36fd2227f"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:35Z",
      "capabilityStatus": "Enabled",
      "service": "exchange",
      "servicePlanId": "6dc145d6-95dd-4191-b9c3-185575ee6f6b"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:35Z",
      "capabilityStatus": "Enabled",
      "service": "WhiteboardServices",
      "servicePlanId": "4a51bca5-1eff-43f5-878c-177680f191af"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:34Z",
      "capabilityStatus": "Enabled",
      "service": "exchange",
      "servicePlanId": "46129a58-a698-46f0-aa5b-17f6586297d9"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:34Z",
      "capabilityStatus": "Enabled",
      "service": "exchange",
      "servicePlanId": "199a5c09-e0ca-4e37-8f7c-b05d533e1ea2"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:34Z",
      "capabilityStatus": "Enabled",
      "service": "exchange",
      "servicePlanId": "9d0c4ee5-e4a1-4625-ab39-d82b619b1a34"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:35Z",
      "capabilityStatus": "Enabled",
      "service": "exchange",
      "servicePlanId": "2f442157-a11c-46b9-ae5b-6e39ff4e5849"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:37Z",
      "capabilityStatus": "Enabled",
      "service": "exchange",
      "servicePlanId": "34c0d7a0-a70f-4668-9238-47f9fc208882"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:35Z",
      "capabilityStatus": "Enabled",
      "service": "SharePoint",
      "servicePlanId": "5dbe027f-2339-4123-9542-606e4d348a72"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:37Z",
      "capabilityStatus": "Enabled",
      "service": "OfficeForms",
      "servicePlanId": "e212cbc7-0961-4c40-9825-01117710dcb1"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:37Z",
      "capabilityStatus": "Enabled",
      "service": "MicrosoftStream",
      "servicePlanId": "6c6042f5-6f01-4d67-b8c1-eb99d36eed3e"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:34Z",
      "capabilityStatus": "Enabled",
      "service": "exchange",
      "servicePlanId": "e26c2fcc-ab91-4a61-b35c-03cdc8dddf66"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:37Z",
      "capabilityStatus": "Enabled",
      "service": "Deskless",
      "servicePlanId": "8c7d2df8-86f0-4902-b2ed-a0458298f3b3"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:35Z",
      "capabilityStatus": "Enabled",
      "service": "YammerEnterprise",
      "servicePlanId": "7547a3fe-08ee-4ccb-b430-5077c5041653"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:38Z",
      "capabilityStatus": "Enabled",
      "service": "AADPremiumService",
      "servicePlanId": "41781fb2-bc02-4b7c-bd55-b576c07bb09d"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:38Z",
      "capabilityStatus": "Enabled",
      "service": "exchange",
      "servicePlanId": "efb87545-963c-4e0d-99df-69c6916d9eb0"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:35Z",
      "capabilityStatus": "Enabled",
      "service": "exchange",
      "servicePlanId": "bf6f5520-59e3-4f82-974b-7dbbc4fd27c7"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:36Z",
      "capabilityStatus": "Enabled",
      "service": "exchange",
      "servicePlanId": "f20fedf3-f3c3-43c3-8267-2bfdd51c0939"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:35Z",
      "capabilityStatus": "Enabled",
      "service": "exchange",
      "servicePlanId": "41fcdd7d-4733-4863-9cf4-c65b83ce2df4"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:34Z",
      "capabilityStatus": "Enabled",
      "service": "exchange",
      "servicePlanId": "d2d51368-76c9-4317-ada2-a12c004c432f"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:38Z",
      "capabilityStatus": "Enabled",
      "service": "RMSOnline",
      "servicePlanId": "6c57d4b6-3b23-47a5-9bc9-69f17b4947b3"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:37Z",
      "capabilityStatus": "Enabled",
      "service": "RMSOnline",
      "servicePlanId": "bea4c11e-220a-4e6d-8eb8-8ea15d019f90"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:37Z",
      "capabilityStatus": "Enabled",
      "service": "ProjectWorkManagement",
      "servicePlanId": "b737dad2-2f6c-4c65-90e3-ca563267e8b9"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:36Z",
      "capabilityStatus": "Enabled",
      "service": "MicrosoftOffice",
      "servicePlanId": "43de0ff5-c92c-492b-9116-175376d08c38"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:36Z",
      "capabilityStatus": "Enabled",
      "service": "exchange",
      "servicePlanId": "4de31727-a228-4ec3-a5bf-8e45b5ca48cc"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:34Z",
      "capabilityStatus": "Enabled",
      "service": "exchange",
      "servicePlanId": "65cc641f-cccd-4643-97e0-a17e3045e541"
  },
  {
      "assignedDateTime": "2020-07-01T10:36:37Z",
      "capabilityStatus": "Enabled",
      "service": "MultiFactorService",
      "servicePlanId": "8a256a2b-b617-496d-b51b-e76466e88db0"
  }
]

const domedata2 = [
  {
      "servicePlanId": "b76fb638-6ba6-402a-b9f9-83d28acb3d86",
      "servicePlanName": "VIVA_LEARNING_SEEDED",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "db4d623d-b514-490b-b7ef-8885eee514de",
      "servicePlanName": "Nucleus",
      "provisioningStatus": "Success",
      "appliesTo": "Company"
  },
  {
      "servicePlanId": "cd31b152-6326-4d1b-ae1b-997b625182e6",
      "servicePlanName": "MIP_S_Exchange",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "a413a9ff-720c-4822-98ef-2f37c2a21f4c",
      "servicePlanName": "MICROSOFT_COMMUNICATION_COMPLIANCE",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "a6520331-d7d4-4276-95f5-15c0933bc757",
      "servicePlanName": "GRAPH_CONNECTORS_SEARCH_INDEX",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "d9fa6af4-e046-4c89-9226-729a0786685d",
      "servicePlanName": "Content_Explorer",
      "provisioningStatus": "Success",
      "appliesTo": "Company"
  },
  {
      "servicePlanId": "ded3d325-1bdc-453e-8432-5bac26d7a014",
      "servicePlanName": "POWER_VIRTUAL_AGENTS_O365_P3",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "afa73018-811e-46e9-988f-f75d2b1b8430",
      "servicePlanName": "CDS_O365_P3",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "b21a6b06-1988-436e-a07b-51ec6d9f52ad",
      "servicePlanName": "PROJECT_O365_P3",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "d587c7a3-bda9-4f99-8776-9bcf59c84f75",
      "servicePlanName": "INSIDER_RISK",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "531ee2f8-b1cb-453b-9c21-d2180d014ca5",
      "servicePlanName": "EXCEL_PREMIUM",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "bf28f719-7844-4079-9c78-c1307898e192",
      "servicePlanName": "MTP",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "94065c59-bc8e-4e8b-89e5-5138d471eaff",
      "servicePlanName": "MICROSOFT_SEARCH",
      "provisioningStatus": "Success",
      "appliesTo": "Company"
  },
  {
      "servicePlanId": "28b0fa46-c39a-4188-89e2-58e979a6b014",
      "servicePlanName": "DYN365_CDS_O365_P3",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "199a5c09-e0ca-4e37-8f7c-b05d533e1ea2",
      "servicePlanName": "MICROSOFTBOOKINGS",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "65cc641f-cccd-4643-97e0-a17e3045e541",
      "servicePlanName": "RECORDS_MANAGEMENT",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "d2d51368-76c9-4317-ada2-a12c004c432f",
      "servicePlanName": "ML_CLASSIFICATION",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "9d0c4ee5-e4a1-4625-ab39-d82b619b1a34",
      "servicePlanName": "INSIDER_RISK_MANAGEMENT",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "e26c2fcc-ab91-4a61-b35c-03cdc8dddf66",
      "servicePlanName": "INFO_GOVERNANCE",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "46129a58-a698-46f0-aa5b-17f6586297d9",
      "servicePlanName": "DATA_INVESTIGATIONS",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "6db1f1db-2b46-403f-be40-e39395f08dbb",
      "servicePlanName": "CUSTOMER_KEY",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "6dc145d6-95dd-4191-b9c3-185575ee6f6b",
      "servicePlanName": "COMMUNICATIONS_DLP",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "41fcdd7d-4733-4863-9cf4-c65b83ce2df4",
      "servicePlanName": "COMMUNICATIONS_COMPLIANCE",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "bf6f5520-59e3-4f82-974b-7dbbc4fd27c7",
      "servicePlanName": "SAFEDOCS",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "2f442157-a11c-46b9-ae5b-6e39ff4e5849",
      "servicePlanName": "M365_ADVANCED_AUDITING",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "7547a3fe-08ee-4ccb-b430-5077c5041653",
      "servicePlanName": "YAMMER_ENTERPRISE",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "4a51bca5-1eff-43f5-878c-177680f191af",
      "servicePlanName": "WHITEBOARD_PLAN3",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "3fb82609-8c27-4f7b-bd51-30634711ee67",
      "servicePlanName": "BPOS_S_TODO_3",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "a23b959c-7ce8-4e57-9140-b90eb88a9e97",
      "servicePlanName": "SWAY",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "0feaeb32-d00e-4d66-bd5a-43b5b83db82c",
      "servicePlanName": "MCOSTANDARD",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "5dbe027f-2339-4123-9542-606e4d348a72",
      "servicePlanName": "SHAREPOINTENTERPRISE",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "9c0dab89-a30c-4117-86e7-97bda240acd2",
      "servicePlanName": "POWERAPPS_O365_P3",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "70d33638-9c74-4d01-bfd3-562de28bd4ba",
      "servicePlanName": "BI_AZURE_P2",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "4828c8ec-dc2e-4779-b502-87ac9ce28ab7",
      "servicePlanName": "MCOEV",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "e95bec33-7c88-4a70-8e19-b10bd9d0c014",
      "servicePlanName": "SHAREPOINTWAC",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "43de0ff5-c92c-492b-9116-175376d08c38",
      "servicePlanName": "OFFICESUBSCRIPTION",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "b1188c4c-1b36-4018-b48b-ee07604f6feb",
      "servicePlanName": "PAM_ENTERPRISE",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "8e0c0a52-6a6c-4d40-8370-dd62790dcd70",
      "servicePlanName": "THREAT_INTELLIGENCE",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "f20fedf3-f3c3-43c3-8267-2bfdd51c0939",
      "servicePlanName": "ATP_ENTERPRISE",
      "provisioningStatus": "Success",
      "appliesTo": "Company"
  },
  {
      "servicePlanId": "8c098270-9dd4-4350-9b30-ba4703f3b36b",
      "servicePlanName": "ADALLOM_S_O365",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "4de31727-a228-4ec3-a5bf-8e45b5ca48cc",
      "servicePlanName": "EQUIVIO_ANALYTICS",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "882e1d05-acd1-4ccb-8708-6ee03664b117",
      "servicePlanName": "INTUNE_O365",
      "provisioningStatus": "PendingActivation",
      "appliesTo": "Company"
  },
  {
      "servicePlanId": "57ff2da0-773e-42df-b2af-ffb7a2317929",
      "servicePlanName": "TEAMS1",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "6c6042f5-6f01-4d67-b8c1-eb99d36eed3e",
      "servicePlanName": "STREAM_O365_E5",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "8c7d2df8-86f0-4902-b2ed-a0458298f3b3",
      "servicePlanName": "Deskless",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "b737dad2-2f6c-4c65-90e3-ca563267e8b9",
      "servicePlanName": "PROJECTWORKMANAGEMENT",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "34c0d7a0-a70f-4668-9238-47f9fc208882",
      "servicePlanName": "EXCHANGE_ANALYTICS",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "c1ec4a95-1f05-45b3-a911-aa3fa01094f5",
      "servicePlanName": "INTUNE_A",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "e212cbc7-0961-4c40-9825-01117710dcb1",
      "servicePlanName": "FORMS_PLAN_E5",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "2e2ddb96-6af9-4b1d-a3f0-d6ecfd22edb2",
      "servicePlanName": "ADALLOM_S_STANDALONE",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "8a256a2b-b617-496d-b51b-e76466e88db0",
      "servicePlanName": "MFA_PREMIUM",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "bea4c11e-220a-4e6d-8eb8-8ea15d019f90",
      "servicePlanName": "RMS_S_ENTERPRISE",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "5136a095-5cf0-4aff-bec3-e84448b38ea5",
      "servicePlanName": "MIP_S_CLP1",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "efb0351d-3b08-4503-993d-383af8de41e3",
      "servicePlanName": "MIP_S_CLP2",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "07699545-9485-468e-95b6-2fca3738be01",
      "servicePlanName": "FLOW_O365_P3",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "efb87545-963c-4e0d-99df-69c6916d9eb0",
      "servicePlanName": "EXCHANGE_S_ENTERPRISE",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "9f431833-0334-42de-a7dc-70aa40db46db",
      "servicePlanName": "LOCKBOX_ENTERPRISE",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "5689bec4-755d-4753-8b61-40975025187c",
      "servicePlanName": "RMS_S_PREMIUM2",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "6c57d4b6-3b23-47a5-9bc9-69f17b4947b3",
      "servicePlanName": "RMS_S_PREMIUM",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "14ab5db5-e6c4-4b20-b4bc-13e36fd2227f",
      "servicePlanName": "ATA",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "eec0eb4f-6444-4f95-aba0-50c24d67f998",
      "servicePlanName": "AAD_PREMIUM_P2",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  },
  {
      "servicePlanId": "41781fb2-bc02-4b7c-bd55-b576c07bb09d",
      "servicePlanName": "AAD_PREMIUM",
      "provisioningStatus": "Success",
      "appliesTo": "User"
  }
]

// All servicePlanIds are the same
const isTheSame = domedata1.every(x => domedata2.map(d => d.servicePlanId).includes(x.servicePlanId)) && domedata2.every(x => domedata1.map(d => d.servicePlanId).includes(x.servicePlanId))
console.log(`Is it the same? ${isTheSame ? "yes": "no"}`)

