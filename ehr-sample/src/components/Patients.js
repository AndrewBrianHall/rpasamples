import React, { useState } from 'react';
import AddPatientModal from './AddPatientModal';
import './Patients.css'; // Import the CSS file

const initialPatients = [
    { id: 1, firstName: 'Alice', middleName: 'Q.', lastName: 'Johnson', dob: '1984-05-23', genderWithInsurance: 'Female', phoneNumber: '555-1234', email: 'alice.j@example.com', address: '1234 Main St', city: 'Anytown', state: 'CA', zip: '90210', diagnosis: 'Rotator cuff surgery', numberOfRequestedVisits: 16, treatmentNotes: 'Rehab shoulder', referringPhysician: 'Clara Huxley, MD' },
    { id: 2, firstName: 'Bob', middleName: 'L.', lastName: 'Smith', dob: '1978-04-17', genderWithInsurance: 'Male', phoneNumber: '555-5678', email: 'bob.s@example.com', address: '4321 First St', city: 'Anytown', state: 'CA', zip: '90210', diagnosis: 'Back Pain', numberOfRequestedVisits: 3, treatmentNotes: 'Initial assessment required', referringPhysician: 'Dr. Marcus Wellborne' },
    { id: 3, firstName: 'Charlie', middleName: 'M.', lastName: 'Brown', dob: '1990-08-30', genderWithInsurance: 'Male', phoneNumber: '555-8765', email: 'charlie.b@example.com', address: '987 Elm St', city: 'Othertown', state: 'TX', zip: '30022', diagnosis: 'Knee Pain', numberOfRequestedVisits: 8, treatmentNotes: 'Eval required', referringPhysician: 'Evelyn Storrow, D.O.' },
    { id: 4, firstName: 'Diana', middleName: 'F.', lastName: 'Prince', dob: '1982-07-09', genderWithInsurance: 'Female', phoneNumber: '555-4321', email: 'diana.p@example.com', address: '321 Fourth St', city: 'Sometown', state: 'NY', zip: '10001', diagnosis: 'Pulled hamstring', numberOfRequestedVisits: 2, treatmentNotes: 'Include massage', referringPhysician: 'Dr. Leo Carrington' },
    { id: 5, firstName: 'Eva', middleName: 'G.', lastName: 'Green', dob: '1975-03-20', genderWithInsurance: 'Female', phoneNumber: '555-9876', email: 'eva.g@example.com', address: '654 Pine St', city: 'Anothertown', state: 'FL', zip: '33101', diagnosis: 'Sprained ankle', numberOfRequestedVisits: 1, treatmentNotes: 'Apply ice, rest', referringPhysician: 'Nora Fieldstone, M.D.' },
    { id: 6, firstName: 'Frank', middleName: 'H.', lastName: 'Ocean', dob: '1987-10-28', genderWithInsurance: 'Male', phoneNumber: '555-1122', email: 'frank.o@example.com', address: '5678 Maple St', city: 'Heretown', state: 'WA', zip: '98101', diagnosis: 'Repaired achilles tendon', numberOfRequestedVisits: 24, treatmentNotes: 'See 2x per week for 12 weeks', referringPhysician: 'Isaiah Morrow' },
    { id: 7, firstName: 'Grace', middleName: 'I.', lastName: 'Hopper', dob: '1952-12-09', genderWithInsurance: 'Female', phoneNumber: '555-2233', email: 'grace.h@example.com', address: '321 Cedar St', city: 'Wheretown', state: 'CO', zip: '80201', diagnosis: 'Knee replacement', numberOfRequestedVisits: 24, treatmentNotes: '3x per week for 8 weeks', referringPhysician: 'Julia Bancroft, DO' },
    { id: 8, firstName: 'Alex', middleName: 'P.', lastName: 'Person', dob: '1981-06-15', genderWithInsurance: 'Nonbinary', phoneNumber: '555-3344', email: 'henry.l@example.com', address: '213 Oak St', city: 'Thistown', state: 'IL', zip: '60601', diagnosis: 'Muscle weakness in legs', treatmentNotes: 'Work on strenghtening legs', referringPhysician: 'Theodore Raines, MD' },
];

const Patients = () => {
    const [patients, setPatients] = useState(initialPatients);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const addPatient = (newPatient) => {
        newPatient.id = patients.length + 1; // Simple ID assignment
        setPatients([...patients, newPatient]);
        setShowModal(false);
    };

    return (
        <div style={styles.container}>
            {showModal && <div style={styles.overlay}></div>}
            <div className="listContainer">
                <div className="buttonContainer">
                    <button className="button addPatientButton" onClick={() => setShowModal(true)}>Add Patient</button>
                </div>
                <h2>Patients</h2>
                <ul style={styles.list}>
                    {patients.map(patient => (
                        <li
                            key={patient.id}
                            style={selectedPatient && selectedPatient.id === patient.id ? styles.selectedItem : styles.listItem}
                            onClick={() => setSelectedPatient(patient)}
                        >
                            {`${patient.firstName} ${patient.middleName} ${patient.lastName}`}
                        </li>
                    ))}
                </ul>
            </div>
            <div style={styles.detailsContainer}>
                {selectedPatient && (
                    <div style={styles.details}>
                        <h3>Details</h3>
                        <p><strong>Name:</strong> {`${selectedPatient.firstName} ${selectedPatient.middleName} ${selectedPatient.lastName}`}</p>
                        <p><strong>Date of Birth:</strong> {selectedPatient.dob}</p>
                        <p><strong>Gender with Insurance:</strong> {selectedPatient.genderWithInsurance}</p>
                        <p><strong>Phone Number:</strong> {selectedPatient.phoneNumber}</p>
                        <p><strong>Email:</strong> {selectedPatient.email}</p>
                        <p><strong>Address:</strong> {`${selectedPatient.address}, ${selectedPatient.city}, ${selectedPatient.state} ${selectedPatient.zip}`}</p>
                        <p><strong>Referring Physician:</strong> {selectedPatient.referringPhysician}</p>
                        <p><strong>Diagnosis:</strong> {selectedPatient.diagnosis}</p>
                        <p><strong>Number of Requested Visits:</strong> {selectedPatient.numberOfRequestedVisits}</p>
                        <p><strong>Treatment Notes:</strong> {selectedPatient.treatmentNotes}</p>
                    </div>
                )}
            </div>
            {showModal && <AddPatientModal onSave={addPatient} onCancel={() => setShowModal(false)} />}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        height: '88vh',
        position: 'relative',
    },
    listContainer: {
        width: '33.33%',
        padding: '10px',
        boxSizing: 'border-box',
        overflowY: 'auto',
        height: '100%',
    },
    list: {
        listStyleType: 'none',
        padding: 0,
        marginTop: '20px',
    },
    listItem: {
        padding: '10px',
        cursor: 'pointer',
        borderBottom: '1px solid gray',
    },
    selectedItem: {
        padding: '10px',
        cursor: 'pointer',
        borderBottom: '1px solid gray',
        backgroundColor: 'lightblue',
    },
    detailsContainer: {
        width: '66.67%',
        padding: '20px',
        boxSizing: 'border-box',
        overflowY: 'auto',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 2,
    },
    addButton: {
        display: 'block',
        margin: '10px 0',
    },
};

export default Patients;