var React = require('react');
var ReactDom = require('react-dom');



var App = React.createClass({
    render:function () {
        return(
            <div className="catch-of-the-day">
                <p>ksdjfl</p>
            </div>
        )
    }
});



ReactDom.render(<App/>, document.querySelector("#main"));