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
      accessor: "symbol"
    },
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
    },
    {
      Header: "High",
      accessor: "high"
    },
    {
      Header: "Low",
      accessor: "low"
    }
  ];

  componentDidMount() {
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
        <ReactTable data={this.state.stockData} columns={this.columns} />
      </div>
    );
  }
}

export default App;
