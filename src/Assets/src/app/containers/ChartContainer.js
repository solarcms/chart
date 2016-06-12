import React, { Component, PropTypes } from 'react'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import * as DataActions from '../actions/'
// import Header from '../components/template/Header'
import { Button } from 'react-bootstrap';
import {deleteMenu} from '../api/'

class ChartContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }


 
    componentWillMount() {

    }

    componentWillUnmount() {

    }

    componentDidMount(){

        const {
            setup,
            chartData,
            graphs,
        } = this.props;

        let data = chartData.data;
        let categoryField = chartData.categoryField;
        let title = chartData.title;
        let graphs_data = graphs;





        let chart = AmCharts.makeChart( "solar-chart", {
           "type": "serial",
           "theme": "light",
           "marginRight": 40,
           "marginLeft": 40,
           "autoMarginOffset": 20,
           "mouseWheelZoomEnabled":true,
            "legend": {
                "equalWidths": false,
                "periodValueText": "",
                "position": "top",
                "valueAlign": "left",
                "valueWidth": 100
            },
           language:'mn',
           "dataDateFormat": "YYYY-MM-DD",
           "valueAxes": [{
               "position": "left",
               "title": title
           }
           ],
           "graphs": graphs_data,
           "chartScrollbar": {
               "graph": "g1",
               "oppositeAxis":false,
               "offset":30,
               "scrollbarHeight": 80,
               "backgroundAlpha": 0,
               "selectedBackgroundAlpha": 0.1,
               "selectedBackgroundColor": "#888888",
               "graphFillAlpha": 0,
               "graphLineAlpha": 0.5,
               "selectedGraphFillAlpha": 0,
               "selectedGraphLineAlpha": 1,
               "autoGridCount":true,
               "color":"#AAAAAA"
           },
           "chartCursor": {
               "pan": true,
               "valueLineEnabled": true,
               "valueLineBalloonEnabled": true,
               "cursorAlpha":1,
               "cursorColor":"#258cbb",
               "limitToGraph":"g1",
               "valueLineAlpha":0.2
           },
           "categoryField": categoryField,
           "categoryAxis": {
               "parseDates": true,
               "dashLength": 1,
               "minorGridEnabled": true
           },
           "export": {
               "enabled": true
           },
           dataProvider:data
       } );

       chart.addListener("rendered", zoomChart);

       zoomChart();

       function zoomChart() {
           chart.zoomToIndexes(chart.dataProvider.length - 40, chart.dataProvider.length - 1);
       }

    }

    render() {

        const {
            setup,
            chartData,
            graphs,
            } = this.props;




        return (
            <div className="">
                <div id="solar-chart">

                </div>

            </div>

        )
    }
}

function mapStateToProps(state) {
    const main = state.main;

    return {
        setup: main.get('setup'),
        graphs: main.get('graphs').toJS(),
        chartData: main.get('chartData').toJS(),
    }
}
// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {

    return {
        actions: bindActionCreators(DataActions, dispatch)
    };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChartContainer)
