import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PaymentForm from './PaymentForm'; // Import PaymentForm component
import './Plan.css';
import Navbar from './Navbar';

function Plan({ plans }) {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showPaymentForm, setShowPaymentForm] = useState(false); // State to control the visibility of the payment form
    const [selectedPlanPrice, setSelectedPlanPrice] = useState(null); // State to store the selected plan's price

    useEffect(() => {
        // Update the selected plan's price whenever selectedPlan changes
        if (selectedPlan) {
            setSelectedPlanPrice(selectedPlan.price);
        }
    }, [selectedPlan]);
    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
    };

    const handleBuyNow = () => {
        setShowPaymentForm(true); // Open the payment form when "Buy Now" is clicked
    };

    const handleClosePaymentForm = () => {
        setShowPaymentForm(false); // Close the payment form
    };

    return (
        <>
            <section className='plan-cont' >
                <Navbar />
                <div className='trade-cont' >
                    <div className="container-plan" style={{ width: "700px" }}  >
                        <div className="row">
                            {plans.map(plan => (
                                <div key={plan.id} className="col-md-4"  >
                                    <div className={`card mb-3 ${selectedPlan === plan ? 'selected' : ''}`} onClick={() => handlePlanSelect(plan)}>
                                        <div className="card-body card-edit" >
                                            <h5 className="card-title card-edit-text">{plan.name}</h5>
                                            <p className="card-text">{plan.price}</p>
                                            <p className="card-text">{plan.description} </p>
                                            <button className="btn btn-primary card-btn-edit" onClick={handleBuyNow}>Select Plan</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="row">
                            <div className="col-md-12" style={{ padding: "20px" }}>
                                {/* Display selected plan and show payment form when selectedPlan exists and showPaymentForm is true */}
                                {selectedPlan && (
                                        <PaymentForm selectedPlan={selectedPlan} onClose={handleClosePaymentForm} />
                                    )}
                                    <div className="col">
                                        <label htmlFor="expiryDate" className="form-label">Amount</label>
                                        {/* Update the value of the input field based on selectedPlanPrice */}
                                        <input type="text" className="form-control" id="expiryDate" name="expiryDate" value={selectedPlanPrice !== null ? selectedPlanPrice : ''} readOnly required />
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Plan;
