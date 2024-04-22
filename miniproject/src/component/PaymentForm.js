import React, { useState } from 'react';

function PaymentForm({ selectedPlan, onClose }) {
    const [formData, setFormData] = useState({
        fullName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic to handle form submission, such as sending the data to the server
        console.log('Form submitted:', formData);
        // Close the form
        onClose();
    };

    return (
        <div className="payment-form">
            <h2>Payment Form</h2>
            <p>You have selected the plan: {selectedPlan.name}</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="fullName" name="fullName"  placeholder='name' value={formData.fullName} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cardNumber" className="form-label">Card Number</label>
                    <input type="text" className="form-control" id="cardNumber" name="cardNumber"  placeholder='____-____-____-____' value={formData.cardNumber} onChange={handleChange} required />
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                        <input type="text" className="form-control" id="expiryDate" name="expiryDate" placeholder='Expiry Date' value={formData.expiryDate} onChange={handleChange} required />
                    </div>
                    <div className="col">
                        <label htmlFor="cvv" className="form-label">CVV</label>
                        <input type="text" className="form-control" id="cvv" name="cvv" placeholder='CCV' value={formData.cvv} onChange={handleChange} required />
                    </div>
                    
                </div>
                <button type="submit" className="btn btn-primary subbtn" style={{backgroundColor:"black",border:"none", ":hover": { backgroundColor: "#373535" }  }}>Submit Payment</button>
            </form>
        </div>
    );
}

export default PaymentForm;
