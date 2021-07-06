import './App.css';
import Login from './components/Login';
import Chatroom from './components/ChatRoom'
import { Route, BrowserRouter, Switch } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/' component={Chatroom} />
      </Switch>
    </BrowserRouter>
    // <div className="App">
    //   <Login></Login>
    // </div>
  );
}

export default App;
