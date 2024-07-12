import React from 'react';

const TitleBar = () => {
  return (
    <div style={styles.titleBar}>
      {/* <h1>EMR</h1> */}
    </div>
  );
};

const styles = {
  titleBar: {
    width: '100%',
    minHeight: '38px',
    padding: '10px',
    backgroundColor: '#003366',
    color: 'white',
    textAlign: 'center',
    position: 'fixed',
    top: 0,
    zIndex: 1,
  },
};

export default TitleBar;
