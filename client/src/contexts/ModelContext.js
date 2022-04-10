import { createContext, useState } from "react";
import axios from "axios";

export const ModelContext = createContext();

let API_KEY = process.env.REACT_APP_API_KEY;

export const ModelContextProvider = ({children}) => {

    const [model, setModel] = useState(null);
    const [isLoading, setIsLoading ] = useState(true);
    const [isComputing, setIsComputing ] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [temp, setTemp] = useState({data: null, isDuplicate: false});
    const [simulationData, setSimulationData] = useState([]);

    const instance = axios.create({
        baseURL: 'https://api.up2tom.com/v3',
        headers: {
            "Authorization": `Token ${API_KEY}`,
            "Content-Type": "application/vnd.api+json"
        }
    });

    const addData = async () => {
        let duplicate = simulationData.filter( data => data.id === temp.data.id);
        if (duplicate.length === 0) {
          setIsSaving(true);
            setSimulationData(prevState => [...prevState, temp.data]);
            try {
                const res = await axios.post('/scenarios/add',temp.data);
                if (res && res.data.Error) {
                  setIsSaving(false);
                  setTemp({data:temp.data, isDuplicate:true});
                  return;
                }
                setIsSaving(false);
            } catch (error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.log(error.response.data);
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
            setTemp({data:null, isDuplicate:false});
        } else {
            setTemp({data:temp.data, isDuplicate:true});
        }
    }

    const getModelData = async () => {
        if ( model == null ) {
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
        } else {
            return;
        }
    }

    const getPrediction = async (data) => {
        setIsComputing(true);
        try {
            const res = await instance.post("/decision/58d3bcf97c6b1644db73ad12", {
                "data": {
                    "type": "scenario",
                    "attributes": {
                      "input": data
                    }
                  }
            });
            setIsComputing(false);
            setTemp({data:res.data.data, isDuplicate:false});
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

    return(
        <ModelContext.Provider value={{model, getModelData, isLoading, isComputing, getPrediction, temp, setTemp, addData, isSaving}}>
            {children}
        </ModelContext.Provider>
    );
}