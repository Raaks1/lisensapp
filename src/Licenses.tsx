import { Button, Container, Card } from "react-bootstrap";
import { HashRouterProps } from "react-router-dom";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { useAppContext } from "./AppContext";
import {
  Fragment,
  useCallback,
  useEffect,
 
  useState,
} from "react";
import "./Licences.css";
import {
  SubscribedSku,
  User,
  Organization,
  AssignedPlan,
} from "@microsoft/microsoft-graph-types";

type UserLicenceInfo = {
  subscribedSkus?: SubscribedSku[];
  skuIds?: string[];
  assignedPlans?: AssignedPlan[];
  service?: AssignedPlan[];
  displayName?: Organization[];
  users?: User[];
};

type UsersLicenceMap = {
  [userId: string]: UserLicenceInfo;
};

export default function Licenses(_props: HashRouterProps) {
  const app = useAppContext();
  const users = app?.users || [];
  const [allUsersLicenses, setAllUsersLicenses] = useState<UsersLicenceMap>({});
  const [hasLoadedPlans, setHasLoadedPlans] = useState(false);

  const fetchUserLicenses = async (
    userIds: string[]
  ): Promise<UsersLicenceMap> => {
    if (app.getSingleUserLicence === undefined) {
      return {};
    }
    // Define data structure
    const allUserLicenses: UsersLicenceMap = {};
    // Populate data structure with info about each user
    for (const userId of userIds) {
      const plans = await app.getSingleUserLicence(userId);
      allUserLicenses[userId] = {
        skuIds: [],
        assignedPlans: [],
        subscribedSkus: [],
        service: [],
        displayName: [],
      };
    }
    // Return data about all users
    return allUserLicenses;
  };

  const getAllUserIndividualLicences = useCallback(fetchUserLicenses, [app]);

  useEffect(() => {
    if (!hasLoadedPlans) {
      const userIds = users?.map((u) => u.id).filter(Boolean) as string[];
      getAllUserIndividualLicences(userIds).then((allLicenses) => {
        setAllUsersLicenses(allLicenses);
      });
      setHasLoadedPlans(true);
    }
  }, [getAllUserIndividualLicences, hasLoadedPlans, users]);

  return (
    <div className="shadow p-5 mb-4 mt-4 bg-light rounded-3 text-dark ">
      <Container fluid>
        <h1 className="header">Microsoft Office 365 Licenses </h1>
        <p className="lead">Users' license and service information</p>

        <AuthenticatedTemplate>
          <>
            {/*}  {[
              "Primary",
              "Secondary",
              "Success",
              "Danger",
              "Warning",
              "Info",
              "Light",
              "Dark",
            ].map((variant) => (*/}
            <Card
              bg="light"
              text="dark"
              style={{ width: "100%", border: "none" }}
            >
              {users?.map((user) => (
                <div key={user.id}>
                  <div className="hider">
                    <Card.Header className="headersone">
                      <h4 className="header">User Details:</h4>
                    </Card.Header>
                  </div>
                  <Card.Body className="cards">
                    <div className="p1">
                      <div className="h3">Name:</div> {user?.displayName}
                    </div>

                    <div className="p1">
                      <div className="h3">UserPrincipalName: </div>

                      {user?.userPrincipalName}
                    </div>
                    <div key={user.id} className="p1">
                      <div className="h3">User id: </div>
                      {user?.id}{" "}
                    </div>
                  </Card.Body>

                  {/* <p>  {app.user?.assignedPlans?.map(plan=> plan.service).join(', ')}</p>  
         
        { <p> <Card.Title><h6>Service:</h6></Card.Title> {app.user?.map(user => (<Fragment key={user.id}>
        {app.user?.assignedPlans?.map(plan=> plan.service).join(', ')}</Fragment>))}</p>}*/}

                  <div className="hider">
                    {" "}
                    <Card.Header className="headerstwo">
                      {" "}
                      <h4 className="header">User Licenses:</h4>
                    </Card.Header>{" "}
                  </div>
                  <Card.Body className="cards">
                    {" "}
                    <p>
                      {" "}
                      {allUsersLicenses[user.id || ""]?.assignedPlans?.map(
                        (p) => (
                          <>
                     
                            <span className="detail"> Service:</span> {p?.service}
                          </>
                        )
                      )}
                    </p>
                    <p>
                      {allUsersLicenses[user.id || ""]?.users?.map((u) => (
                        <> <span className="detail">DisplayName:</span> {u.displayName}</>
                      ))}
                    </p>
                  {/*  <p>No info </p>*/}
                  </Card.Body>
                  <div className="hider">
                    {" "}
                    <Card.Header className="headerstwo">
                      <h4 className="header">Commercial Subscriptions:</h4>
                    </Card.Header>{" "}
                  </div>
                  {app.lisens?.map((lisens) => (
                    <Fragment key={lisens.id}>
                      <Card.Body className="cards">
                        {" "}
                        <p>
                          <span className="detail"> SkuId:</span> {lisens.skuId}
                          (The unique identifier for the SKU.)
                        </p>
                        <p>
                          <span className="detail"> SkuPartNumber:</span>{" "}
                          {lisens.skuPartNumber}
                        </p>
                        <p>
                          <span className="detail"> Id: </span>
                          {lisens.id}
                        </p>
                      </Card.Body>
                      <div className="hider">
                        <Card.Header className="headerstwo">
                          {" "}
                          <h4 className="header">ServiceplanInfo:</h4>
                        </Card.Header>{" "}
                      </div>
                      <Card.Body className="headersone">



                      {app.org?.map((org) =>  ( <Fragment key={org?.id}>


{" "}
{org.assignedPlans?.map(
  (
    {
      service,
      servicePlanId,
      capabilityStatus,
      assignedDateTime,
    },
    i
  ) => (
    <p key={app.user?.id + "_" + i}>
      <span className="spanners"> Service:</span> {service}{" "}
     
   
    </p>
  )
)}


</Fragment>))}



                        {lisens.servicePlans?.map(
                          ({ servicePlanName, servicePlanId, appliesTo }) => (
                            <p key={servicePlanId}>
                              <span className="spanners">ServicePlanName:</span>{" "}
                              <span className="details">{servicePlanName}</span>{" "}
                              <span className="spanners">ServicePlanId: </span>
                              <span className="details">
                                {servicePlanId}
                              </span>{" "}
                              {/*-<span className="spanners"> AppliesTo:</span>{" "}
                                  <span className="spans">{appliesTo}</span>{" "}*/}
                            </p>
                          )
                        )}
                      </Card.Body>
                    </Fragment>
                  ))}
                </div>
              ))}
            </Card>
          </>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Button
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "auto",
              padding: "15px",
            }}
            variant="success"
            onClick={app.signIn!}
          >
            Click here to sign in
          </Button>
        </UnauthenticatedTemplate>
      </Container>
    </div>
  );
}
