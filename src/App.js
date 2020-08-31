import React from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import BusinessList from "./components/BusinessList/BusinessList";
import Yelp from "./util/Yelp";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: []
    }

    this.searchYelp = this.searchYelp.bind(this);
  }

  searchYelp(term, location, sortBy) {
    Yelp.searchYelp(term, location, sortBy).then(businesses => {
      this.setState({
        businesses: businesses  // this value 'businesses' is the returned array of businesses (from Yelp.js)
      });
    });
  }

  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar searchBar={this.searchYelp}/>
        <BusinessList businesses={this.state.businesses}/>
      </div>
    );
  }
}


export default App;
