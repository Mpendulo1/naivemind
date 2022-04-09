import { useState, useEffect } from "react";
import axios from "axios";

import { NavButton } from "../components/NavButton";
import Form from "../components/Form";

let API_KEY = process.env.REACT_APP_API_KEY;

function Model() {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ model, setModel ] = useState(null);

    const instance = axios.create({
        baseURL: 'https://api.up2tom.com/v3',
        headers: {
            "Authorization": `Token ${API_KEY}`,
            "Content-Type": "application/vnd.api+json"
        }
    });

    const getModelData = async () => {
        try {
            const res = await instance.get("/models/58d3bcf97c6b1644db73ad12");
            const data = res.data.data.attributes;
            setModel(data);
            setIsLoading(false);
        } catch (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
        }
    }

    useEffect( () => { 
        getModelData();
    }, []);

    return(
        <div className="min-h-screen">
            <NavButton />
            {
                isLoading || !model ?
                <div className="flex justify-center items-center h-full">
                    <svg role="status" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-indigo-500 fill-yellow-50 stroke-yellow-50" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                    </svg>
                    <span className="text-xl text-indigo-400">Loading...</span>
                </div>
                :
                <div className="relative z-0 border-2 border-solid border-indigo-400 rounded-md my-8 px-4">
                    <h1 className="absolute top-0 left-4 -translate-y-6 bg-yellow-50 text-4xl px-1 capitalize font-semibold text-center text-indigo-400">{model.name}</h1>
                    <p className="text-sm text-indigo-400 my-4" >{model.description}</p>

                    <Form />
                </div>
            }
        </div>
    );
}

export default Model;