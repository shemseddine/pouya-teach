import React from "react";
import moment from "moment";

class List extends React.Component {
  state = {
    data: [],
    perPage: 10,
    totalCount: 0,
    currentPage: 1
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
    let { perPage, currentPage } = this.state;

    fetch(
      `/api/getList?point=${
        this.props.point
      }&currentPage=${currentPage}&perPage=${perPage}`
    )
      .then(data => data.json())
      .then(data => {
        this.setState({
          data: data.data,
          totalCount: data.totalCount
        });
      });
  };

  setPage = page => e => {
    this.setState({ currentPage: page }, this.load);
  };

  render() {
    const { data, perPage, currentPage, totalCount } = this.state;
    let numberOfPages = Math.ceil(totalCount / perPage);

    let keys = [];

    let pages = [];

    for (var page = 1; page <= numberOfPages; page++) {
      pages.push(
        <button disabled={page === currentPage} onClick={this.setPage(page)}>
          {page}
        </button>
      );
    }

    if (data) {
      let firstRow = data[0];
      if (firstRow) {
        keys = Object.keys(firstRow);
      }
    }

    return (
      <div>
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
                {keys.map(key => {
                  if (key === "Date") {
                    return <td>{moment(row[key]).format("DD-MMM-YYYY")}</td>;
                  } else {
                    return <td>{row[key]}</td>;
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
        {pages}
      </div>
    );
  }
}

export default List;
