import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StreamProvider } from './contexts/StreamContext';
import { AlertProvider } from './contexts/AlertsContext';
import './App.css';

import Home from './pages/Home';
import Monitor from './pages/Monitor';
import Alerts from './pages/Alerts';
import Layout from '@components/layout/Layout';

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
  </div>
);

function App() {
  return (
    <Router>
      <StreamProvider>
        <AlertProvider>
          <div className="App">
            <Suspense fallback={<LoadingFallback />}>
              <Layout>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/monitor" component={Monitor} />
                  <Route path="/alerts" component={Alerts} />
                </Switch>
              </Layout>
            </Suspense>
          </div>
        </AlertProvider>
      </StreamProvider>
    </Router>
  );
}

export default App;
