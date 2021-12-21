import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  pageSize = 5;
  apikey = process.env.REACT_APP_NEWS_API;
  // state for setProgress
  state = {
    progress: 0
  }

  // reaact top loading bar ke liye ek method banayenge 
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }


  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            // progress={progress}
            height={3}
            progress={this.state.progress}
          // onLoaderFinished={() => setProgress(0)}
          />
          {/* <News pageSize={5} country="in" category="science" /> */}
          <Routes>
            {/* <Route exact path="/" ><News keys="general" pageSize={5} country="in" category="general" /></Route>
            <Route exact path="/business" ><News keys="business" pageSize={5} country="in" category="business" /></Route>
            <Route exact path="/entertainment" ><News keys="entertainment" pageSize={5} country="in" category="entertainment" /></Route>
            <Route exact path="/general" ><News keys="general" pageSize={5} country="in" category="general" /> </Route>
            <Route exact path="/health" ><News keys="health" pageSize={5} country="in" category="health" /> </Route>
            <Route exact path="/science" ><News keys="science" pageSize={5} country="in" category="science" /> </Route>
            <Route exact path="/sports" ><News keys="sports" pageSize={5} country="in" category="sports" /> </Route>
            <Route exact path="/technology" ><News keys="technology" pageSize={5} country="in" category="technology" /> </Route> 
            i was getting problem with this then i turn it into element then i got my result */}
            <Route exact path="/" element={<News setProgress={this.setProgress} apikey={this.apikey} key="general" pageSize={this.pageSize} country="in" category="general" />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apikey={this.apikey} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} apikey={this.apikey} key="business" pageSize={this.pageSize} country="in" category="business" />} />
            <Route exact path="/general" element={<News setProgress={this.setProgress} apikey={this.apikey} key="general" pageSize={this.pageSize} country="in" category="general" />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} apikey={this.apikey} key="health" pageSize={this.pageSize} country="in" category="health" />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} apikey={this.apikey} key="science" pageSize={this.pageSize} country="in" category="science" />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} apikey={this.apikey} key="sports" pageSize={this.pageSize} country="in" category="sports" />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apikey={this.apikey} key="technology" pageSize={this.pageSize} country="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}

// render() ek lifecycle method hai jsx ko html me compile karna then screen par html render karna 
// prop type me class base component daal sakta hu -> yes but how can i put search on google react proptypes class based
// will add => import propTypes from 'prop-types' ab ek static var. bna lunga class ke andar

// app.js me hamne react top loading bar npm package ka code likha hai

// koi bhi env variable jo ki aap start karte ho REACT_APP se to hame uska access mil jata hai apne react application me
// google me ham search karenge environment variable create react app
// apikey = Process.env.REACT_APP_NEWS_API ye karne ke baad hame apne development server ko restart karna padega then it wil work