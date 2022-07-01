import { FormEvent, useEffect, useState } from "react";

/*import {
  Button,
  Container,
  Card
} from 'react-bootstrap';*/

import {   BrowserRouterProps } from 'react-router-dom';
import UserComponent from "./UserComponent";
import './Search.css'
import { Client } from "@microsoft/microsoft-graph-client";
import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import { useAppContext } from "./AppContext";
import { AssignedPlan, LicenseDetails, SubscribedSku } from "@microsoft/microsoft-graph-types";


export interface ISearch {
    [x: string]: any;
    displayName: string;
    principalName: any;
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


const filterFromSearch = (search: string) => 
  (item: ISearch) => {
    const nameItems = item.displayName.toLowerCase().split(' ');
    const queryItems = search.toLowerCase().split(' ');
    return nameItems.some(name => queryItems.some(query => name.includes(query)))
}

type SearchState = 'searching' | 'notSearching';

export default function SearchUser(_props: BrowserRouterProps) {
    const [searchState, setSearchState] = useState<SearchState>('notSearching')
    const [userFound, setUserFound] = useState<ISearch[]>([]);
    const [userSearch, setUserSearch] = useState('');

    const { authProvider } = useAppContext();

    const searchForUsers = async (encodedQuery: string): Promise<ISearch[]> => {
      try {
        const query = decodeURIComponent(encodedQuery);
        if (authProvider !== undefined) {
            const graphClient = ensureClient(authProvider);
            const result = await graphClient.api(`https://graph.microsoft.com/v1.0/users/`).get();
            const allResults = result.value;
            const filteredResults = allResults.filter(filterFromSearch(query));
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
       
      };
        return [];
    };


    useEffect(() => {
      try {
        (async () => {
            const query = encodeURIComponent(userSearch);
            if (query) {
              setSearchState('searching')
              const response = await searchForUsers(query);
              setSearchState("notSearching")
              setUserFound(response);
            }
           
        
        })();
   
      } catch (err) {
        console.error(err)
        alert('error')
      };
}, [userSearch]);

const search = (event: FormEvent<HTMLFormElement>) => {
  try{
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('#searchText') as HTMLInputElement;
    setUserSearch(input.value);
   /*input.value = '';*/
  } catch (err) {
    console.error(err)
    alert('error')
  };
};


return (
 
    <div className='Search'>
     <div className="sok">
        <form className="searchForm" onSubmit={event => search(event)}>
            <input type="text" id="searchText"  name="q" /*onChange={(e) => setUserSearch(e.target.value || '')} */ defaultValue={userSearch} placeholder="Search for user" />
            <button>Search</button>
            </form></div>
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

        {searchState === 'searching' && <div className="spinner">Searching...</div>}

{userSearch.length > 0 && searchState === "notSearching" && userFound.length === 0? (<div className="resultater">Sorry, no results found</div>) 
    :
          userFound.map(user =>
            (<UserComponent key={user.id} user={user}></UserComponent>))
         
        }
    
        
        
        </div>
        
        </>
      </div>

   
   
      
     
)

};



