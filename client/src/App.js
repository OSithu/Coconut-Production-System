//app. js

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import dashboard from "./components/dashboard";

import ViewSpread from "./components/ViewSpread";
import CreateSpread from "./components/CreateSpread";
import EditSpread from "./components/EditSpread";
import spreadDetails from "./components/spreadDetails";

import viewFertilization from "./components/viewFertilization";
import CreateFertilization from "./components/createFertilization";
import editFertilization from "./components/editFertilization";

// import ViewProducts from './components/viewProducts';
// import CreateProducts from './components/CreateProducts';

import ViewCusDetails from "./components/viewCusDetails";
import CreateCusDetails from "./components/createCusDetails";
import editCusDetails from "./components/editCusDetails";

import ViewTrees from "./components/ViewTrees";
import AddTrees from "./components/AddTrees";
import UpdateTrees from "./components/UpdateTrees";

import ViewFinanceDetails from "./components/ViewFinanceDetails";
import AddTransaction from "./components/AddTransaction";
import EditFinanceDetails from "./components/EditFinanceDetails";

import CreateQualityRecords from "./components/CreateQualityRecords";
import ViewQualityRecords from "./components/ViewQualityRecords";
import EditQualityRecords from "./components/EditQualityRecords";

import ViewEmployee from "./components/ViewEmployee";
import CreateEmployee from "./components/CreateEmployee";
import EditEmployee from "./components/EditEmployee";

import CreateProducts from "./components/CreateProducts";
import viewProducts from "./components/viewProducts";
import EditProducts from "./components/EditProducts";

import CreateProductCnt from "./components/CreateProductCnt";
import ViewProductCnt from "./components/ViewProductCnt";
import EditProductCnt from "./components/EditProductCnt";
import ProductCntDetails from "./components/productCntDetails";

import viewOrderDetails from "./components/viewOrderDetails";

import EstateDetails from "./components/EstateDetails";
import AddBlock from "./components/AddBlock";
import ViewBlock from "./components/ViewBlock";

import CreateOrderDetails from "./components/createOrderDetails";
import EditOrderDetails from "./components/editOrderDetails";

import ViewHarvest from "./components/ViewHarvest";
import AddHarvest from "./components/AddHarvest";
import UpdateHarvest from "./components/UpdateHarvest";
import HarvestingSchedules from "./components/HarvestingSchedules";
import AddHvstSchedule from "./components/AddHvstSchedule";
import UpdateHvstSchedule from "./components/UpdateHvstSchedule";

import Calculator from "./components/Calculator";
import fertilizationMain from "./components/fertilizationMain";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" Component={dashboard} />
          <Route path="/viewDisease" Component={ViewSpread} />
          <Route path="/createDisease" Component={CreateSpread} />
          <Route path="/editDisease/:id" Component={EditSpread} />
          <Route path="/spreadrecord/:id" Component={spreadDetails} />

          <Route path="/viewFertilization" Component={viewFertilization} />
          <Route path="/fertilizationsave" Component={CreateFertilization} />
          <Route
            path="/fertilizationupdate/:id"
            Component={editFertilization}
          />

          <Route path="/ViewTrees/:id" Component={ViewTrees} />
          <Route path="/AddTrees" Component={AddTrees} />
          <Route path="/updateTrees/:id" Component={UpdateTrees} />

          <Route path="/viewCus" Component={ViewCusDetails} />
          <Route path="/addCus" Component={CreateCusDetails} />
          <Route path="/editCus/:id" Component={editCusDetails} />

          <Route path="/viewFinanceDetails" Component={ViewFinanceDetails} />
          <Route path="/createFinanceDetails" Component={AddTransaction} />
          <Route path="/editFinanceDetails/:id" Component={EditFinanceDetails}/>

          <Route path="/viewEmployee" Component={ViewEmployee} />
          <Route path="/addEmp" Component={CreateEmployee} />
          <Route path="/editEmp/:id" Component={EditEmployee} />

          <Route path="/viewQualityRecord" Component={ViewQualityRecords} />
          <Route path="/addQualityRecord" Component={CreateQualityRecords} />
          <Route path="/editQualityRecord/:id" Component={EditQualityRecords} />

          <Route path="/viewProduct" Component={viewProducts} />
          <Route path="/addProduct" Component={CreateProducts} />
          <Route path="/editProduct/:id" Component={EditProducts} />

          <Route path="/viewProductCnt" Component={ViewProductCnt} />
          <Route path="/addProductCnt" Component={CreateProductCnt} />
          <Route path="/editProductCnt/:id" Component={EditProductCnt} />
          <Route path="/productCnt/:id" Component={ProductCntDetails} />

          <Route path="/estateDetails" Component={EstateDetails} />
          <Route path="/addBlock" Component={AddBlock} />
          <Route path="/viewBlock/:id" Component={ViewBlock} />


          <Route path="/viewOrder" Component={viewOrderDetails} />

          <Route path="/addOrder" Component={CreateOrderDetails} />
          <Route path="/editOrder/:id" Component={EditOrderDetails} />

          <Route path="/viewHarvest" Component={ViewHarvest} />
          <Route path="/addHarvest" Component={AddHarvest} />
          <Route path="/editHarvest/:id" Component={UpdateHarvest} />

          <Route path="viewHvstSchedules" Component={HarvestingSchedules}/>
          <Route path="addHvstSchedules" Component={AddHvstSchedule}/>
          <Route path="updateHvstSchedules/:id" Component={UpdateHvstSchedule}/>

          <Route path="/Calculator" Component={Calculator} /> 
          <Route path="/fertilizationMain" Component={fertilizationMain} /> 


        </Routes>
      </div>
    </Router>
  );
}

export default App;