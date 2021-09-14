import axios from "axios"

const Axios = axios.create({
  baseURL: process.env.REACT_APP_DOMAIN_NAME,
  timeout: 10000,
})

export default Axios