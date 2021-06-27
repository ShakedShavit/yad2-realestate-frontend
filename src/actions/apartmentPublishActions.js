export const addApartmentPropsAction = (propertiesObj) => ({
    type: "ADD_APARTMENT_PROPERTY",
    newProperties: propertiesObj
});

export const nextPublishPageAction = () => ({
    type: "NEXT_PAGE"
});

export const goToPrevPublishPageAction = (prevPage) => ({
    type: "RETURN_TO_PREV_PAGE",
    prevPage
});