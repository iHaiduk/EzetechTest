/**
 * Created by igor on 12.02.17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {LineChart as Chart} from 'react-d3-components';

@connect((store) => {
    return {
        market: store.market
    };
},
    dispatch => ({
        setData: (data) => {
            dispatch({type: 'SET_DATA', data});
        },
        updateData: (data) => {
            dispatch({type: 'UPDATE_DATA', data});
        }
    })
)
export default class LineChart extends Component {

    constructor (props, context) {
        super(props, context);
    }

    async componentDidMount () {
        const self = this;
        try {
            const {data} = await axios.get('http://localhost:3000/market-history');
            self.props.setData(data);

            const socket = io('http://localhost:3000');
            socket.on('market events', data => {
                self.props.updateData(data.changes);
            });
        } catch (error) {
            console.error(error);
        }
    }

    render () {
        const tooltipLine = (label, data) => label + " value: " + data.y.toFixed(2) + (this.props.market.persentType ? `(${data.percent.toFixed(2)}%)` : '');
        const labelAccessor = v => v.labels;
        const y = (d) => d[this.props.market.persentType ? 'percent' : 'y'];

        return (
            <div className="flot-chart-edge">
                <div id="chart-curved-line" className="flot-chart" style={{padding: 0}}>
                    {Object.keys(this.props.market.data).map((key, k) => (
                        this.props.market.data[key].values.length &&
                            <div>
                                <span className="chart_title">Chart of {key}</span>
                                <Chart
                                    key={k}
                                    data={this.props.market.data[key]}
                                    width={600}
                                    height={300}
                                    label={labelAccessor}
                                    interpolate="basis"
                                    margin={{top: 10, bottom: 50, left: 50, right: 20}}
                                    yScale={this.props.market.yScale[key]}
                                    tooltipHtml={tooltipLine}
                                    y={y}
                                />
                            </div>
                    ))
                    }
                </div>
            </div>
        );
    }

}
