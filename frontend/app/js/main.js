var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var BrowserHistory = ReactRouter.browserHistory;
var History = ReactRouter.hashHistory;

require("../css/signup.css");
require("../sass/style.sass");

var App = React.createClass({
    render: function () {
        return(
            <Listing/>
        )
    }
});

var ListingHeader = React.createClass({
    render: function(){
        return(
            <div className="container">
                <h2>Our Blog</h2>
                <span>Get more information about the awesome cars</span>
            </div>
        )
    }
});

var ListingSection = React.createClass({
    render: function(){
        return(
            <ul className="grid swipe-right" id="grid">
                <li><a href="#"><img src={require('../images/logo.jpg')} alt="dummy"/><h3>A fantastic title</h3></a></li>
            </ul>
        )
    }
});

var Listing = React.createClass({
   render: function(){
       return(
            <main className="no-padding">
               <div className="blog-header">
                   <ListingHeader/>
               </div>
               <div className="main-container">
                   <div className="container-fluid">
                       <div className="blog-holder">
                           <div className="blog-container">
                               <section className="grid-wrap">
                                   <ListingSection/>
                               </section>
                           </div>
                       </div>
                   </div>
               </div>
            </main>
       )
   }
});

ReactDom.render(<App/>, document.querySelector("#main"));
