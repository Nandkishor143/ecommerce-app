import axios from "axios"

const BASE_URL = "http://localhost:8800/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDE2NjkzZmNmNDZjNjYwOGU2YjM4ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MjYxNzc1NiwiZXhwIjoxNjgyODc2OTU2fQ.Ex01WAK1OPkrLq4_uiav7I1hD7qX3FIGs2nf4A0IqA0"

export const publicRequest = axios.create({
    baseURL: BASE_URL,

});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: `Bearer ${TOKEN}`}
});