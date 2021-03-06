export const initialApartmentsState = {
  apartments: [],
  apartmentIds: [],
};

const apartmentsReducer = (apartmentsData, action) => {
  switch (action.type) {
    case "ADD_APARTMENTS":
      console.log(apartmentsData.apartmentIds, action.newApartmentIds);
      return {
        apartments: [...apartmentsData.apartments, ...action.newApartments],
        apartmentIds: [
          ...apartmentsData.apartmentIds,
          ...action.newApartmentIds,
        ],
      };
    case "NEW_APARTMENTS":
      return {
        apartments: [...action.newApartments],
        apartmentIds: [...action.newApartmentIds],
      };
    case "SORT_APARTMENTS":
      return {
        apartments: [...action.sortedApartments],
        apartmentIds: [...apartmentsData.apartmentIds],
      };
    default:
      return {
        ...apartmentsData,
      };
  }
};

export default apartmentsReducer;
