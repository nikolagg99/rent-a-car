import { Switch } from 'react-router';
import './App.css';
import { AddVehicle } from './components/AddVehicle';
import { CreateAdmin } from './components/CreateAdmin';
import { EditAccount } from './components/EditAccount';
import { EditVehicle } from './components/EditVehicle';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { UsersList } from './components/UsersList';
import { VehiclesList } from './components/VehiclesList';
import { MyRents } from './components/MyRents';
import RentPage from './containers/RentPage';
import { AuthenticatedRoute } from './core/guards/AuthenticatedRoute';
import { NonAuthenticatedRoute } from './core/guards/NonAuthenticatedRoute';

function App() {
  return (
    <div className="App">
      <Switch>
        <NonAuthenticatedRoute exact path="/login" component={Login}/>
        <NonAuthenticatedRoute exact path="/register" component={Register}/>
        <AuthenticatedRoute exact path="/rent-page" component={RentPage}/>
        <AuthenticatedRoute exact path="/edit-account" component={EditAccount}/>
        <AuthenticatedRoute exact path="/users-list" component={UsersList}/>
        <AuthenticatedRoute exact path="/vehicles-list" component={VehiclesList}/>
        <AuthenticatedRoute exact path="/add-vehicle" component={AddVehicle}/>
        <AuthenticatedRoute exact path="/create-new-admin" component={CreateAdmin}/>
        <AuthenticatedRoute exact path="/edit-vehicle" component={EditVehicle}/>
        <AuthenticatedRoute exact path="/my-rents" component={MyRents}/>
      </Switch>
    </div>
  );
}

export default App;
