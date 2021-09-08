 
 
 const initialState = {
    accessToken: null,
    user: null,
    loading: false
  }
  
  const rootReducer = (prevState = initialState, action: any) => {
    const { type, payload } = action
    switch (type) {
      case 'LOGIN_REQUEST':
        return { ...prevState, loading: true }
      case 'LOGIN_SUCCESS':
        return { ...prevState, accessToken: payload, loading: false }
      case 'LOGIN_FAIL':
        return { ...prevState, accessToken: null, loading: false, error: payload }
      case 'LOAD_PROFILE':
        return { ...prevState, user: payload }
      default:
        return { ...prevState }
    }
  }

  export default rootReducer