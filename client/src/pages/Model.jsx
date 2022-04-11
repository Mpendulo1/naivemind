import { useEffect } from "react";
import { useContext } from "react";

import { NavButton } from "../components/NavButton";
import FormFields from "../components/FormFields";
import { ModelContext } from "../contexts/ModelContext"
import Spinner from "../components/Spinner";

function Model() {
    const { isLoading, model, getModelData } = useContext(ModelContext);

    useEffect( () => { 
        getModelData();
    }, [model]);

    return(
        <div className="min-h-screen">
            <NavButton />
            {
                isLoading || !model ?
                <Spinner altText="Loading.." />
                :
                <div className="relative z-0 border-2 border-solid border-indigo-400 rounded-md my-8 px-4">
                    <h1 className="absolute top-0 left-4 -translate-y-6 bg-yellow-50 text-4xl px-1 capitalize font-semibold text-center text-indigo-400">{model.name}</h1>
                    <p className="text-sm text-indigo-400 my-4" >{model.description}</p>

                    <FormFields />
                </div>
            }
        </div>
    );
}

export default Model;