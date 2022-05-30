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
    <div className="p-5 mb-4 bg-light rounded-3 text-dark">
    <Container fluid>
    <AuthenticatedTemplate>
      <>
        <Card className="" border="none" bg="" text="dark" style={{ width: "100%" }}>
      <div className="hider">    <Card.Header className="heedsone">
            <h4 className="header">Organization Details:</h4>
          </Card.Header></div>

         
            {" "}
            {app.org?.map((org) => (
              <Fragment key={org?.id}>
                <Card.Body className="cards">
                  <p>
                    <h3>Name:</h3> {org.displayName}{" "}
                  </p>
                  <p>
                    <h4>TenantType:</h4> {org.tenantType}
                  </p>
                  <p>
                    <h5>Id:</h5> {org.id}
                  </p>
                </Card.Body>
<div className="hider">
                <Card.Header className="heedstwo">
                  <h4 className="header">Assigned plans:</h4>
                </Card.Header></div>
                <Card.Body className="cards">
                  {" "}
                  <p>
                    {" "}
                    {org.assignedPlans?.map(
                      ({
                        service,
                        servicePlanId,
                        capabilityStatus,
                        assignedDateTime,
                      }) => (
                        <p key={app.user?.id}>
                          <span id="service"> Service:</span> {service}{" "}
                          <span id="service">ServicePlanId:</span>{" "}
                          {servicePlanId}
                          {/*
                             CapabilityStatus: {capabilityStatus}, AssignedDateTime: {assignedDateTime} */}
                        </p>
                      )
                    )}
                  </p>
                  </Card.Body>
              </Fragment>
              
            ))}
          
        </Card>
      </>
    </AuthenticatedTemplate>
    </Container>
    </div>
  );
}
