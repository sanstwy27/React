import React, { Component } from 'react'
import {
    Card,
    Button
} from 'antd'
import { withRouter } from "react-router-dom";

class Edit extends Component {
    render() {
        return (
            <Card 
                title="Article Edit" 
                bordered={false} 
                extra={<Button>Cancel</Button>}
            >
                FORM
            </Card>
        )
    }
}

export default withRouter(Edit)