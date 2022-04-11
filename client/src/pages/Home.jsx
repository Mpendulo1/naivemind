import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import LogoutModal from "../components/LogoutModal";

import { ModelContext } from "../contexts/ModelContext";

function Home() {

    const { getModels, models, changeCurrModel } = useContext(ModelContext);

    useEffect(() => {
        getModels();
    },[]);

    return(
        <div className="md:px-20">
            <AuthForm />
            <LogoutModal />
            <h1 className="text-4xl text-start text-indigo-400 pt-4 md:text-6xl">Models</h1>
            <div className="grid gap-4 grid-cols-2 grid-rows-2 my-8">
            {
                models.map(model => (
                    <Link to={`/models/${model.id}`} key={model.id} onClick={() => changeCurrModel(model.id)}
                        className="rounded border-2 border-indigo-400  flex items-center justify-center"
                    >
                    <p
                        className="text-indigo-500 font-md p-4 flex items-center justify-center text-center md:text-3xl md:w-fit md:h-20"
                    >
                        {model.attributes.name}
                    </p>
                    </Link>
                ))
            }
            </div>
        </div>
    );
}

export default Home;