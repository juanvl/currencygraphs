import React, { Component } from 'react';
import { getCurrencyQuotations, getCurrencyVariations } from './models/CurrencyQuotationModel';
import MenuBar from './components/MenuBar'
import VariationBox from './components/VariationBox'
import { BarChart } from 'react-easy-chart';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bitcoin_data: [],
      dollar_data: [],
      euro_data: [],
      bitcoin_variation: {},
      dollar_variation: {},
      euro_variation: {},
      width: 0,
      height: 0
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

  }

  componentDidMount = () => {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    getCurrencyQuotations(12)
      .then(response => {
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

    getCurrencyVariations()
      .then(response => {
        this.setState({
          bitcoin_variation: response.data.bitcoin,
          dollar_variation: response.data.dollar,
          euro_variation: response.data.euro,
        })
      })
      .catch(() => {
      });
  };

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    return (
      <div>
        <MenuBar/>

        <div className="col-md-10 col-sm-12 col-xs-12" align="center">
          <h3>Bitcoin</h3>
          <BarChart
            grid
            colorBars
            height={this.state.height / 4.2}
            width={this.state.width / 2}
            axes={(this.state.width) > 600 ? true : false}
            data={this.state.bitcoin_data}
            yDomainRange={[0, 30000]}
          />
        </div>

        <VariationBox 
          title="Bitcoin" 
          variation_day={this.state.bitcoin_variation.day_variation}
          variation_week={this.state.bitcoin_variation.week_variation}
          variation_month={this.state.bitcoin_variation.month_variation}
        />

        <div className="col-md-10 col-sm-12 col-xs-12" align="center">
          <h3>Dollar</h3>
          <BarChart
            grid
            colorBars
            height={this.state.height / 4.2}
            width={this.state.width / 2}
            axes={(this.state.width) > 600 ? true : false}
            data={this.state.dollar_data}
            yDomainRange={[0, 10]}
          />
        </div>

        <VariationBox 
          title="Dollar" 
          variation_day={this.state.dollar_variation.day_variation}
          variation_week={this.state.dollar_variation.week_variation}
          variation_month={this.state.dollar_variation.month_variation}
        />

        <div className="col-md-10 col-sm-12 col-xs-12" align="center">
          <h3>Euro</h3>
          <BarChart
            grid
            colorBars
            height={this.state.height / 4.2}
            width={this.state.width / 2}
            axes={(this.state.width) > 600 ? true : false}
            data={this.state.euro_data}
            yDomainRange={[0, 10]}
          />
        </div>

        <VariationBox 
          title="Euro" 
          variation_day={this.state.euro_variation.day_variation}
          variation_week={this.state.euro_variation.week_variation}
          variation_month={this.state.euro_variation.month_variation}
        />

      </div>
    );
  }
}

export default App;
