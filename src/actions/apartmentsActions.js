const getNewApartmentIds = (newApartments) => {
    const newApartmentIds = [];
    newApartments.forEach(apartmentData => newApartmentIds.push(apartmentData.apartment._id));
    return newApartmentIds;
}

// When reached the end of the page and loading new apartments with the same query params
export const addApartmentsAction = (newApartments = []) => ({
    type: "ADD_APARTMENTS",
    newApartments,
    newApartmentIds: getNewApartmentIds(newApartments)
});

// When changing the query params get new apartments and delete previous ones
export const newApartmentsAction = (newApartments = []) => ({
    type: "NEW_APARTMENTS",
    newApartments,
    newApartmentIds: getNewApartmentIds(newApartments)
});

export const sortApartmentsAction = (sortedApartments) => ({
    type: "SORT_APARTMENTS",
    sortedApartments
});