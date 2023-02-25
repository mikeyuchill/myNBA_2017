import React from 'react';
import { Slider, InputNumber, Row, Col, Switch } from 'antd';

export class CountSlider extends React.Component {
  state = {
    inputValue: 2,
    displayToolTips: true,
  }

  onTooltipChange = (displayToolTip) => {
    this.setState({ displayToolTips: displayToolTip });
    this.props.onTooltipChange(displayToolTip);
  }

  onChange = (value) => {
    const cleanValue = Number(value) ? value : this.state.inputValue;
    this.setState({
      inputValue: cleanValue,
    });
    this.props.onCountSliderChange(cleanValue);
  }

  render() {
    return (
      <>
        <div className="overflow-x-scroll bg-gray-800">
          <text className="ml-8 text-white lg-text">Minimum Number of Shots </text>
          <Row>
            <Col span={12} >
              <Slider min={1}
                max={20}
                onChange={this.onChange}
                value={this.state.inputValue} />
            </Col>
            <Col span={8}>
              <InputNumber
                min={1}
                max={20}
                style={{ marginLeft: 16 }}
                value={this.state.inputValue}
                onChange={this.onChange}
              />
            </Col>
            <Col span={4}>
              <text className="text-white" >Tooltip:</text>
              <Switch
                checkedChildren="On"
                unCheckedChildren="Off"
                defaultChecked
                onChange={this.onTooltipChange}
              />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
