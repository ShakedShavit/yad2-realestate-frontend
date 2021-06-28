export const initialApartmentPublishState = {
    apartment: {},
    currPage: 1,
    maxPage: 5
};

const apartmentPublishReducer = (apartmentPublishData, action) => {
    switch (action.type) {
        // case "ADD_APARTMENT_PROPERTIES":
        //     return {
        //         apartment: { ...apartmentPublishData.apartment, ...action.newProperties },
        //         currPage: apartmentPublishData.currPage
        //     };
        case "GO_TO_NEXT_PAGE":
            return {
                apartment: { ...apartmentPublishData.apartment, ...action.newProperties },
                currPage: apartmentPublishData.currPage + 1
            };
        case "RETURN_TO_PREV_PAGE":
            const prevPage = action.prevPage;
            if (0 > prevPage || prevPage >= apartmentPublishData.currPage) return { ...apartmentPublishData };
            console.log(prevPage);
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