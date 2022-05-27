import { FormEvent, useEffect, useState } from "react";

import {
  Button,
  Container,
  Card
} from 'react-bootstrap';

import { NavLink as RouterNavLink, BrowserRouterProps } from 'react-router-dom';
import UserComponent from "./UserComponent";
import './Search.css'
import { Client } from "@microsoft/microsoft-graph-client";
import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import { useAppContext } from "./AppContext";
import { AssignedPlan, LicenseDetails, SubscribedSku } from "@microsoft/microsoft-graph-types";


export interface ISearch {
    [x: string]: any;
    displayName: string;
    service: any;
    skuId: any;
    assignedPlan: AssignedPlan[];
    skuPartNumber:any;
    id: any;
    subscribedSku: SubscribedSku;
    licenseDetails?: LicenseDetails;
    plan:AssignedPlan[];
    



}

let graphClient: Client | undefined = undefined;

function ensureClient(authProvider: AuthCodeMSALBrowserAuthenticationProvider) {
  if (!graphClient) {
    graphClient = Client.initWithMiddleware({
      authProvider: authProvider
    });
  }

  return graphClient;
}





export default function SearchUser(_props: BrowserRouterProps) {
   
    const [userFound, setUserFound] = useState<ISearch[]>([]);
    const [userSearch, setUserSearch] = useState('');

    const { authProvider } = useAppContext();

    const searchForUsers = async (query: string): Promise<ISearch[]> => {
      try {
        if (authProvider !== undefined) {
            const graphClient = ensureClient(authProvider);
            const result = await graphClient.api(`https://graph.microsoft.com/v1.0/users/`).get();
            const allResults = result.value;
            const filteredResults = allResults.filter((item: ISearch) => item.displayName.toLowerCase().includes(query.toLowerCase()));
            const resultsWithLicenses = await Promise.all(filteredResults.map(async (item: ISearch): Promise<ISearch> => {
                    const license: {value: SubscribedSku} = await graphClient!.api(`https://graph.microsoft.com/v1.0/subscribedSkus`)
                    /*.header('Authorization', `Bearer ${token}`)*/
                    .select('id,servicePlans,skuId,skuPartNumber')
                    .get();
                    const plan: {value: AssignedPlan} = await graphClient!.api(`https://graph.microsoft.com/v1.0/me/assignedPlans`)
                  
                    .get();
                    return {
                        ...item,
                         subscribedSku: license?.value,
                         assignedPlans: plan?.value
                    }
            }))
            console.log({resultsWithLicenses})
            return resultsWithLicenses;
        }
        
      }
      catch (err) {
        console.error(err)
        alert('resultat error')
      };
        return [];
    };


    useEffect(() => {
      try {
        (async () => {
            const query = encodeURIComponent(userSearch);
            if (query) {
            const response = await searchForUsers(query);
            setUserFound(response);
            }
           
        
        })();
   
      } catch (err) {
        console.error(err)
        alert('error')
      };
},[userSearch]);

const search = (event: FormEvent<HTMLFormElement>) => {
  try{
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('#searchText') as HTMLInputElement;
    setUserSearch(input.value);
    input.value = '';
  } catch (err) {
    console.error(err)
    alert('error')
  };
};


return (
 
    <div className='Search'>
     
        <h4 className="header">Placeholder</h4>
        <form className="searchForm" onSubmit={event => search(event)}>
            <input id="searchText" type="text" placeholder="Search for user" />
            <button>Search</button>
            </form>
            {userSearch && <p className="resultat">Results for {userSearch}:</p>}
           

            <>
 {/* {[
    'Primary',
    'Secondary',
    'Success',
    'Danger',
    'Warning',
    'Info',
    'Light',
    'Dark',
  ].map((variant) => (
         
            
border="none" 

bg="none"
text="dark"
  style={{ width: '100%' }}> */}
      <div className="users-container">
        {userFound?.length > 0 &&
          userFound.map(user =>
            (<UserComponent key={user.id} user={user}></UserComponent>))
         
        }
        
        
        </div>
        
        </>
      </div>

   
   
      
     
)

};



