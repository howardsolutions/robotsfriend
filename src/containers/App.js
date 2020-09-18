import React from "react";
import { robots } from '../robots';
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary'
import '../containers/App.css'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: ''
    }
  } 

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => this.setState({robots: users}) ); 
  }

  onSearchChange = (event) =>  {
    this.setState({searchfield: event.target.value});
  }

  render() {
    const {robots, searchfield} = this.state;
    const filterRobots =robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });

    // make condition to render robot
    if(!robots.length) {
      return <h1> Loading </h1>
    } else { 
        return (
          <div className = "tc">
            <h1 className = "f1"> RoboFriends </h1>
              <SearchBox searchChange = {this.onSearchChange} />
            <Scroll> 
              <ErrorBoundary> 
                <CardList robots = {filterRobots} />
              </ErrorBoundary>
            </Scroll>
          </div>
        )
    }
  }
};

export default App;
