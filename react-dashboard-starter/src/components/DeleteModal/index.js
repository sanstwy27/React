import React, { Component } from 'react'
import { Modal, Typography, message } from 'antd'
import { deleteArticleById } from '../../requests'

export default class DeleteModal extends Component {
    constructor() {
        super()
        this.state = {
            isShowArticleModal: false,
            deleteArticleConfirmLoading: false
        }
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.deleteModalRecord !== prevProps.deleteModalRecord) {
          this.showDeleteArticleModal()
        }
    }

    deleteArticle = () => {
        this.setState({
            deleteArticleConfirmLoading: true
        })
        deleteArticleById(this.props.deleteModalRecord.id)
            .then(resp => {
                message.success(resp.msg)
                this.props.reload()
            })
            .finally(() => {
                this.setState({
                    deleteArticleConfirmLoading: false,
                    isShowArticleModal: false
                })
            })
    }

    showDeleteArticleModal = () => {
        this.setState({
            deleteArticleTitle: this.props.deleteModalRecord.title,
            isShowArticleModal: true,
            deleteArticleID: this.props.deleteModalRecord.id
        })
    }

    hideDeleteModal = () => {
        this.setState({
            deleteArticleTitle: '',
            isShowArticleModal: false,
            deleteArticleConfirmLoading: false
        })
    }

    render() {
        return (
            this.props.deleteModalRecord
            ?
            <Modal 
            title={<Typography>Delete Confirm</Typography>}
            visible={this.state.isShowArticleModal}
            maskClosable={false}
            confirmLoading={this.state.deleteArticleConfirmLoading}
            onCancel={this.hideDeleteModal}
            onOk={this.deleteArticle}
        >
                <Typography>delete article [<span style={{color: '#f00'}}>{this.props.deleteModalRecord.title}</span>] ?</Typography>
            </Modal>
            :
            <></>
        )
    }
}
