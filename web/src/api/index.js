const API = process.env.REACT_APP_API_URL

const headers = () => {
  const token = JSON.parse(localStorage.getItem('token'))
  return {
    Accept: 'application/json',
    'content-type': 'application/json',
    Authorization: `Bearer ${token}`
  }
}

const parseResponse = response => response.json().then((json) => {
  if(!response.ok) Promise.reject(json)
  return json
})

const queryString = (params) => {
  const query = Object.keys(params).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&')
  return `${query.length ? '?' : ''}${query}`
}

export default {
  fetch(url, params = {}){
    return fetch(`${API}${url}${queryString(params)}`, {
      method: 'GET',
      headers: headers()
    }).then(parseResponse)
  },

  post(url, data){
    const body = JSON.stringify(data)
    return fetch(`${API}${url}`, {
      method: 'POST',
      headers: headers(),
      body
    }).then(parseResponse)
  },

  patch(url, data){
    const body = JSON.stringify(data)
    return fetch(`${API}${url}`, {
      method: 'PATCH',
      headers: headers(),
      body
    }).then(parseResponse)
  },

  delete(url){
    return fetch(`${API}${url}`, {
      method: 'DELETE',
      headers: headers()
    })
    .then(parseResponse)
  }

}
