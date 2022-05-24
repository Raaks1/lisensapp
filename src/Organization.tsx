import React from "react";
import { Button, Container, Card } from "react-bootstrap";
import { BrowserRouterProps, HashRouterProps } from "react-router-dom";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { useAppContext } from "./AppContext";
import { Fragment } from "react";
import "./Organization.css";


export default function Orgplans(_props: HashRouterProps) {
  const app = useAppContext();

  return (
    <AuthenticatedTemplate>
      <>
        <Card border="light" bg="light" text="dark" style={{ width: "100%" }}>
          <div>
            <Card.Header>
              <h2 className="header">Organization Details:</h2>
            </Card.Header>

            <Card.Body>
              <p>
               
                {app.org?.map((org) => (
                  <Fragment key={org?.id}>
                    <p>
                      <h3>Name:</h3> {org.displayName}{" "}
                    </p>
                    <p>
                      <h4>TenantType:</h4> {org.tenantType}
                    </p>
                    <p>
                      <h5>Id:</h5> {org.id}
                    </p>

                   
                    <Card.Header><h4 className="header">Assigned plans:</h4></Card.Header>
                 
                        {" "}
                        {org.assignedPlans?.map(
                          ({
                            service,
                            servicePlanId,
                            capabilityStatus,
                            assignedDateTime,
                          }) => (
                            <p key={app.user?.id}>
                           <span id="service"> Service:</span> {service} <span id="service">ServicePlanId:</span> {servicePlanId}{/*
                             CapabilityStatus: {capabilityStatus}, AssignedDateTime: {assignedDateTime} */}


                            </p>
                          )
                        )}
                  
                 
                  </Fragment>
                ))}
              </p>


              
            </Card.Body>
          </div>
        </Card>
      </>
    </AuthenticatedTemplate>
  );
}
