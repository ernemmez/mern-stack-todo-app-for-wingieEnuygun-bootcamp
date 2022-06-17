

const request = (url, data=false, method = 'GET') => {
	return new Promise((resolve, reject) => {
		const options = {
			method,
            headers:{
                'Content-Type': 'application/json',
            }
		}
		if (data) {options.body = JSON.stringify(data)} //Data var ise option'a ekleniyor
        
		fetch(process.env.REACT_APP_API_URL + url, options)
			.then(res => res.json())
			.then(res => resolve(res))
			.catch(err => reject(err))
	})
}

export const get = url => request(url);
export const post = (url, data) => request(url, data, 'POST');
export const put = (url, data) => request(url, data, 'PUT');
export const del = (url, data) => request(url, data, 'DELETE');

