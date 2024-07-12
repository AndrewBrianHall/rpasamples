import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Patients from './Patients';

const Content = () => {
    return (
        <div style={styles.content}>
            <Routes>
                <Route path="/" element={<Navigate replace to="/patients" />} />
                <Route path="/patients" element={<Patients />} />
                {/* <Route path="/tab2" element={<TabContent2 />} /> */}
            </Routes>
        </div>
    );
};

const styles = {
    content: {
        marginLeft: '220px',
        padding: '20px',
        marginTop: '70px',
    },
};

export default Content;
