import React from 'react';

const FertilizerDetails = () => {
    return (
        <div style={{ 
            fontFamily: 'Arial, sans-serif',
            margin: 0,
            padding: 0,
            backgroundColor: '#f4f4f4'
        }}>
            <div style={{
                maxWidth: '800px',
                margin: '20px auto',
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '5px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
            }}>
                <h1 style={{ textAlign: 'center', color: '#333' }}>Fertilizer Details</h1>

                <div style={{
                    marginBottom: '20px',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px'
                }}>
                    <h2 style={{ color: '#007bff' }}>Urea</h2>
                    <p><strong>Chemical Formula:</strong> NH2CONH2</p>
                    <p><strong>Description:</strong> Urea is a nitrogen-containing organic compound used as a fertilizer.</p>
                </div>

                <div style={{
                    marginBottom: '20px',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px'
                }}>
                    <h2 style={{ color: '#007bff' }}>Eppawala Rock Phosphate</h2>
                    <p><strong>Chemical Formula:</strong> Ca5(PO4)3(OH)</p>
                    <p><strong>Description:</strong> Eppawala rock phosphate is a natural source of phosphorus used in agriculture.</p>
                </div>

                <div style={{
                    marginBottom: '20px',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px'
                }}>
                    <h2 style={{ color: '#007bff' }}>Muriate of Potassium</h2>
                    <p><strong>Chemical Formula:</strong> KCl</p>
                    <p><strong>Description:</strong> Muriate of Potassium, also known as Potassium Chloride, is a common potassium fertilizer.</p>
                </div>

                <div style={{
                    marginBottom: '20px',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px'
                }}>
                    <h2 style={{ color: '#007bff' }}>Dolomite</h2>
                    <p><strong>Chemical Formula:</strong> CaMg(CO3)2</p>
                    <p><strong>Description:</strong> Dolomite is a mineral containing calcium magnesium carbonate used as a fertilizer and soil conditioner.</p>
                </div>
            </div>
        </div>
    );
};

export default FertilizerDetails;
