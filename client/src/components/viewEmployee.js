import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import viewEmployee from './components/viewEmployee'
import createEmployee from './components/createEmployee'
import editEmployee from './components/editEmployee'
import employeeDetails from './components/employeeDetails'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          
          <Route path="/" Component={viewEmployee}/>
          <Route path="/createEmployee" Component={createEmployee}/>
          <Route path="/editEmployee/:id" Component={editEmployee}/>
          <Route path="/employeerecord/:id" Component={employeeDetails}/>
          <Route path="/employeeDetails/:id" Component={employeeDetails}/>

          

        </Routes>
      </div>
    </Router>
  );
}

export default App;