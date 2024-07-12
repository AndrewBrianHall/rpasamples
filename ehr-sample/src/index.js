import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import TitleBar from './components/TitleBar';
import VerticalTabs from './components/VerticalTabs';
import Content from './components/Content';

const baseUrl = process.env.REACT_APP_BASE_URL;

const App = () => {
  return (
    <Router basename={baseUrl}>
      <TitleBar />
      <VerticalTabs />
      <Content />
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);