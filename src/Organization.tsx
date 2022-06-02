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
    <div className="p-5 mb-4 mt-4 bg-light rounded-3 text-dark">
      <Container fluid>
        <h1 className="header">Organizational overview: </h1>
        <p className="lead">
          License and service information for the organization
        </p>

        <AuthenticatedTemplate>
          <>
            <Card
              className=""
              bg="light"
              text="dark"
              style={{ width: "100%", border: "none" }}
            >
              <div className="hider">
                {" "}
                <Card.Header className="heedsone">
                  <h4 className="header">Organization Details:</h4>
                </Card.Header>
              </div>{" "}
              {app.org?.map((org) => (
                <Fragment key={org?.id}>
                  <Card.Body className="cards">
                    <div className="p1">
                      <div className="h3">Name:</div> {org.displayName}
                    </div>
                    <div className="p1">
                      <div className="h3">TenantType:</div> {org.tenantType}
                    </div>
                    <div className="p1">
                      <div className="h3">Id:</div> {org.id}
                    </div>
                  </Card.Body>
                  <div className="hider">
                    <Card.Header className="heedstwo">
                      <h4 className="header">Assigned plans:</h4>
                    </Card.Header>
                  </div>
                  <Card.Body className="cards">
                    {" "}
                    <>
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
                            <span id="service"> Service:</span> {service}{" "}
                            <span id="service">ServicePlanId:</span>{" "}
                            {servicePlanId}
                            {/*
                             CapabilityStatus: {capabilityStatus}, AssignedDateTime: {assignedDateTime} */}
                          </p>
                        )
                      )}
                    </>
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
