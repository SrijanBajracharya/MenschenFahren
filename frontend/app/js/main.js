var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var BrowserHistory = ReactRouter.browserHistory;
var History = ReactRouter.hashHistory;

require("../css/signup.css");
require("../sass/files.sass");

var App = React.createClass({
    render:function () {
        return(
            <div>
               <Header/>
            </div>
        )
    }
});

var NavigationBar = React.createClass({
   render :function () {
       return(
       <div className="added-div">
            <ul className="nav navbar-nav menu-left">
                <li className="menu-mobile"><a href="#">Home</a></li>
               <li className="menu-desktop">Marketplace</li>
               <li className="menu-desktop"><a href="#">Boston</a></li>
               <li className="menu-desktop"><a href="#">Portland</a></li>
               <li className="menu-desktop"><a href="#">Providence</a></li>
               <li className="menu-desktop"><a href="#">New York</a></li>
               <li className="dropdown">
                   <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Marketplace</a>
                   <ul className="dropdown-menu" role="menu">
                       <li><a href="#">Boston</a></li>
                       <li><a href="#">Portland</a></li>
                       <li><a href="#">Providence</a></li>
                       <li><a href="#">New York</a></li>
                    </ul>
                </li>
            </ul>
            <ul className="nav navbar-nav menu-right">
                <li className="menu-desktop">The Comapnay</li>
                <li className="menu-desktop"><a href="#">Our Story</a></li>
                <li className="menu-desktop"><a href="#">Features</a></li>
                <li className="menu-desktop"><a href="#">FAQs</a></li>
                <li className="menu-desktop"><a href="#">Careers</a></li>
                <li className="menu-desktop"><a href="#">Contact Us</a></li>
                <li className="dropdown company">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">The Company</a>
                    <ul className="dropdown-menu" role="menu">
                        <li><a href="#">Our Story</a></li>
                        <li><a href="#">Features</a></li>
                        <li><a href="#">FAQs</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                </li>
                <li className="menu-mobile"><a href="#">Logout</a></li>
            </ul>
       </div>
       )
   }
});

var SecondaryMenu = React.createClass({
   render : function(){
       return(
           <ul>
                <li className="garage"><a href="#">My Garage</a></li>
                <li className="dropdown profile">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">John M.<span className="caret"></span></a>
                    <ul className="dropdown-menu" role="menu">
                        <li><a href="#">Profile</a></li>
                        <li><a href="#">Logout</a></li>
                    </ul>
                </li>
                <li className="dropdown lang">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Language</a>
                    <ul className="dropdown-menu" role="menu">
                        <li><a href="#">English</a></li>
                        <li><a href="#">Espanol</a></li>
                        <li><a href="#">Portuguese</a></li>
                    </ul>
                </li>
           </ul>
       )
   }
});


var SearchMenu = React.createClass({
   render : function () {
       return(
           <div className="column">
                <div id="sb-search" className="sb-search">
                    <form>
                       <input className="sb-search-input" placeholder="Enter your search term..." type="text" value="" name="search" id="search"/>
                       <input className="sb-search-submit" type="submit" value=""/>
                       <span className="sb-icon-search"></span>
                    </form>
                </div>
           </div>
       )
   }
});

var HeaderButtons = React.createClass ({
    render :function(){
        return(
            <button type="button" className="navbar-toggle visible-xs" data-toggle="push" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
        )
    }
});

var NavBarToggle = React.createClass({
    render : function () {
        return(
            <div id="show" className="navbar-toggle"><span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </div>

        )
    }
});

var Header = React.createClass({
   render:function () {
       return(
       <header>
            <div className="main-menu">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="header-content">
                            <div className="navbar-header">
                                <HeaderButtons/>
                                <NavBarToggle/>
                                <div id="navbar" className="hideme menu">
                                    <navigationBar/>
                                    <a className="navbar-brand" href="#">
                                        <img src={require('../images/logo.jpg')} alt="perpetulist" title="perpetulist"/>
                                    </a>
                                </div>
                            </div>
                            <div className="secondary-menu">
                                <SecondaryMenu/>
                                <SearchMenu/>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
       )
   }

});



ReactDom.render(<App/>, document.querySelector("#main"));
