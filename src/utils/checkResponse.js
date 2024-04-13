const checkResponse = (res) => {
  if (res.ok) {
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return res.json();
    } 
      return Promise.resolve();
    
  } 
    return Promise.reject(`Error: ${res.status}`);
  
};

export default checkResponse;
