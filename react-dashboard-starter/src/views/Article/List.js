import React, { Component } from 'react'
import { Card, Button, Table, Tag } from 'antd'
import moment from 'moment'
import { getArticles } from '../../requests'

window.moment = moment

const titleDisplayMap = {
    id: 'ID',
    title: 'Title',
    author: 'Author',
    createAt: 'Create',
    amount: 'Amount'
}

export default class ArticleList extends Component {
    constructor() {
        super()
        this.state = {
            dataSource: [],
            columns: [],
            total: 0
        }
    }

    createColumns = (columnKeys) => {
        return columnKeys.map(item => {
            if(item === 'amount') {
                /* render element color by amount */
                return {
                    title: titleDisplayMap[item],
                    key: item,
                    render: (text, record) => {
                        const { amount } = record
                        return <Tag color={amount > 200 ? "red" : "green"}>{record.amount}</Tag>
                    }
                }
                /* render element color by role */
                // const titleMap = {
                //     '001': 'red',
                //     '002': '#09f',
                //     '003': 'green'
                // }
                // return <Tag color={titleMap[titleKey]}>{record.title}</Tag>
                // ...
            }
            if(item === 'createAt') {
                return {
                    title: titleDisplayMap[item],
                    key: item,
                    render: (text, record) => {
                        const { createAt } = record
                        return moment(parseInt(createAt)).format('MM/DD/YYYY HH:mm:ss')
                    }
                }
            }
            return {
                title: titleDisplayMap[item],
                dataIndex: item,
                key: item,
            }
        })
    }

    getData = () => {
        getArticles()
            .then(resp => {
                const columnKeys = Object.keys(resp.list[0])
                const columns = this.createColumns(columnKeys)
                this.setState({
                    total: resp.total,
                    dataSource: resp.list,
                    columns
                })
            })
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        return (
            <div>
                <Card 
                    title="Article List" 
                    bordered={false} 
                    extra={<Button>Export EXCEL</Button>}
                >
                    <Table 
                        rowKey={record => record.id}
                        dataSource={this.state.dataSource} 
                        columns={this.state.columns}
                        pagination={{
                            total: this.state.total,
                            hideOnSinglePage: true
                        }}
                    />;
                </Card>
            </div>
        )
    }
}