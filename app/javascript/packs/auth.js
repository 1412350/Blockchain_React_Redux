import SignIn from '../components/signin';
import SignUp from '../components/signup';
import SignOut from '../components/signout';
import DashboardContainer from '../containers/DashboardContainer';
const auth_token = window.localStorage.getItem('auth_token');

export const SignInComponent = () => {
  if (auth_token != "" && auth_token != null) {
    window.location.hash = '/';
    return null;
  }
  else {
    return (
      <SignIn/>
    );
  }
}

export const SignUpComponent = () => {
  if (auth_token != "" && auth_token != null) {
    window.location.hash = '/';
    return null;
  }
  else {
    window.location.hash = '/users/sign_up';    
    return (
      <SignUp/>
    );
  }
}
export const HomeComponent = () => {
  if (auth_token != "" && auth_token != null) {
    window.location.hash = '/';
    return (
      <DashboardContainer/>
    );
  }
  else {
    window.location.hash = '/users/sign_in';
    return (
      <SignIn/>          
    );
  }
}