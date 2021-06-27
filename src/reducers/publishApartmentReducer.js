export const initialApartmentPublishState = {
    apartment: {},
    currPage: 0
};

const apartmentPublishReducer = (apartmentPublishData, action) => {
    switch (action.type) {
        case "ADD_APARTMENT_PROPERTY":
            return {
                apartment: { ...apartmentPublishData.apartment, ...action.newProperties },
                currPage: apartmentPublishData.currPage
            };
        case "NEXT_PAGE":
            return {
                apartment: { ...apartmentPublishData.apartment },
                currPage: apartmentPublishData.currPage + 1
            };
        case "RETURN_TO_PREV_PAGE":
            const prevPage = action.prevPage;
            if (0 > prevPage || prevPage >= apartmentPublishData.currPage) return { ...apartmentPublishData };
                
            return {
                apartment: { ...apartmentPublishData.apartment },
                currPage: prevPage
            };
        default:
            return {
                ...apartmentPublishData
            };
    }
}

export default apartmentPublishReducer;