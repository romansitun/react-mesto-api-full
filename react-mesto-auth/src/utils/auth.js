export const BASE_URL = 'https://api.situnmesto.students.nomoredomains.sbs';
// export const BASE_URL = 'http://localhost:3000';

function handleResponse(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

export const register = ({ email, password }) => {
    return fetch(`${BASE_URL}/sign-up`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
        })
    })
        .then((res) => handleResponse(res))
};


export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/sign-in`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
        })
    })
        .then((res) => handleResponse(res))
        .then((data) => {
            if (data.token) {
                localStorage.setItem('jwt', data.token);
                return data;

            }
        })
};


export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then((res) => handleResponse(res))
        .then(data => data)
} 
