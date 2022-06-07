import { MsalContext } from "@azure/msal-react";
import { Client } from "@microsoft/microsoft-graph-client";
import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";

let graphClient: Client | undefined = undefined;

function ensureClient(authProvider: AuthCodeMSALBrowserAuthenticationProvider) {
  if (!graphClient) {
    graphClient = Client.initWithMiddleware({
      authProvider: authProvider,
    });
  }

  return graphClient;
}

export interface Brukere {
  id: any;
  displayName: string[];
  next: string;
  previous?: any;
  results: {
    name: string;
    url: string;
  }[];
}

export interface Bruker {
  id: any;
  displayName: string;
  name: string;
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
}

export default async function getBrukere(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider
) {
  ensureClient(authProvider);
  const listResp = await fetch("https://graph.microsoft.com/v1.0/users/");
  console.log(listResp);
  return await listResp.json();
}

export const getBruker = async (url: string): Promise<Bruker> => {
  const dataResp = await fetch(url);
  return await dataResp.json();
};

/* export const getFirstBruker= async (): Promise<Bruker> =>

    new Promise(async (resolve, reject) => {
      try {
        console.log("Getting the list");
        const list = await getBrukere();
        resolve(await getBruker(list.results[0].url));
      } catch (error) {
        reject(error);
      }
    });




function authProvider(authProvider: any) {
  throw new Error('Function not implemented.');
}
 //   {app.user?.map((app.user) => (<li key={app.user?.id}> </li>))}*/
