import React from 'react';
import Home from './pages/Home/index';
import Article from './pages/Article/index'; 
import AboutMe from './pages/AboutMe/index'; 
import Life from './pages/Life/index'; 
import Detail from './pages/Detail/index';
import Editor from './pages/Editor/index';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Link
} from 'react-router-dom' 
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

function App() {
  return (
    <div className="container">
      <div className="mid-content">
        <Router history={history}>
          <div>
            <Header />
          </div>
          <div>
            <Route exact path="/" component={Home}/>
            <Route path="/AboutMe" component={AboutMe}/>
            <Route path="/Article" component={Article}/>
            <Route path="/Detail/:id" component={Detail}/>
            <Route path="/Life" component={Life}/>
            <Route path="/Editor" component={Editor}/>
          </div>
          <Footer/>
        </Router>
      </div>
    </div>
  );
}

export default App;
