import './App.css';
import "./components/Header";
import Admin from "./pages/admin";
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <Admin/>      
    </div>
  );
}

export default App;
