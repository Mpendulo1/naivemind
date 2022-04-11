import { createContext, useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export const ModelContext = createContext();

let API_KEY = process.env.REACT_APP_API_KEY;

export const ModelContextProvider = ({ children }) => {
  const [model, setModel] = useState(null);
  const [models, setModels] = useState([]);
  const [currModel, setCurrModel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isComputing, setIsComputing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [temp, setTemp] = useState({ data: null, isDuplicate: false });
  const [simulationData, setSimulationData] = useState([]);
  const { user, setFormIsVisible } = useContext(UserContext);

  const instance = axios.create({
    baseURL: "https://api.up2tom.com/v3",
    headers: {
      Authorization: `Token ${API_KEY}`,
      "Content-Type": "application/vnd.api+json",
    },
  });

  const changeCurrModel = (id) => {
    const nextModel = models.filter((m) => m.id === id)[0];
    setCurrModel(nextModel);
  };

  const addData = async () => {
    if (user) {
      let duplicate = simulationData.filter((data) => data.id === temp.data.id);
      if (duplicate.length === 0) {
        setIsSaving(true);
        setSimulationData((prevState) => [...prevState, temp.data]);

        try {
          const res = await axios.post(
            "/scenarios/add",
            { user: user.id, ...temp.data },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log(res);
          if (res && res.data.Error) {
            setIsSaving(false);
            setTemp({ data: temp.data, isDuplicate: true });
            return;
          }
          setIsSaving(false);
        } catch (error) {
          if (error.response) {
            console.log(error.response.data);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
          setIsSaving(false);
        }
        setTemp({ data: null, isDuplicate: false });
      } else {
        setTemp({ data: temp.data, isDuplicate: true });
      }
    } else {
      setFormIsVisible(true);
    }
  };

  const getModelData = async (id) => {
    if (model == null || model != currModel) {
      setIsLoading(true);
      try {
        const res = await instance.get(`/models/${id}`);
        const data = res.data.data.attributes;
        setIsLoading(false);
        setModel(data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      }
    } else {
      return;
    }
  };

  const getPrediction = async (data) => {
    setIsComputing(true);
    try {
      const res = await instance.post("/decision/58d3bcf97c6b1644db73ad12", {
        data: {
          type: "scenario",
          attributes: {
            input: data,
          },
        },
      });
      setIsComputing(false);
      setTemp({ data: res.data.data, isDuplicate: false });
    } catch (error) {
      if (error.response) {
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
      setIsComputing(false);
    }
  };

  const getModels = async () => {
    if (!models.length) {
      try {
        const res = await instance.get("/models");
        setModels(res.data.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      }
    } else {
      return;
    }
  };

  return (
    <ModelContext.Provider
      value={{
        model,
        getModelData,
        isLoading,
        isComputing,
        getPrediction,
        temp,
        setTemp,
        addData,
        isSaving,
        getModels,
        models,
        changeCurrModel,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};
