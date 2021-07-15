import './App.css';
import Login from './components/Login';
import Chatroom from './components/ChatRoom'
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import AppProvider from './context/AppProvider';
import AddRoomModal from './components/Modal/AddRoomModal';
import InviteMemberModal from './components/Modal/InviteMemberModal';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/' component={Chatroom} />
          </Switch>
          <AddRoomModal />
          <InviteMemberModal />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
    // <div className="App">
    //   <Login></Login>
    // </div>
  );
}

export default App;
