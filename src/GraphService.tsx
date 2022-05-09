import { Client, GraphRequestOptions, PageCollection, PageIterator } from '@microsoft/microsoft-graph-client';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { endOfWeek, startOfWeek } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { User, Event } from '@microsoft/microsoft-graph-types';
import {  AssignedLicense, LicenseDetails, SubscribedSku } from '@microsoft/microsoft-graph-types';
import { useState } from 'react';


let graphClient: Client | undefined = undefined;

function ensureClient(authProvider: AuthCodeMSALBrowserAuthenticationProvider) {
  if (!graphClient) {
    graphClient = Client.initWithMiddleware({
      authProvider: authProvider
    });
  }

  return graphClient;
}

export async function getUser(authProvider: AuthCodeMSALBrowserAuthenticationProvider): Promise<User> {
  
  ensureClient(authProvider);

  
  

  // Return the /me API endpoint result as a User object
  const user: User = await graphClient!.api('https://graph.microsoft.com/v1.0/me')
    // Only retrieve the specific fields needed
    /*.select('id, skuId,skuPartNumber ')*/
  
    


    
    .get();

   

   
  console.log(user);
  return user;
  

}


export async function getUserWeekCalendar(authProvider: AuthCodeMSALBrowserAuthenticationProvider,
    timeZone: string): Promise<Event[]> {
ensureClient(authProvider);

// Generate startDateTime and endDateTime query params
// to display a 7-day window
const now = new Date();
const startDateTime = zonedTimeToUtc(startOfWeek(now), timeZone).toISOString();
const endDateTime = zonedTimeToUtc(endOfWeek(now), timeZone).toISOString();

// GET /me/calendarview?startDateTime=''&endDateTime=''
// &$select=subject,organizer,start,end
// &$orderby=start/dateTime
// &$top=50
var response: PageCollection = await graphClient!
.api('/me/calendarview')
.header('Prefer', `outlook.timezone="${timeZone}"`)
.query({ startDateTime: startDateTime, endDateTime: endDateTime })
.select('subject,organizer,start,end')
.orderby('start/dateTime')
.top(25)
.get();

if (response["@odata.nextLink"]) {
// Presence of the nextLink property indicates more results are available
// Use a page iterator to get all results
var events: Event[] = [];

// Must include the time zone header in page
// requests too
var options: GraphRequestOptions = {
headers: { 'Prefer': `outlook.timezone="${timeZone}"` }
};

var pageIterator = new PageIterator(graphClient!, response, (event) => {
events.push(event);
return true;
}, options);

await pageIterator.iterate();

return events;
} else {

return response.value;
}
}

export async function createEvent(authProvider: AuthCodeMSALBrowserAuthenticationProvider,
    newEvent: Event): Promise<Event> {
ensureClient(authProvider);

// POST /me/events
// JSON representation of the new event is sent in the
// request body
return await graphClient!
.api('/me/events')
.post(newEvent);
}




export async function getLicense(authProvider: AuthCodeMSALBrowserAuthenticationProvider): Promise<LicenseDetails> {
    ensureClient(authProvider);
  
    const license: LicenseDetails = await graphClient!.api('https://graph.microsoft.com/v1.0/user/licenseDetails')
     /*.header('Authorization', `Bearer ${token}`)*/
     .select('id,servicePlans,skuId,skuPartNumber')
      .get();
  
    return license;
  }

  export async function getLisens(authProvider: AuthCodeMSALBrowserAuthenticationProvider): Promise<SubscribedSku> {
    ensureClient(authProvider);
  
  const lisens: SubscribedSku = await graphClient!.api('https://graph.microsoft.com/v1.0/subscribedSkus')
   /* .header('Authorization', `Bearer ${token}`)*/
      
   
      .get();
console.log(lisens);
    return lisens;
  }


 /* export async function getServicePlan(authProvider: AuthCodeMSALBrowserAuthenticationProvider): Promise<ServicePlanInfo> {
    ensureClient(authProvider);
  
  const serviceplan: ServicePlanInfo = await graphClient!.api('https://graph.microsoft.com/v1.0/users/{45a51149-1d3c-4924-bd2e-545b4a65c2db}/licenseDetails?$select=servicePlanId,servicePlanName,appliesTo,skuId,skuPartNumber,provisioningStatus')
   /* .header('Authorization', `Bearer ${token}`)
      
   
      .get();

    return serviceplan;
  }*/


  

  

  
  export async function getUsers(authProvider: AuthCodeMSALBrowserAuthenticationProvider): Promise<User[]> {
    ensureClient(authProvider);
   
    // Return the /me API endpoint result as a User object
    const users: {value: User[]} = await graphClient!.api('https://graph.microsoft.com/v1.0/users')
      // Only retrieve the specific fields needed
     
      
      .get();
    console.log(users);
    return users?.value;
  }



  