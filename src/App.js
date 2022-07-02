import React, { Component } from 'react';
import Main from './components/MainComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { rootReducer } from './store/reducers/rootReducer'

const reduxStore = rootReducer()

class App extends Component {

  render() {
    return (
      <Provider store={reduxStore}>
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;