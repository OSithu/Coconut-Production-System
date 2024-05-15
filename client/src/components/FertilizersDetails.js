import React from 'react';

const FertilizerDetails = () => {
    return (
        <div>
            <br></br>
            <h1 style={{ textAlign: 'center', color: '#388e3c' }}>Fertilizer Details</h1>
            <br></br>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '20px'
            }}>
                <Fertilizer
                    name="Urea"
                    formula="NH2CONH2"
                    description="Urea is a high-nitrogen fertilizer commonly used in coconut cultivation.
                    It helps in the vegetative growth of coconut palms, aiding in the development of leaves and shoots.
                    Applying urea promotes lush green foliage and enhances the overall health of the coconut palm."
                    image="https://t4.ftcdn.net/jpg/04/16/71/49/360_F_416714942_DE5NIMtZQDXhNcWUNmfRDfRIjaPiGtHJ.jpg"
                />
                <Fertilizer
                    name="Eppawala Phosphate"
                    formula="Ca5(PO4)3(OH)"
                    description="Eppawala rock phosphate is a natural source of phosphorus, an essential nutrient for coconut palms.
                    It helps in root development, flowering, and fruit formation in coconut trees.
                    Regular application of rock phosphate improves soil fertility and promotes healthy coconut yield."
                    image="https://5.imimg.com/data5/JS/MD/SF/SELLER-7028148/rock-phosphate-500x500.jpg"
                />
                <Fertilizer
                    name="Muriate of Potassium"
                    formula="KCl"
                    description="Muriate of potash is a potassium-rich fertilizer crucial for coconut palm growth.
                    Potassium supports the overall health and resilience of coconut palms, aiding in stress tolerance and disease resistance.
                    Regular application of muriate of potash enhances fruit quality, size, and yield in coconut cultivation."
                    image="https://image.made-in-china.com/44f3j00DQWiTnKrmaUE/Mop-Fertilizer-Muriate-of-Potash-Red-Granular-Potassium-Chloride.webp"
                />
                <Fertilizer
                    name="Dolomite"
                    formula="CaMg(CO3)2"
                    description="Dolomite is a calcium and magnesium carbonate supplement used to correct soil acidity in coconut plantations.
                    It helps maintain proper soil pH levels, promoting nutrient uptake by coconut palms.
                    Dolomite also improves soil structure and enhances the availability of essential nutrients, ultimately leading to healthier coconut trees and increased yield."
                    image="https://bunny-wp-pullzone-xllypyhf2j.b-cdn.net/wp-content/uploads/2017/01/dolomite-lime-by-walts-organic-fertilizers-1.jpg"
                />
            </div>
        </div>
    );
};

const Fertilizer = ({ name, formula, description, image }) => {
    return (
        <div style={{
            maxWidth: '400px',
            padding: '20px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
        }}>
            <h2 style={{ color: '#388e3c' }}>{name}</h2>
            <img src={image} alt={name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }} />
            <p><strong>Chemical Formula:</strong><font color="red"> {formula}</font></p>
            <p><h5>{description}</h5></p>
        </div>
    );
};

export default FertilizerDetails;


