import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import dashboard from "./components/dashboard";

import ViewSpread from "./components/ViewSpread";
import CreateSpread from "./components/CreateSpread";
import EditSpread from "./components/EditSpread";
import spreadDetails from "./components/spreadDetails";

import viewFertilization from "./components/viewFertilization";
import CreateFertilization from "./components/createFertilization";
import editFertilization from "./components/editFertilization";
import FertilizersDetails from "./components/FertilizersDetails";
import FertilizationToDo from "./components/FertilizationToDo";

import ViewCusDetails from "./components/viewCusDetails";
import CreateCusDetails from "./components/createCusDetails";

import ViewTrees from "./components/ViewTrees";
import AddTrees from "./components/AddTrees";
import UpdateTrees from "./components/UpdateTrees";

import ViewFinanceDetails from "./components/ViewFinanceDetails";
import AddTransaction from "./components/AddTransaction";
import EditFinanceDetails from "./components/EditFinanceDetails";

import CreateQualityRecords from "./components/CreateQualityRecords";
import ViewQualityRecords from "./components/ViewQualityRecords";
import EditQualityRecords from "./components/EditQualityRecords";
import ViewQRecord from "./components/ViewQRecord";

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

import LoginForm from "./components/LoginForm";
import WelcomeScreen from "./components/WelcomeScreen";

import HarvestingSchedules from "./components/HarvestingSchedules";
import AddHvstSchedule from "./components/AddHvstSchedule";
import UpdateHvstSchedule from "./components/UpdateHvstSchedule";

import Calculator from "./components/Calculator";
import fertilizationMain from "./components/fertilizationMain";

import ViewBudgetDetails from "./components/ViewBudgetDetails";
import AddBudgetDetails from "./components/AddBudgetDetails";
import editBudgetDetails from "./components/editBudgetDetails";

import ViewItems from "./components/ViewItems";
import ViewDetails from "./components/ViewDetails";

import EstateStaff from "./components/EstateStaff";
import ViewAllTrees from "./components/ViewAllTrees";
import ViewHvstSchedule from "./components/ViewHvstSchedule";

import CustomerProfile from "./components/CustomerProfile";
import OrderProfile from "./components/OrderProfile";

import Profile from "./components/Profile";
import GenerateSpreadReport from "./components/GenerateSpreadReport";

import ViewTaskShedule from "./components/ViewTaskShedule";
import CreateShedule from "./components/CreateShedule";
import EditTaskShedule from "./components/EditTaskShedule";

import ViewPestRecords from "./components/ViewPestRecords";
import CreatePestRecords from "./components/CreatePestRecords";
import GeneratePestReport from "./components/GeneratePestRecord";

import ProductDash from "./components/ProductDash";
import EditCusDetails from "./components/editCusDetails";

import ReminderList from "./components/ReminderList";

import CalculatorEmp from "./components/SalaryCalculator";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/dashboard" Component={dashboard} />
          <Route path="/viewDisease" Component={ViewSpread} />
          <Route path="/createDisease" Component={CreateSpread} />
          <Route path="/editDisease/:id" Component={EditSpread} />
          <Route path="/spreadrecord/:id" Component={spreadDetails} />

          <Route path="/viewFertilization" Component={viewFertilization} />
          <Route path="/fertilizationsave" Component={CreateFertilization} />
          <Route path="/fertilizationupdate/:id" Component={editFertilization}/>
          <Route path="/FertilizersDetails" Component={FertilizersDetails}/>
          <Route path="/FertilizationToDo" Component={FertilizationToDo}/>

          <Route path="/ViewTrees/:id" Component={ViewTrees} />
          <Route path="/AddTrees" Component={AddTrees} />
          <Route path="/updateTrees/:id" Component={UpdateTrees} />

          <Route path="/viewCus" Component={ViewCusDetails} />
          <Route path="/addCus" Component={CreateCusDetails} />

          <Route path="/editCus/:username" Component={EditCusDetails} />

          <Route path="/viewFinanceDetails" Component={ViewFinanceDetails} />
          <Route path="/createFinanceDetails" Component={AddTransaction} />
          <Route
            path="/editFinanceDetails/:id"
            Component={EditFinanceDetails}
          />

          <Route path="/viewEmployee" Component={ViewEmployee} />
          <Route path="/addEmp" Component={CreateEmployee} />
          <Route path="/editEmp/:id" Component={EditEmployee} />

          <Route path="/viewQualityRecord" Component={ViewQualityRecords} />
          <Route path="/addQualityRecord" Component={CreateQualityRecords} />
          <Route path="/editQualityRecord/:id" Component={EditQualityRecords} />
          <Route path="/viewQRecord/:id" Component={ViewQRecord} />

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
          <Route path="viewHvstSchedules" Component={HarvestingSchedules} />
          <Route path="addHvstSchedules" Component={AddHvstSchedule} />
          <Route
            path="updateHvstSchedules/:id"
            Component={UpdateHvstSchedule}
          />

          <Route path="/Calculator" Component={Calculator} />
          <Route path="/fertilizationMain" Component={fertilizationMain} />

          <Route path="/ViewBudgetDetails" Component={ViewBudgetDetails} />
          <Route path="/AddBudgetDetails" Component={AddBudgetDetails} />
          <Route path="/editBudgetDetails/:id" Component={editBudgetDetails} />

          <Route path="/viewItems/:username" Component={ViewItems} />
          <Route path="/viewDetails/:id" Component={ViewDetails} />

          <Route path="/login" Component={LoginForm} />
          <Route path="/" Component={WelcomeScreen} />

          <Route path="/estStaff" Component={EstateStaff} />
          <Route path="/allTrees" Component={ViewAllTrees} />
          <Route path="/viewHvstSchedule/:id" Component={ViewHvstSchedule} />

          <Route path="/CustomerProfile/:id" Component={CustomerProfile} />
          <Route path="/OrderProfile/:id" Component={OrderProfile} />

          <Route path="/Profile/:username" Component={Profile} />
          <Route path="/spreadReport" Component={GenerateSpreadReport} />

          <Route path="/ViewTaskShedule" Component={ViewTaskShedule} />
          <Route path="/CtreateTaskShedule" Component={CreateShedule} />
          <Route path="/EditTaskShedule" Component={EditTaskShedule} />

          <Route path="/viewPestRecords" Component={ViewPestRecords} />
          <Route path="/createPestRecords" Component={CreatePestRecords} />
          <Route path="/pestReport" Component={GeneratePestReport} />


          <Route path="/productDash" Component={ProductDash}/>

          <Route path="/ReminderList" Component={ReminderList}/>

          <Route path="/salcal" Component={CalculatorEmp}/>


        </Routes>
      </div>
    </Router>
  );
}

export default App;
