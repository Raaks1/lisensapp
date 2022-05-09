import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import { MsalProvider } from '@azure/msal-react'
import { IPublicClientApplication } from '@azure/msal-browser';
import NewEvent from './NewEvent';
import ProvideAppContext from './AppContext';
import ErrorMessage from './ErrorMessage';
import NavBar from './NavBar';
import Welcome from './Welcome';
import Calendar from './Calendar';
import { Brukere } from './Brukere';
import 'bootstrap/dist/css/bootstrap.css';

type AppProps= {
  pca: IPublicClientApplication
};

export default function App({ pca }: AppProps) {
  return(
    <MsalProvider instance={ pca }>
      <ProvideAppContext>
        <Router>
          <div>
            <NavBar />
            <Container>
              <ErrorMessage />
              <Routes>
              <Route path="/"
                element= {<Welcome />}/>
              
                <Route path="/Calendar"
                element= {<Calendar path={''} />}/>
                <Route path="/NewEvent"
                element= {<NewEvent path={''} />}/>
               </Routes>
            </Container>
          </div>
          
        </Router>
      
      </ProvideAppContext>
    </MsalProvider>
  );
}