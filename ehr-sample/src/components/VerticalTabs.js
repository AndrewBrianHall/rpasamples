import React from 'react';
import { Link } from 'react-router-dom';

const VerticalTabs = () => {
  return (
    <div style={styles.verticalTabs}>
      <Link to="/" exact style={styles.tabLink} activeStyle={styles.activeTabLink}>Dashboard</Link>
      <Link to="/" style={styles.tabLink} activeStyle={styles.activeTabLink}>On Deck</Link>
      <Link to="/"style={styles.tabLink} activeStyle={styles.activeTabLink}>Scheduling</Link>
      <Link to="/patients" style={styles.activeTabLink} activeStyle={styles.activeTabLink}>Patients</Link>
      <Link to="/" style={styles.tabLink} activeStyle={styles.activeTabLink}>Reports</Link>
      <Link to="/" style={styles.tabLink} activeStyle={styles.activeTabLink}>Library</Link>
      <Link to="/" style={styles.tabLink} activeStyle={styles.activeTabLink}>Address Book</Link>
    </div>
  );
};

const styles = {
    verticalTabs: {
      width: '200px',
      height: '100vh',
      backgroundColor: '#003366',  
      padding: '10px',
      position: 'fixed',
      top: '50px',
      left: 0,
      overflowY: 'auto',
    },
    tabLink: {
      display: 'block',
      padding: '10px',
      textDecoration: 'none',
      color: 'white',
      marginBottom: '10px',
    },
    activeTabLink: {
      backgroundColor: 'royalblue',  // Changed to royal blue for the selected tab
      display: 'block',
      padding: '10px',
      textDecoration: 'none',
      color: 'white',
      marginBottom: '10px',
    },
  };

export default VerticalTabs;
