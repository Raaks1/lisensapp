import {
  getUser,
  getLicense,
  getLisens,
  getUsers,
  getPlans,
  getLisensForUser,
  getOrg,
} from "./GraphService";
import React, {
  useContext,
  createContext,
  useState,
  MouseEventHandler,
  useEffect,
  ReactChild,
  ReactChildren,
} from "react";

import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import { InteractionType, PublicClientApplication } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import config from "./Config";
import {
  SubscribedSku,
  User,
  AssignedPlan,
  Organization,
} from "@microsoft/microsoft-graph-types";

type LicenceFromUserIdFn = (id: string) => Promise<AssignedPlan[]>;

export interface AppU {
  displayName?: string | string[];
  value?: any[] | null[] | undefined[];

  [index: number]: { id: number; displayName: string; key: any };
}

/*export interface ServicePlan {
    appliesTo?: string;
    provisioningStatus?:string,
    servicePlanId?: string,
    servicePlanName?: string,


}*/

/*export interface LisensUser {
  subscribedSku?: any[],
    servicePlans?:any[],
    skuId?: any,
    skuPartNumber?: any,
    id?: any,
    
  }*/
export interface AssignedPlans {
  service?: any;
  servicePlanId?: any;
  assignedDateTime?: string;
  capabilityStatus?: string;
}

export interface LicenseUser {
  servicePlans?: any;
  skuid?: string;
  skuPartNumber?: string;
  id?: string;
  licenseDetails?: any;
}

export interface AppUser {
  displayName?: any;
  avatar?: string;

  userPrincipalName?: any;
  id?: any;
  jobTitle?: string;

  licenseDetails?: any;
  skuId?: any;
  assignedLicenses?: any;
  assignedPlan?: any[];
}

export interface AppError {
  message: string;
  debug?: string;
}

type AppContext = {
  org?: Organization[];
  user?: AppUser;
  users?: User[];
  plan?: AssignedPlan[];
  license?: LicenseUser;
  lisens?: SubscribedSku[];
  /* serviceplan?:ServicePlan*/
  error?: AppError;
  signIn?: MouseEventHandler<HTMLElement>;
  signOut?: MouseEventHandler<HTMLElement>;
  displayError?: Function;
  clearError?: Function;
  authProvider?: AuthCodeMSALBrowserAuthenticationProvider;

  getSingleUserLicence?: LicenceFromUserIdFn;
};

const appContext = createContext<AppContext>({
  user: undefined,
  users: undefined,
  plan: undefined,
  org: undefined,
  /* serviceplan: undefined,*/
  license: undefined,
  lisens: undefined,
  error: undefined,
  signIn: undefined,
  signOut: undefined,
  displayError: undefined,
  clearError: undefined,
  authProvider: undefined,
  getSingleUserLicence: undefined,
});

export function useAppContext(): AppContext {
  return useContext(appContext);
}

interface ProvideAppContextProps {
  children: React.ReactNode;
}

export default function ProvideAppContext({
  children,
}: ProvideAppContextProps) {
  const auth = useProvideAppContext();
  return <appContext.Provider value={auth}>{children}</appContext.Provider>;
}

function useProvideAppContext() {
  const msal = useMsal();
  const [user, setUser] = useState<AppUser | undefined>();
  const [error, setError] = useState<AppError | undefined>();
  const [license, setLicense] = useState<LicenseUser | undefined>();
  const [lisens, setLisens] = useState<SubscribedSku[] | undefined>();
  const [plans, setPlans] = useState<AssignedPlan[] | undefined>();
  /* const [serviceplan, setServicePlan] = useState<ServicePlan | undefined>(undefined);*/
  const [org, setOrg] = useState<Organization[] | undefined>();
  const [users, setUsers] = useState<User[] | undefined>();

  useEffect(() => {
    const checkUser = async () => {
      if (!user) {
        try {
          // Check if user is already signed in
          const account = msal.instance.getActiveAccount();
          if (account) {
            // Get the user from Microsoft Graph
            const user = await getUser(authProvider);

            setUser({
              displayName: user.displayName || "ERROR",

              id: user.id || "",
              userPrincipalName: user.userPrincipalName || "",
              jobTitle: user.jobTitle || "",

              licenseDetails: user.licenseDetails || "",
              assignedPlan: user.assignedPlans || [],
            });

            const users = (await getUsers(authProvider)) || [];
            setUsers(users);

            const license = await getLicense(authProvider);
            setLicense({
              servicePlans: license.servicePlans || "",
              skuid: license.skuId || "",
              skuPartNumber: license.skuPartNumber || "",
              id: license.id || "",
            });

            const lisens = (await getLisens(authProvider)) || [];
            setLisens(lisens);

            const plans = (await getPlans(authProvider)) || [];
            setPlans(plans);

            const org = (await getOrg(authProvider)) || [];
            setOrg(org);

            /*  const serviceplan = await getServicePlan(authProvider);
                setServicePlan({
                    appliesTo: serviceplan.appliesTo || '',
                    provisioningStatus: serviceplan.provisioningStatus || '',
                    servicePlanId: serviceplan.servicePlanId || '',
                    servicePlanName: serviceplan.servicePlanName || '',
                   
                   
                });

                const assigned = await getAssigned(authProvider);
                setAssigned({
                  assignedLicenses: assigned.assignedLicenses || '',
                });*/
          }
        } catch (err: any) {
          displayError(err.message);
        }
      }
    };
    checkUser();
  }, []);

  const displayError = (message: string, debug?: string) => {
    setError({ message, debug });
  };

  const clearError = () => {
    setError(undefined);
  };

  // Used by the Graph SDK to authenticate API calls
  const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
    msal.instance as PublicClientApplication,
    {
      account: msal.instance.getActiveAccount()!,
      scopes: config.scopes,
      interactionType: InteractionType.Popup,
    }
  );

  const signIn = async () => {
    await msal.instance.loginPopup({
      scopes: config.scopes,
      prompt: "select_account",
    });

    // Get the user from Microsoft Graph
    const user = await getUser(authProvider);

    setUser({
      displayName: user.displayName || "",
    });

    const license = await getLicense(authProvider);

    setLicense({
      servicePlans: license.servicePlans || "",
      skuid: license.skuId || "",
      skuPartNumber: license.skuPartNumber || "",
      id: license.id || "",
    });

    /*  const lisens = await getLisens(authProvider);

    setLisens({
        id: lisens.id || '',
        skuId: lisens.skuId || '',

       
    });*/

    /*  const serviceplan = await getServicePlan(authProvider);
    setServicePlan({
        appliesTo: serviceplan.appliesTo || '',
        provisioningStatus: serviceplan.provisioningStatus || '',
        servicePlanId: serviceplan.servicePlanId || '',
        servicePlanName: serviceplan.servicePlanName || '',
       
       
    })*/

    /* const users = await getUsers(authProvider);
                setUsers({
                   displayName:  || '',
                
                })*/
  };

  const signOut = async () => {
    await msal.instance.logoutPopup();
    setUser(undefined);
  };

  const getSingleUserLicence: LicenceFromUserIdFn =
    getLisensForUser(authProvider);

  return {
    user,
    users,
    license,
    plans,
    org,

    /* serviceplan,*/
    lisens,
    error,
    signIn,
    signOut,
    displayError,
    clearError,
    authProvider,

    getSingleUserLicence,
  };
}
