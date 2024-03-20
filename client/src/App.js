import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import dashboard from './components/dashboard'
import viewSpread from './components/viewSpread';
import createSpread from './components/createSpread';
import editSpread from './components/editSpread'
import spreadDetails from './components/spreadDetails'

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

          

        </Routes>
      </div>
    </Router>
  );
}

export default App;