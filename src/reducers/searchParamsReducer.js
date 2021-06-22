export const initialSearchParamsState = {};

const searchParamsReducer = (searchParamsData, action) => {
    switch (action.type) {
        case "NEW_PARAMS":
            return {
                ...action.newQueryParams
            };
        default:
            return {
                ...searchParamsData
            };
    }
}

export default searchParamsReducer;