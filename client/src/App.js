import React from "react";
import List from "./List";

class App extends React.Component {
  state = {
    point: "Open"
  };

  render() {
    return (
      <div>
        <List point={this.state.point} />
        <select
          value={this.state.point}
          onChange={e => this.setState({ point: e.target.value })}
        >
          <option value="Open">Open</option>
          <option value="High">High</option>
        </select>
      </div>
    );
  }
}

export default App;
