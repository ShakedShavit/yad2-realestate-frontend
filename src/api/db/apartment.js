import Axios from 'axios';

const subRoute = 'apartments/';

export const fetchApartmentsFromDB = async (queries = {}, apartmentIds = []) => {
    try {
        const res = await Axios.get(process.env.REACT_APP_ROOT_URL + subRoute, {
            params: {
                ...queries,
                'apartmentIds[]': [ ...apartmentIds ]
            }
        });

        return res.data;
    } catch (err) {
        if (err.response.status === 422)
            throw new Error(err.response.data);
        throw new Error('Unable to signup. Please try again');
    }
}
