import React from 'react';
//import "./fertilizationMain.css";

function fertilizationMain() {
  return (
    <main>
      <div className="container">
        <h2>Fertilization Management</h2>

        <section className="card">
          <img src="images/fertilizer-plan.jpg" alt="Fertilization Plan" width="200" height="150" />
          <h3>Manage Fertilization Plans</h3>
          <p>Create, view, edit, and delete fertilization plans for your coconut trees.</p>
          <a href="#" className="button">Manage Plans</a>
        </section>

        <section className="card">
          <img src="images/fertilizer-calculator.jpg" alt="Fertilizer Calculator" width="200" height="150" />
          <h3>Fertilization Calculator</h3>
          <p>Calculate the optimal fertilizer dosage based on soil analysis and palm health.</p>
          <a href="#" className="button">Open Calculator</a>
        </section>
      </div>
    </main>
  );
}

export default fertilizationMain;
