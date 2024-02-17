import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import ChatApp from './components/chatApp/ChatApp'
import Register from './components/registerForm/Register'
import LoginForm from './components/LoginForm/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/notFound/NotFound'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/register" component={Register} />
      <ProtectedRoute exact path="/" component={ChatApp} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
