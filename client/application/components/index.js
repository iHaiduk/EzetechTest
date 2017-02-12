/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import LineChart from './linechart';

@connect((store) => {
    return {
        data: store.data
    };
})
class Main extends Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired
    };

    constructor (props, context) {
        super(props, context);
        this.changeType = this.changeType.bind(this);
    }

    changeType () {
        this.props.dispatch({type: 'CHANGE_TYPE'});
    }

    render () {
        return (
            <div>
                <header id="header">
                    <div className="logo">
                        <a href="index.html" className="hidden-xs">
                            Ezetech Test
                            <small>Haiduk Ihor</small>
                        </a>
                    </div>
                </header>
                <section id="main">
                    <section id="content">
                        <button onClick={this.changeType}>Change Type</button>
                        <div className="card">
                            <div className="card__header">
                                <h2>Market Data
                                    <small>Autoupdate</small>
                                </h2>
                                <div className="actions">
                                    <a href><i className="zmdi zmdi-check-all"/></a>
                                    <a href><i className="zmdi zmdi-trending-up"/></a>
                                    <div className="dropdown">
                                        <a href data-toggle="dropdown" aria-expanded="false"><i
                                            className="zmdi zmdi-more-vert"/></a>
                                        <ul className="dropdown-menu pull-right">
                                            <li><a href>Change Date Range</a></li>
                                            <li><a href>Change Graph Type</a></li>
                                            <li><a href>Other Settings</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <LineChart />
                        </div>
                    </section>
                </section>
            </div>
        );
    }
}

export default Main;
