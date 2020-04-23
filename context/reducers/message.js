export default message = (state, action) => {
    switch (action.type) {
        case 'getAll': {
            return {
                all: state,
                ...state
            }
        }
        case 'getListWithType': {
            // const data = state.filter(item => item.type === action.payload)
            // console.log(action.payload, ">>", data)
            return {
                [action.payload]: state.all.filter(item => item.type === action.payload),
                ...state
            }
        }
        case 'removeOne': {
            state.splice(action.payload, 1)
            return state
        }
        // case 'clear':
        //     return []
        default:
            return state;
    }
};
