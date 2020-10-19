import React, { Component, createRef } from 'react'
import {
    Card,
    Row,
    Col
} from 'antd'
import './dashboard.less'
import echarts from 'echarts'
import { getArticleCount } from '../../requests'

export default class Dashboard extends Component {
    constructor() {
        super()
        this.articleAmount = createRef()
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    initialArticleChart = () => {
        getArticleCount()
            .then(resp => {
                const option = {
                    title: {
                        text: "Total View Count"
                    },
                    xAxis: {
                        data: resp.amount.map(item => item.month)
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: resp.amount.map(item => item.value),
                        type: 'line',
                        areaStyle: {}
                    }]
                };
                this.articleChart.setOption(option)
            })
    }

    componentDidMount() {
        this.articleChart = echarts.init(this.articleAmount.current)
        this.initialArticleChart()
    }

    render() {
        return (
            <>
                <Card 
                    title="Dashboard" 
                    bordered={false} 
                >
                    <Row gutter={16}>
                        <Col xs={2} sm={4} md={6} lg={6} xl={6} span={6}>
                            <div className="sans-gutter-box" style={{backgroundColor: this.getRandomColor()}}>col-6</div>
                        </Col>
                        <Col xs={2} sm={4} md={6} lg={6} xl={6} span={6}>
                            <div className="sans-gutter-box" style={{backgroundColor: this.getRandomColor()}}>col-6</div>
                        </Col>
                        <Col xs={2} sm={4} md={6} lg={6} xl={6} span={6}>
                            <div className="sans-gutter-box" style={{backgroundColor: this.getRandomColor()}}>col-6</div>
                        </Col>
                        <Col xs={2} sm={4} md={6} lg={6} xl={6} span={6}>
                            <div className="sans-gutter-box" style={{backgroundColor: this.getRandomColor()}}>col-6</div>
                        </Col>
                    </Row>
                </Card>
                <Card 
                    title="Article View Count" 
                    bordered={false} 
                >
                    <div ref={this.articleAmount} style={{height: '500px'}} />
                </Card>
            </>
        )
    }
}
