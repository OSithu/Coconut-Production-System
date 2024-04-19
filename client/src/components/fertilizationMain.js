import React from 'react';
import "./fertilizationMain.css";

function fertilizationMain() {
  return (
    <main>
      <div className="fcontainer">
        <h2 className="fh2">Fertilization Management</h2>

        <section className="fcard">
          
          <h3>Manage Fertilization Plans</h3>
          <p>Create, view, edit, and delete fertilization plans for estate's coconut trees.</p>
          <a href="/viewFertilization" className="fbutton">Manage Plans</a>
        </section>

        <section className="fcard">
        
          <h3>Fertilization Calculator</h3>
          <p>Calculate the optimal fertilizer dosage based on .</p>
          <a href="/Calculator" className="fbutton">Open Calculator</a>
        </section>
      </div>
    </main>
  );
}

export default fertilizationMain;
