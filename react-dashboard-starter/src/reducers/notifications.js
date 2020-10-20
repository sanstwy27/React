import actionTypes from '../actions/actionTypes'

const initState = {
    isLoading: false,
    list: [{
        id: 1,
        title: 'dolorem eum magni eos aperiam quia 111',
        desc: 'ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae',
        hasRead: false
    }, {
        id: 2,
        title: 'dolorem eum magni eos aperiam quia 222',
        desc: 'ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae',
        hasRead: true
    }]
}

export default (state = initState, action) => {
    let newList
    switch(action.type) {
        case actionTypes.START_NOTIFICATION_POST:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.RECIEVED_NOTIFICATIONS:
            return {
                ...state,
                list: action.payload.list
            }
        case actionTypes.FINISH_NOTIFICATION_POST:
            return {
                ...state,
                isLoading: false
            }
        case actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID:
            newList = state.list.map(item => {
                if(item.id === action.payload.id) {
                    item.hasRead = true
                }
                return item;
            })
            return {
                ...state,
                list: newList
            }
        case actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ_BY_ID:
            newList = state.list.map(item => {
                item.hasRead = true
                return item;
            })
            return {
                ...state,
                list: newList
            }
        default:
            return state;
    }
}