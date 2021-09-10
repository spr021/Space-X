import axios from "axios"

const Axios = axios.create({
  baseURL: 'https://api.spacexdata.com/v3/',
  timeout: 10000,
})

export default Axios