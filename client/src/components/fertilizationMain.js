import React from 'react';
import "./fertilizationMain.css";

function fertilizationMain() {
  return (
    <main>
      <div className="container">
        <h2>Fertilization Management</h2>

        <section className="card">
          
          <h3>Manage Fertilization Plans</h3>
          <p>Create, view, edit, and delete fertilization plans for estate's coconut trees.</p>
          <a href="#" className="button">Manage Plans</a>
        </section>

        <section className="card">
        
          <h3>Fertilization Calculator</h3>
          <p>Calculate the optimal fertilizer dosage based on .</p>
          <a href="#" className="button">Open Calculator</a>
        </section>
      </div>
    </main>
  );
}

export default fertilizationMain;
