// export const addApartmentPropsAction = (propertiesObj = {}) => ({
//     type: "ADD_APARTMENT_PROPERTIES",
//     newProperties: propertiesObj
// });

export const goToNextPublishPageAction = (propertiesObj = {}) => ({
    type: "GO_TO_NEXT_PAGE",
    newProperties: propertiesObj
});

export const goToPrevPublishPageAction = (prevPage = 0) => ({
    type: "RETURN_TO_PREV_PAGE",
    prevPage
});

export const resetAction = () => ({
    type: "RESET"
});