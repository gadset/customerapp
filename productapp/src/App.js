import logo from './logo.svg';
import './App.css';
import { PostAdd } from '@mui/icons-material';
import Postbid from './components/postbidding';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LoginForm from './components/signinpage';

function App() {
  return (
    <Router>
    <div className="App">
    <Route path='/addbid'>
<Postbid/>
    </Route>
    <Route path='/home'>
      <LoginForm/>
    </Route>
    </div>
    </Router>
  );
}

export default App;
