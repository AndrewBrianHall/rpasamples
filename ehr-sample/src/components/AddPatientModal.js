import React, { useState } from 'react';
import './AddPatientModal.css'; // Import the CSS file

const AddPatientModal = ({ onSave, onCancel }) => {
    const [newPatient, setNewPatient] = useState({
        firstName: '', middleName: '', lastName: '',
        dob: '', genderWithInsurance: '', phoneNumber: '',
        email: '', address: '', city: '', state: '', zip: '',
        diagnosis: '', numberOfRequestedVisits: '', treatmentNotes: '', referringPhysician: ''
    });

    const handleChange = (field, value) => {
        setNewPatient(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        onSave(newPatient);
        setNewPatient({
            firstName: '', middleName: '', lastName: '',
            dob: '', genderWithInsurance: '', phoneNumber: '',
            email: '', address: '', city: '', state: '', zip: '',
            diagnosis: '', numberOfRequestedVisits: '', treatmentNotes: '', referringPhysician: ''
        }); // Reset form
    };

    return (
        <div className="modal">
            <h2>Create New Patient</h2>
            <div className="row">
                <div className="inputGroup">
                    <label>First Name</label>
                    <input type="text" value={newPatient.firstName} onChange={e => handleChange('firstName', e.target.value)} />
                </div>
                <div className="inputGroup">
                    <label>Middle Name</label>
                    <input type="text" value={newPatient.middleName} onChange={e => handleChange('middleName', e.target.value)} />
                </div>
                <div className="inputGroup">
                    <label>Last Name</label>
                    <input type="text" value={newPatient.lastName} onChange={e => handleChange('lastName', e.target.value)} />
                </div>
            </div>
            <div className="row">
                <div className="inputGroup">
                    <label>Date of Birth</label>
                    <input type="date" value={newPatient.dob} onChange={e => handleChange('dob', e.target.value)} />
                </div>
                <div className="inputGroup">
                    <label>Gender with Insurance</label>
                    <select
                        value={newPatient.genderWithInsurance}
                        onChange={e => handleChange('genderWithInsurance', e.target.value)}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Nonbinary">Nonbinary</option>
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="inputGroup">
                    <label>Phone Number</label>
                    <input type="text" value={newPatient.phoneNumber} onChange={e => handleChange('phoneNumber', e.target.value)} />
                </div>
                <div className="inputGroup">
                    <label>Email</label>
                    <input type="email" value={newPatient.email} onChange={e => handleChange('email', e.target.value)} />
                </div>
            </div>
            <div className="row">
                <div className="inputGroup">
                    <label>Address</label>
                    <input type="text" value={newPatient.address} onChange={e => handleChange('address', e.target.value)} />
                </div>
            </div>
            <div className="row">
                <div className="inputGroup">
                    <label>City</label>
                    <input type="text" value={newPatient.city} onChange={e => handleChange('city', e.target.value)} />
                </div>
                <div className="inputGroup">
                    <label>State</label>
                    <input type="text" value={newPatient.state} onChange={e => handleChange('state', e.target.value)} />
                </div>
                <div className="inputGroup">
                    <label>Zip</label>
                    <input type="text" value={newPatient.zip} onChange={e => handleChange('zip', e.target.value)} />
                </div>
            </div>
            <div className="row">
                <div className="inputGroup">
                    <label>Referring Physician</label>
                    <input type="text" value={newPatient.referringPhysician} onChange={e => handleChange('referringPhysician', e.target.value)} />
                </div>
            </div>
            <div className="row">
                <div className="inputGroup">
                    <label>Diagnosis</label>
                    <input type="text" value={newPatient.diagnosis} onChange={e => handleChange('diagnosis', e.target.value)} />
                </div>
            </div>
            <div className="row">
                <div className="textareaGroup">
                    <label>Treatment Notes</label>
                    <textarea value={newPatient.treatmentNotes} onChange={e => handleChange('treatmentNotes', e.target.value)} rows="5"></textarea>
                </div>
            </div>
            <div className="buttons">
                <button className="button cancelButton" onClick={onCancel}>Cancel</button>
                <button className="button addButton" onClick={handleSubmit}>Create</button>
            </div>
        </div>
    );
};

export default AddPatientModal;