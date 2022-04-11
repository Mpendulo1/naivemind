import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import FormFields from "../components/FormFields";
import { ModelContext } from "../contexts/ModelContext"
import Spinner from "../components/Spinner";
import FileInput from "../components/FileInput";

function Model() {
    const { isLoading, model, getModelData } = useContext(ModelContext);
    const {id} = useParams();

    useEffect( () => {
        getModelData(id);
    }, []);

    return(
        <div className="min-h-screen sm:px-8 sm:h-10 sm:w-full sm:grid gap-20 grid-cols-2 grid-rows-1 sm:py-8">
            {/* <NavButton /> */}
            {
                isLoading || !model ?
                <Spinner altText="Loading.." />
                :
                <div className="relative z-0 border-2 border-solid border-indigo-400 rounded-md my-8 px-4 md:h-fit md:border-4 md:max-w-full">
                    <h1 className="absolute top-0 left-4 -translate-y-6 bg-yellow-50 text-4xl px-1 capitalize font-semibold text-center text-indigo-400 md:text-4xl md:-translate-y-8">{model.name}</h1>
                    <p className="text-sm text-indigo-400 my-4 md:text-xl" >{model.description}</p>
                    <FormFields />
                </div>
            }
            <div className="md:max-w-full">
                <p className="text-2xl pb-3 text-indigo-400 font-semibold md:mt-2 md:text-3xl">Batch Processing</p>
                <FileInput />
            </div>
        </div>
    );
}

export default Model;