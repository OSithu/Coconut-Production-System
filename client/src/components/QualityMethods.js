import React from 'react';

const QualityMethods = () => {
    return (
        <div>
            <br></br>
            <h1 style={{ textAlign: 'center', color: '#388e3c' }}>Quality Methods</h1>
            <br></br>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '20px'
            }}>
                <QualityM
                    name="PH Range"
                    description="Coconut water typically has a pH range from slightly acidic to neutral, usually between 4.2 to 6.0.
                     This range may vary due to factors like coconut variety, environment, and soil.
                      Coconut water is rich in electrolytes and minerals, making it a hydrating drink.
                       Its pH supports a balanced internal environment in the body. 
                       Natural acids like malic and citric acids give coconut water its mildly tart taste.
                        Its pH is important for both flavor and potential health benefits, making it a popular choice for hydration and nutrition."

                    image="https://coconuthandbook.tetrapak.com/sites/tetrapak-cph/files/chapter/images/chap7_2.jpg"
                />
                <QualityM
                    name="Moisture Content"
                    description="The moisture content (%) of desiccated coconut indicates the residual water content within the coconut meat post-drying.
                     This crucial parameter ensures the quality and shelf stability of desiccated coconut products. 
                     Typically, a lower moisture content, usually less than 3%, is preferred to inhibit microbial growth, maintain product texture, and prolong shelf life. 
                     Proper moisture control during processing ensures the production of high-quality desiccated coconut with excellent texture, flavor, and extended shelf life."

                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY0nERowygOlBksw8a7W4Tj7MxaqokjxFyURuQNWfm6UY_O6RMDNNQ8M2aqftuauI_d8Y&usqp=CAU"
                />
                <QualityM
                    name="Free fatty acids (FFAs)"
                    description="Free fatty acids are natural components found in coconut oil, with lauric acid being the most common.
                     They give coconut oil its unique taste and smell.
                      These fatty acids also affect how stable the oil is and how long it lasts without spoiling.
                       In our bodies, they're processed for energy differently from other types of fats, providing a quick energy boost.
                        In skincare products, they're prized for keeping skin hydrated, smooth, and protected from drying out. 
                        Overall, free fatty acids make coconut oil useful in cooking, skincare, and for health reasons."

                    image="https://upload.wikimedia.org/wikipedia/commons/f/f3/Coconut_and_oil.jpg"
                />
                <QualityM
                    description="To check coconut quality, various methods ensure they're fresh, healthy, and defect-free. 
                    Visual checks focus on color, texture, and husk. Weight and density show water content and maturity. 
                    Sound and shake tests check for water and maturity. Labs analyze nutrition, safety, pH, and moisture. 
                    Blemish inspection spots damage, and good storage keeps them fresh. 
                    These methods guarantee coconuts meet standards for safe, tasty products. "

                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz--eFTXqDII7yfTJ7OifzZluI8TXqCjK7-A&s"
                />
            </div>
        </div>
    );
};

const QualityM = ({ name, description, image }) => {
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
            <p><h5>{description}</h5></p>
        </div>
    );
};

export default QualityMethods;