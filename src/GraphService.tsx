import {
  Client,
  GraphRequestOptions,
  PageCollection,
  PageIterator,
} from "@microsoft/microsoft-graph-client";
import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import { endOfWeek, startOfWeek } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import {
  User,
  AssignedPlan,
  Organization,
} from "@microsoft/microsoft-graph-types";
import {
  AssignedLicense,
  LicenseDetails,
  SubscribedSku,
} from "@microsoft/microsoft-graph-types";
import { useState } from "react";

let graphClient: Client | undefined = undefined;

function ensureClient(authProvider: AuthCodeMSALBrowserAuthenticationProvider) {
  if (!graphClient) {
    graphClient = Client.initWithMiddleware({
      authProvider: authProvider,
    });
  }

  return graphClient;
}


export async function getUsers(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider
): Promise<User[]> {
  ensureClient(authProvider);

  // Return the /me API endpoint result as a User object
  const users: { value: User[] } = await graphClient!
    .api("https://graph.microsoft.com/beta/users?")

    .select("id,displayName,assignedLicenses,assignedPlans,userPrincipalName")
    // Only retrieve the specific fields needed

    .get();
  console.log(users);
  return users?.value;
}




export async function getUser(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider
): Promise<User> {
  ensureClient(authProvider);

  // Return the /me API endpoint result as a User object
  const user: User = await graphClient!
    .api("https://graph.microsoft.com/v1.0/me")
    // Only retrieve the specific fields needed
    /*.select('id, skuId,skuPartNumber ')*/

    .get();

  console.log(user);
  return user;
}

export async function getLicense(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider
): Promise<LicenseDetails> {
  ensureClient(authProvider);

  const license: LicenseDetails = await graphClient!
    .api("https://graph.microsoft.com/v1.0/me/licenseDetails")
    /*.header('Authorization', `Bearer ${token}`)*/
    .select("id,servicePlans,skuId,skuPartNumber")
    .get();

  return license;
}

export async function getLisens(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider
): Promise<SubscribedSku[]> {
  ensureClient(authProvider);

  const lisens: { value: SubscribedSku[] } = await graphClient!
    .api("https://graph.microsoft.com/v1.0/subscribedSkus")
    /* .header('Authorization', `Bearer ${token}`)*/

    .get();
  console.log(lisens);
  return lisens?.value;
}

export const getLisensForUser =
  (authProvider: AuthCodeMSALBrowserAuthenticationProvider) =>
  async (userId: string): Promise<SubscribedSku[]> => {
    ensureClient(authProvider);

    type TheDataType = { value: Array<{ assignPlans: SubscribedSku[] }> };
    const lisens: TheDataType = await graphClient!
      .api(`https://graph.microsoft.com/v1.0/subscribedSkus/`)
      /* .header('Authorization', `Bearer ${token}`)*/

      .get();
    console.log(lisens);
    return lisens?.value?.at(0)?.assignPlans || [];
  };

export async function getPlans(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider
): Promise<AssignedPlan[]> {
  ensureClient(authProvider);

  const plans: { value: AssignedPlan[] } = await graphClient!
    .api("https://graph.microsoft.com/v1.0/me/assignedPlans")
    /* .header('Authorization', `Bearer ${token}`)*/

    .get();
  console.log(plans);
  return plans?.value;
}

/* export async function getServicePlan(authProvider: AuthCodeMSALBrowserAuthenticationProvider): Promise<ServicePlanInfo> {
    ensureClient(authProvider);
  
  const serviceplan: ServicePlanInfo = await graphClient!.api('https://graph.microsoft.com/v1.0/users/{45a51149-1d3c-4924-bd2e-545b4a65c2db}/licenseDetails?$select=servicePlanId,servicePlanName,appliesTo,skuId,skuPartNumber,provisioningStatus')
   /* .header('Authorization', `Bearer ${token}`)
      
   
      .get();

    return serviceplan;
  }*/



export async function getOrg(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider
): Promise<Organization[]> {
  ensureClient(authProvider);

  const org: { value: Organization[] } = await graphClient!
    .api("https://graph.microsoft.com/v1.0/Organization")
    /* .header('Authorization', `Bearer ${token}`)*/

    .get();
  console.log(org);
  return org?.value;
}
