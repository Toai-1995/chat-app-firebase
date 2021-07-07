import './App.css';
import Login from './components/Login';
import Chatroom from './components/ChatRoom'
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/' component={Chatroom} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
    // <div className="App">
    //   <Login></Login>
    // </div>
  );
}

export default App;
