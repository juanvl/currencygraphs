import React, { Component } from 'react';


class VariationBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let variation_day = this.props.variation_day
    if (variation_day) variation_day = variation_day.toFixed(2)
    let variation_week = this.props.variation_week
    if (variation_week) variation_week = variation_week.toFixed(2)
    let variation_month = this.props.variation_month
    if (variation_month) variation_month = variation_month.toFixed(2)

    return (
        <div className="col-md-12 col-sm-12 col-xs-12 panel panel-primary center-block" align="center" style={{width:'150px'}}>
          <h6> {this.props.title} Day Variation </h6>
          <h2> {variation_day}% </h2>
          <h6> {this.props.title} Week Variation</h6>
          <h2> {variation_week}% </h2>
          <h6> {this.props.title} Month Variation</h6>
          <h2> {variation_month}% </h2>
        </div>
    );
  }
}

export default VariationBox;
