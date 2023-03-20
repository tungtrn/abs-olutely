import { getState } from "../stores/store";

export const handlePost = async (url: string, body: any, requireAuth: boolean = true) => {
    let headers;

    if (requireAuth) {  
        headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getState().auth.token,
        };
    } else {
        headers = {
            "Content-Type": "application/json",
        };
    }

    try {
        // fetch backend
        const response = await fetch("https://api-absolutely.ciliater.com/" + url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        });
  
        const data = await response.json();
  
        console.log(data);

        return data;
      } catch (error) {
        console.log(error);
      }
}

export const handleGet = async (url: string, requireAuth: boolean = true) => {
    let headers;

    if (requireAuth) {  
        headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getState().auth.token,
        };
    } else {
        headers = {
            "Content-Type": "application/json",
        };
    }

    try {
        // fetch backend
        const response = await fetch("https://api-absolutely.ciliater.com/" + url, {
            method: "GET",
            headers: headers,
        });

        const data = await response.json();

        console.log(data);

        return data;
    } catch (error) {
        console.log(error);
    }
}
