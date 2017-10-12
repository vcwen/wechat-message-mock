// import {AxiosResponse} from 'axios'
const axios: any = jest.genMockFromModule('axios')

axios.post = async (url, body) => {
  return { data: { url, body } }
}

export default axios
