import { json } from "react-router-dom";


export const GetRequest = async (apiEndpoint) => {
	const headers = new Headers();

	const options = {
		method: "GET",
		headers: headers
	};
	return await fetch(apiEndpoint, options)
		.then(response => {
			if(response.ok) {
				return response.json();
			}
			else {
				console.log("error found")
				throw new Error("Error");
			}
		}).catch(error => console.log(error));
}

export const PutRequest = async (apiEndpoint, body) => {
	const headers = new Headers();
	headers.append('Content-Type','application/json');

	const options = {
		method: "PUT",
		headers: headers,
		body:JSON.stringify(body)
	};
	return await fetch(apiEndpoint, options)
		.then(response => {
			if(response.ok) {
				return response.json();
			}
			else {
				throw new Error("Error");
			}
		}).catch(error => console.log(error));
}

export const PostRequest = async (apiEndpoint, body) => {
	const headers = new Headers();
	headers.append('Content-Type','application/json');

	const options = {
		method: "POST",
		headers: headers,
		body:JSON.stringify(body)
	};
	return await fetch(apiEndpoint, options)
		.then(response => {
			if(response.ok) {
				return response.json();
			}
			else {
				throw new Error("Error");
			}
		}).catch(error => console.log(error));
}

export const DeleteRequest = async (apiEndpoint) => {
	const headers = new Headers();
	headers.append('Content-Type','application/json');

	const options = {
		method: "DELETE",
		headers: headers
	};
	return await fetch(apiEndpoint, options)
		.then(response => {
			if(response.ok) {
				return response.json();
			}
			else {
				throw new Error("Error");
			}
		}).catch(error => console.log(error));
}