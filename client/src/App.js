import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import dashboard from './components/dashboard';

import viewSpread from './components/viewSpread';
import createSpread from './components/createSpread';
import editSpread from './components/editSpread';
import spreadDetails from './components/spreadDetails';

import viewFertilization from './components/viewFertilization';
import CreateFertilization from './components/createFertilization';
import editFertilization from './components/editFertilization';

// import ViewProducts from './components/viewProducts';
// import CreateProducts from './components/CreateProducts';

import ViewCusDetails from './components/viewCusDetails';
import CreateCusDetails from './components/createCusDetails';
import editCusDetails from './components/editCusDetails';

import ViewTrees from "./components/ViewTrees";
import AddTrees from "./components/AddTrees";
import UpdateTrees from "./components/UpdateTrees";

import ViewFinanceDetails from "./components/ViewFinanceDetails";
import AddTransaction from "./components/AddTransaction";
import EditFinanceDetails from "./components/EditFinanceDetails";

import CreateQualityRecords from "./components/CreateQualityRecords";
import ViewQualityRecords from "./components/ViewQualityRecords";
import EditQualityRecords from './components/EditQualityRecords';

import viewEmployee from "./components/viewEmployee";
import createEmployee from './components/createEmployee';
import editEmployee from './components/editEmployee';




function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" Component={dashboard}/>
          <Route path="/viewDisease" Component={viewSpread}/>
          <Route path="/createDisease" Component={createSpread}/>
          <Route path="/editDisease/:id" Component={editSpread}/>
          <Route path="/spreadrecord/:id" Component={spreadDetails}/>

        <Route path="/viewFertilization" Component={viewFertilization}/>
        <Route path="/fertilizationsave" Component={CreateFertilization}/>
        <Route path="/fertilizationupdate/:id" Component={editFertilization}/>

        <Route path="/ViewTrees" Component={ViewTrees}/>
        <Route path="/AddTrees" Component={AddTrees}/>
        <Route path="/updateTrees/:id" Component={UpdateTrees}/>

        <Route path="/viewCus" Component={ViewCusDetails}/>
        <Route path="/addCus" Component={CreateCusDetails}/>
        <Route path="/editCus/:id" Component={editCusDetails}/>

        <Route path="/viewFinanceDetails" Component={ViewFinanceDetails}/>
        <Route path="/createFinanceDetails" Component={AddTransaction}/>
        <Route path="/editFinanceDetails/:id" Component={EditFinanceDetails}/>

        <Route path="/viewEmployee" Component={viewEmployee}/>
        <Route path="/addEmp" Component={createEmployee}/>
        <Route path="/editEmp/:id" Component={editEmployee}/>

        <Route path="/viewQualityRecord" Component={ViewQualityRecords}/>
        <Route path="/addQualityRecord" Component={CreateQualityRecords}/>
        <Route path="/editQualityRecord/:id" Component={EditQualityRecords}/>

        
        



      

      
  
        </Routes>
      </div>
    </Router>
  );
}

export default App;