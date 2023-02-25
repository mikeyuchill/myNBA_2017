import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Footer from './components/main/Footer';
import Nav from './components/main/Nav';
import HomeScreen from './Screens/HomeScreen';
import { PlayerScreen } from './Screens/PlayerScreen';
import { TeamScreen } from './Screens/TeamScreen';
import ScrollToTop from './components/ScollToTop';
import 'antd/dist/reset.css';

const App = () => {

  return (
    <Router>
      <ScrollToTop />
      <Nav />
      <Switch>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/player" exact component={PlayerScreen} />
        <Route path="/team" exact component={TeamScreen} />
      </Switch>
      <Footer />
    </Router>
  )
};
export default App;
