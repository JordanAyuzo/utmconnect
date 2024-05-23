
import RoutesComponent from "./RoutesComponent.jsx";
import {BrowserRouter} from "react-router-dom";
import './App.css'
function App() {

  return (
    <div>
      <BrowserRouter>
        <RoutesComponent/>
      </BrowserRouter>
    </div>
  )
}

export default App
