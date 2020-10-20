import { Button } from 'antd'
import React, { Component } from 'react'
import { 
    Card,
    List,
    Avatar,
    Badge
} from 'antd'

const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
];

export default class Notifications extends Component {
    render() {
        return (
            <Card 
                title="Notifications" 
                bordered={false} 
                extra={<Button>Mark all as read</Button>}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                    <List.Item extra={<Button>Mark as read</Button>}>
                        <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={<Badge dot>{item.title}</Badge>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                    </List.Item>
                    )}
                />
            </Card>
        )
    }
}
