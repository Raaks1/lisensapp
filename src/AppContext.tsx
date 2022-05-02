import { getUser, getLicense, getLisens, getServicePlan, getAssigned } from './GraphService';
import React, {
    useContext,
    createContext,
    useState,
    MouseEventHandler,
    useEffect} from 'react';
  
  import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
  import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
  import { useMsal } from '@azure/msal-react';
import config from './Config';


  



export interface Users {
  assignedLicenses?: any,
}



export interface assignedUser {
  assignedLicenses?: any,
}



export interface ServicePlan {
    appliesTo?: string;
    provisioningStatus?:string,
    servicePlanId?: string,
    servicePlanName?: string,


}


export interface LisensUser {
    servicePlans?:any,
    skuid?: string,
    skuPartNumber?: string,
    id?: string
    licenseDetails?: any,
  }



export interface LicenseUser {
     servicePlans?:any,
     skuid?: string,
     skuPartNumber?: string,
     id?: string,
     licenseDetails?: any,
   }


  export interface AppUser {
    displayName?: string,
    email?: string,
    avatar?: string,
    timeZone?: string,
    timeFormat?: string,
    userPrincipalName?: string
    id?: any,
    jobTitle?: string,
    mobilePhone?: any,
    postalCode?: any,

  };
  
  export interface AppError {
    message: string,
    debug?: string
  };
  
  type AppContext = {
    user?: AppUser;
    assigned?:assignedUser;
    license?:LicenseUser;
    lisens?: LisensUser;
    serviceplan?:ServicePlan
    error?: AppError;
    signIn?: MouseEventHandler<HTMLElement>;
    signOut?: MouseEventHandler<HTMLElement>;
    displayError?: Function;
    clearError?: Function;
    authProvider?: AuthCodeMSALBrowserAuthenticationProvider;
  }
  
  const appContext = createContext<AppContext>({
    user: undefined,
    assigned:undefined,
    serviceplan: undefined,
    license: undefined,
    lisens: undefined,
    error: undefined,
    signIn: undefined,
    signOut: undefined,
    displayError: undefined,
    clearError: undefined,
    authProvider: undefined
  });
  
  export function useAppContext(): AppContext {
    return useContext(appContext);
  }
  
  interface ProvideAppContextProps {
    children: React.ReactNode;
  }
  
  export default function ProvideAppContext({ children }: ProvideAppContextProps) {
    const auth = useProvideAppContext();
    return (
      <appContext.Provider value={auth}>
        {children}
      </appContext.Provider>
    );
  }



  function useProvideAppContext() {
    const msal = useMsal();
    const [user, setUser] = useState<AppUser | undefined>(undefined);
    const [error, setError] = useState<AppError | undefined>(undefined);
    const [license, setLicense] = useState<LicenseUser | undefined>(undefined);
    const [lisens, setLisens] = useState<LisensUser | undefined>(undefined);
    const [serviceplan, setServicePlan] = useState<ServicePlan | undefined>(undefined);
    const [assigned, setAssigned] = useState<assignedUser | undefined>(undefined);


    useEffect(() => {
        const checkUser = async() => {
          if (!user) {
            try {
              // Check if user is already signed in
              const account = msal.instance.getActiveAccount();
              if (account) {
                // Get the user from Microsoft Graph
                const user = await getUser(authProvider);
      
                setUser({
                  displayName: user.displayName || '',
                  email: user.mail || user.userPrincipalName || '',
                  timeFormat: user.mailboxSettings?.timeFormat || 'h:mm a',
                  timeZone: user.mailboxSettings?.timeZone || 'UTC',
                  id: user.id || '',
                  userPrincipalName: user.userPrincipalName || '',
                  jobTitle: user.jobTitle || '',
                  mobilePhone: user.mobilePhone || '',

               

                });

                const license = await getLicense(authProvider);
                setLicense({
                    servicePlans: license.servicePlans || '',
                    skuid: license.skuId || '',
                    skuPartNumber: license.skuPartNumber ||'',
                    id: license.id || '',
                    

                })

                const lisens = await getLisens(authProvider);
                setLisens({
                    licenseDetails: lisens.licenseDetails || '',
                    id: lisens.id || '',
                 
                })
                   
                   
            
                const serviceplan = await getServicePlan(authProvider);
                setServicePlan({
                    appliesTo: serviceplan.appliesTo || '',
                    provisioningStatus: serviceplan.provisioningStatus || '',
                    servicePlanId: serviceplan.servicePlanId || '',
                    servicePlanName: serviceplan.servicePlanName || '',
                   
                   
                })

                const assigned = await getAssigned(authProvider);
                setAssigned({
                  assignedLicenses: assigned.assignedLicenses || '',
                })

               
              }
            } catch (err: any) {
              displayError(err.message);
            }
          }
        };
        checkUser();
      },[]);


  
    const displayError = (message: string, debug?: string) => {
      setError({message, debug});
    }

    
  
    const clearError = () => {
      setError(undefined);
    }
  
    // Used by the Graph SDK to authenticate API calls
const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
    msal.instance as PublicClientApplication,
    {
      account: msal.instance.getActiveAccount()!,
      scopes: config.scopes,
      interactionType: InteractionType.Popup
    }
  );
  
  const signIn = async () => {
    await msal.instance.loginPopup({
      scopes: config.scopes,
      prompt: 'select_account'
    });
  
    // Get the user from Microsoft Graph
    const user = await getUser(authProvider);
  
    setUser({
      displayName: user.displayName || '',
      email: user.mail || user.userPrincipalName || '',
      timeFormat: user.mailboxSettings?.timeFormat || '',
      timeZone: user.mailboxSettings?.timeZone || 'UTC',
    
    });

    const license = await getLicense(authProvider);

    setLicense({
     
        servicePlans: license.servicePlans || '',
        skuid: license.skuId || '',
        skuPartNumber: license.skuPartNumber ||'',
        id: license.id || '',
        

    })

    const lisens = await getLisens(authProvider);

    setLisens({
        licenseDetails: lisens.licenseDetails || '',
       
    })
    
    const serviceplan = await getServicePlan(authProvider);
    setServicePlan({
        appliesTo: serviceplan.appliesTo || '',
        provisioningStatus: serviceplan.provisioningStatus || '',
        servicePlanId: serviceplan.servicePlanId || '',
        servicePlanName: serviceplan.servicePlanName || '',
       
       
    })

    const assigned = await getAssigned(authProvider);
                setAssigned({
                  assignedLicenses: assigned.assignedLicenses || '',
                })

    

  };
  
    // TEMPORARY: Show the access token
  /*  displayError('Access token retrieved', result.accessToken);
  };*/
  
  const signOut = async () => {
    await msal.instance.logoutPopup();
    setUser(undefined);
  };
  
    return {
      user,
      license,
      assigned,
      serviceplan,
      lisens,
      error,
      signIn,
      signOut,
      displayError,
      clearError,
      authProvider
    };
}