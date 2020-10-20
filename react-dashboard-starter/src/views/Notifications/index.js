import { Button, Spin } from 'antd'
import React, { Component } from 'react'
import { 
    Card,
    List,
    Avatar,
    Badge
} from 'antd'
import { connect } from 'react-redux'
import { markNotificationAsReadById, markAllNotificationsAsRead } from '../../actions/notifications'

const mapState = state => {
    const {
        list,
        isLoading
    } = state.notifications
    return {
        list,
        isLoading
    }
}

@connect(mapState, { markNotificationAsReadById, markAllNotificationsAsRead })
class Notifications extends Component {
    render() {
        return (
            <Spin spinning={this.props.isLoading}>
                <Card 
                    title="Notifications" 
                    bordered={false} 
                    extra={
                        <Button
                            disabled={this.props.list.every(item=> item.hasRead === true)}
                            onClick={this.props.markAllNotificationsAsRead.bind(this)}
                        >
                            Mark all as read
                        </Button>}
                >
                    <List
                        itemLayout="horizontal"
                        dataSource={this.props.list}
                        renderItem={item => (
                        <List.Item extra={
                                item.hasRead
                                ?
                                null
                                :
                                <Button
                                    onClick={this.props.markNotificationAsReadById.bind(this, item.id)}
                                >
                                    Mark as read
                                </Button>}>
                            <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                            description={item.desc}
                            />
                        </List.Item>
                        )}
                    />
                </Card>
            </Spin>
        )
    }
}

export default Notifications