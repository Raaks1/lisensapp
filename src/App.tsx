import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Container } from "react-bootstrap";
import { MsalProvider } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";

import ProvideAppContext from "./AppContext";
import ErrorMessage from "./ErrorMessage";
import NavBar from "./NavBar";
import Licences from "./Licenses";
import AssignedPlans from "./AssignedPlans";
import Search from "./Search";
import Organization from "./Organization";

import "bootstrap/dist/css/bootstrap.css";

type AppProps = {
  pca: IPublicClientApplication;
};

export default function App({ pca }: AppProps) {
  return (
    <MsalProvider instance={pca}>
      <ProvideAppContext>
        <Router>
          <div>
            <NavBar />
            <Container>
              <ErrorMessage />
              <Routes>
                <Route path="/" element={<Licences />} />

                <Route path="/Search" element={<Search />} />

                <Route path="/AssignedPlans" element={<AssignedPlans />} />

                <Route path="/Organization" element={<Organization />} />
              </Routes>
            </Container>
          </div>
        </Router>
      </ProvideAppContext>
    </MsalProvider>
  );
}
