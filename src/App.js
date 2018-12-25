import React, { Component } from "react";
import "./App.css";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { getStockQuote } from "./QuoteService";

class App extends Component {
  state = {
    stockData: []
  };

  columns = [
    {
      Header: "Stock",
      columns: [
        {
          Header: "Ticker",
          accessor: "symbol",
          Cell: row =>
            row.value === "SPY" ? (
              <div
                style={{
                  backgroundColor: "#FFFACD"
                }}
              >
                {row.value}
              </div>
            ) : (
              row.value
            )
        },
        {
          Header: "Company",
          accessor: "companyName"
        },
        {
          Header: "Exchange",
          accessor: "primaryExchange"
        }
      ]
    },
    {
      Header: "Today",
      columns: [
        {
          Header: "Open",
          accessor: "open"
        },
        {
          Header: "Price",
          accessor: "latestPrice"
        },
        {
          Header: "Close",
          accessor: "close"
        }
      ]
    },
    {
      Header: "52-Week",
      columns: [
        {
          Header: "High",
          accessor: "week52High"
        },
        {
          Header: "Low",
          accessor: "week52Low"
        },
        {
          Header: "Change",
          accessor: "ytdChange",
          Cell: row => (
            <div
              style={{
                backgroundColor: row.value < 0 ? "#F08080" : "#98FB98"
              }}
            >
              {`${(row.value * 100).toFixed(2)}%`}
            </div>
          )
        }
      ]
    }
  ];

  componentDidMount() {
    this.getStockData();
  }

  getStockData() {
    getStockQuote().then(response => {
      let stockData = [];
      Object.keys(response).forEach(key => {
        stockData.push(response[key]["quote"]);
      });
      this.setState({ stockData });
    });
  }

  render() {
    return (
      <div className="App">
        <ReactTable
          className="-striped -highlight"
          data={this.state.stockData}
          columns={this.columns}
        />
      </div>
    );
  }
}

export default App;
