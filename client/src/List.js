import React from "react";

class List extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {
    this.load();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.point !== this.props.point) {
      this.load();
    }
  }

  load = () => {
    fetch("/api/getList?point=" + this.props.point)
      .then(data => data.json())
      .then(data => {
        this.setState({ data });
      });
  };

  render() {
    const { data } = this.state;

    let keys = [];

    if (data) {
      let firstRow = data[0];
      if (firstRow) {
        keys = Object.keys(firstRow);
      }
    }

    return (
      <table>
        <thead>
          <tr>
            {keys.map(key => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr>
              {keys.map(key => (
                <td>{row[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default List;
