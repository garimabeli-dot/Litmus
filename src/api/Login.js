export function postLoginDetails(url, method,header=[]) {
    return new Promise((resolve, reject) => {
        fetch(url,{ 
            method: method,
            headers:header
         })
            .then(handleErrors)
            .then(data => resolve(data))
            .catch(err => reject(err.message));
    });
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response.json();
}

export function postReviews(url, method,header=[],body='') {
    return new Promise((resolve, reject) => {
        fetch(url,{ 
            method: method,
            headers:header,
            body: JSON.stringify(body)
         })
            .then(handleErrors)
            .then(data => resolve(data))
            .catch(err => reject(err.message));
    });
}

export function postProfileDetails(url, method,header=[],body='') {
    return new Promise((resolve, reject) => {
        fetch(url,{ 
            method: method,
            headers:header,
            body: (body)
         })
            .then(handleErrors)
            .then(data => resolve(data))
            .catch(err => reject(err.message));
    });
}