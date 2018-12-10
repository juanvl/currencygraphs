import React, { Component } from 'react';
import { getCurrencyQuotations } from './models/CurrencyQuotationModel';
import MenuBar from './components/MenuBar'
import { BarChart } from 'react-easy-chart';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bitcoin_data: [],
      dollar_data: [],
      euro_data: [],
    };

  }

  componentDidMount = () => {
    getCurrencyQuotations(7)
      .then(response => {
        console.log(response);
        let bitcoin_data = []
        let dollar_data = []
        let euro_data = []
        
        response.data.reverse().forEach(element => {
          bitcoin_data.push({x: element.collected_at, y: element.api_data.quotation_real.bitcoin.buy})
          dollar_data.push({x: element.collected_at, y: element.api_data.quotation_real.dollar.buy})
          euro_data.push({x: element.collected_at, y: element.api_data.quotation_real.euro.buy})
        });

        this.setState({
          bitcoin_data: bitcoin_data,
          dollar_data: dollar_data,
          euro_data: euro_data
        });
      })
      .catch(() => {
      });
  };

  render() {
    return (
      <div>
        <MenuBar/>
        <BarChart
          axes 
          data={this.state.bitcoin_data}
        />
        <BarChart
          axes 
          data={this.state.dollar_data}
        />
        <BarChart
          axes 
          data={this.state.euro_data}
        />
      </div>
    );
  }
}

export default App;
