import React, { Component } from 'react'
import { Card, Button, Table, Tag, Tooltip } from 'antd'
import moment from 'moment'
import XLSX from 'xlsx'
import { withRouter } from 'react-router-dom';
import { getArticles } from '../../requests'
import { DeleteModal } from '../../components'

const ButtonGroup = Button.Group

const titleDisplayMap = {
    id: 'ID',
    title: 'Title',
    author: 'Author',
    createAt: 'Create',
    amount: 'Amount'
}

class ArticleList extends Component {
    constructor() {
        super()
        this.state = {
            dataSource: [],
            columns: [],
            total: 0,
            isLoading: false,
            offset: 0,
            limited: 10,
            deleteModalRecord: []
        }
    }

    createColumns = (columnKeys) => {
        const columns = columnKeys.map(item => {
            if(item === 'amount') {
                /* render element color by amount */
                return {
                    title: titleDisplayMap[item],
                    key: item,
                    render: (text, record) => {
                        const { amount } = record
                        return (
                            <Tooltip title={amount > 200 ? "greater than 200" : "less than or equal to 200"}>
                                <Tag color={amount > 200 ? "red" : "green"}>{record.amount}</Tag>
                            </Tooltip>
                        )
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
        columns.push({
            title: 'Actions',
            key: 'actions',
            render: (text, record) => {
                return (
                    <ButtonGroup>
                        <Button size="small" type="primary" onClick={this.toEdit.bind(this, record)}>Edit</Button>
                        <Button size="small" type="danger" onClick={this.setDeleteModalRecord.bind(this, record)}>Delete</Button>
                    </ButtonGroup>
                )
            }
        })
        return columns
    }

    toEdit = (record) => {
        this.props.history.push({
            pathname: `/admin/article/edit/${record.id}`,
            state: {
                record
            }
        })
    }

    reload = () => {
        this.setState({
            offset: 0
        }, () => {
            this.getData()
        })
    }

    setDeleteModalRecord = (record) => {
        this.setState({
            deleteModalRecord: record
        })
    }

    setData = (state) => {
        if(this.updater.isMounted(this)) {
            this.setState({
                ...state
            })
        }
    }

    getData = () => {
        this.setState({
            isLoading: true
        })
        getArticles(this.state.offset, this.state.limited)
            .then(resp => {
                const columnKeys = Object.keys(resp.list[0])
                const columns = this.createColumns(columnKeys)
                this.setData({
                    total: resp.total,
                    dataSource: resp.list,
                    columns
                })
            })
            .catch(err => {
                // error handling
            })
            .finally(() => {
                this.setData({
                    isLoading: false
                })
            })
    }

    onPageChange = (page, pageSize) => {
        this.setState({
            offset: pageSize * (page - 1),
            limited: pageSize
        }, () => {
            this.getData()
        })
    }

    onShowSizeChange = (current, size) => {
        this.setState({
            offset: 0,
            limited: size
        }, () => {
            this.getData()
        })
    }

    toExcel = () => {
        const data = []
        data.push([
            titleDisplayMap.id,
            titleDisplayMap.title,
            titleDisplayMap.author,
            titleDisplayMap.amount,
            titleDisplayMap.createAt
        ])
        for(let i = 0; i < this.state.dataSource.length; i++) {
            data.push([
                this.state.dataSource[i].id,
                this.state.dataSource[i].title,
                this.state.dataSource[i].author,
                this.state.dataSource[i].amount,
                moment(this.state.dataSource[i].createAt).format('MM/DD/YYYY HH:mm:ss')
            ])
        }
		/* convert state to workbook */
		const ws = XLSX.utils.aoa_to_sheet(data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
		/* generate XLSX file and send to client */
		XLSX.writeFile(wb, `sheetjs-${moment().format('YYYYMMDDHHmmss')}.xlsx`)
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        return (
            <Card 
                title="Article List" 
                bordered={false} 
                extra={<Button onClick={this.toExcel} disabled={this.state.isLoading}>Export EXCEL</Button>}
            >
                <Table 
                    rowKey={record => record.id}
                    dataSource={this.state.dataSource} 
                    columns={this.state.columns}
                    loading={this.state.isLoading}
                    pagination={{
                        current: (this.state.offset / this.state.limited) + 1,
                        total: this.state.total,
                        hideOnSinglePage: true,
                        showQuickJumper: true,
                        showSizeChanger: true,
                        onChange: this.onPageChange,
                        onShowSizeChange: this.onShowSizeChange
                    }}
                />
                <DeleteModal
                    reload={this.reload.bind(this)}
                    deleteModalRecord={this.state.deleteModalRecord}
                />
            </Card>
        )
    }
}

export default withRouter(ArticleList);