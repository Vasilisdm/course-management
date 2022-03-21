export default function courseReducer(state = [], action) {
    switch (state.type) {
        case "CREATE_COURSE":
            return [...state, { ...action.course }];
        default:
            state;
    }
}
