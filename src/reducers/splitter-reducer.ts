export const ACTION_TYPES = {
    UPDATELIST: 'splitterReducer/UPDATELIST',
    RESET: 'common/RESET',
};

const initialState = {
    loading: false,
    state: null,
    data: []
};

// Reducer
const Reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.UPDATELIST:
            return {
                ...state,
                data: [...action.payload]
            };

        case ACTION_TYPES.RESET:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};
export default Reducer;

export const updateList = (list: any) => ({
    type: ACTION_TYPES.UPDATELIST,
    payload: list,
});

export const reset = () => (dispatch: any) =>
    dispatch({ type: ACTION_TYPES.RESET });
