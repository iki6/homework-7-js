import React, {Component} from 'react';
import ReactDom from 'react-dom';
import Header from './components/Header/Header.jsx';
import Main from './components/Main/Main.jsx';
import Footer from './components/Footer/Footer.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'
import './main_styles.css'

class App extends Component{

  constructor(props){
    super(props);

    this.state = {
      dbLink: 'http://localhost:3000'
    }
  }

  render(){
    return(
        <React.Fragment>
          <Header/>
          <Main dbLink={this.state.dbLink}/>
          <Footer/>
        </React.Fragment>
    )
  }
}

ReactDom.render(<App/>, document.getElementById('app'));
