import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="">

        <nav className="light-blue lighten-1" role="navigation">
            <div className="nav-wrapper container">
              <a id="logo-container" href="/" className="brand-logo"><i className="material-icons">ac_unit</i>FrozenGem</a>
              <ul className="right hide-on-med-and-down">
                <li><a href="/">-</a></li>
              </ul>
              <ul id="nav-mobile" className="sidenav">
                <li><a href="/">-</a></li>
              </ul>
              <a href="/" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            </div>
          </nav>

        <div className="section no-pad-bot" id="index-banner">
          <div className="container">
            <h1 className="header center orange-text">Frozen Gem</h1>
            <div className="row center">
              <h5 className="header col s12 light">Super simple system to add &amp; retreive your freezer content</h5>
            </div>
            <div className="row center">
              <a href="http://materializecss.com/getting-started.html" id="download-button" className="btn-large waves-effect waves-light orange">Get Started</a>
            </div>
          </div>
        </div>


        <div className="container">
          <div className="section">

            {/* <!--   Icon Section   --> */}
            <div className="row">
              <div className="col s12 l4">
                <div className="icon-block">
                  <h2 className="center light-blue-text"><i className="medium material-icons">ac_unit</i></h2>
                  <h5 className="center">Don't waste food</h5>
                  <p className="light">Always know what you have in your freezer. You just need to use our simple tag system. Reminders will then tell you what to get out before it stays for too long.</p>
                </div>
              </div>

              <div className="col s12 l4">
                <div className="icon-block">
                  <h2 className="center light-blue-text"><i className="medium material-icons">access_time</i></h2>
                  <h5 className="center">Don't waste time</h5>
                  <p className="light">Adding a produce will take you less than 30s. For the retreival, you've nothing to do! We'll be sending you reminders with proposals of what you should take.</p>
                </div>
              </div>

              <div className="col s12 l4">
                <div className="icon-block">
                  <h2 className="center light-blue-text"><i className="medium material-icons">note_add</i></h2>
                  <h5 className="center">Easy to work with</h5>
                  <p className="light">We have worked hard to create a super simple process. A combination of easy to use app / page &amp; regular sticky notes makes adding or retreiving food a trivial task.</p>
                </div>
              </div>
            </div>

          </div>
          <br /><br />
        </div>

        <footer className="page-footer orange">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Why?</h5>
                <p className="grey-text text-lighten-4">This project was started out of despair. Despair everytime we discard food because we don't remember what it is, when it was added. Despair every other night when we don't know what to cook... even though we know we have put so many good homemade leftovers in the freezer... but not / badly labelled!</p>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
            Made by <a className="orange-text text-lighten-3" href="https://food-maniac.com/about">Laurent Vetterhoeffer</a>
            </div>
          </div>
        </footer>

      </div>
    );
  }
}

export default App;
