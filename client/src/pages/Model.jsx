import { useState, useEffect } from "react";
import axios from "axios";

import { NavButton } from "../components/NavButton";

let API_KEY = process.env.REACT_APP_API_KEY;

function Model() {

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
            let data = res.data.data.attributes;
            data != null ? setModel( data) : setModel( prevState => prevState );
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
        <div>
            <NavButton />
            <div className="relative z-0 border-2 border-solid border-indigo-400 rounded-md my-8">
                <h1 className="absolute top-0 left-4 -translate-y-6 bg-yellow-50 text-4xl px-1 capitalize font-semibold text-center text-indigo-400">{model ? model.name : "Drink Choice"}</h1>
                <p className="text-sm text-indigo-400 m-4" >{model ? model.description : ""}</p>
            </div>
        </div>
    );
}

export default Model;