import Axios from 'axios';

const subRoute = 'users/';

export const loginInDB = async (email, password) => {
    try {
        const res = await Axios.post(process.env.REACT_APP_ROOT_URL + 'login', {
            email,
            password
        });

        return {
            user: res.data.user,
            token: res.data.token
        };
    } catch (err) {
        if (err.response.status === 400) throw new Error('זה לא מה ששמור אצלנו, נסו שנית');
        throw new Error('שגיאה כללית אירעה');
    }
};

export const signupInDB = async (email, password, firstName, lastName, phoneNumber, dateOfBirth) => {
    try {
        const res = await Axios.post(process.env.REACT_APP_ROOT_URL + 'signup', {
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
            dateOfBirth
        });

        return {
            user: res.data.user,
            token: res.data.token
        };
    } catch (err) {
        if (err.response.status === 409)
            throw new Error(err.response.data);
        throw new Error('Unable to signup. Please try again');
    }
};

export const logoutInDB = async (token) => {
    try {
        await Axios.post(process.env.REACT_APP_ROOT_URL + 'logout', {
            header: {
                Authorization: 'Bearer ' + token
            }
        });
    } catch (err) {
        throw new Error(err.message);
    }
};