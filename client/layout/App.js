import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';

class App extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <BrowserRouter>
                <Route path="/" exact component={Home} />
                <Route path="/about"  component={About} />
            </BrowserRouter>
        );
    }
}

export default App;