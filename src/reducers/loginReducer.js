// export const initialUserDataState = {
//     user: null,
//     token: ''
// };

export const initialUserDataState = {
    user: {
        firstName: 'John',
        lastName: 'Deer',
        email: 'a@email.com'
    },
    token: ''
};

const loginReducer = (userData, action) => {
    switch (action.type) {
        case "LOGIN":
            console.log(action.user);
            return { user: action.user, token: action.token };
        case "LOGOUT":
            return { user: null, token: '' };
        default:
            return { ...userData };
    }
}

export default loginReducer;