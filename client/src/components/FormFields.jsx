import { useContext } from "react";
import { Formik, Field, Form, useFormik } from "formik";
import * as yup from "yup";

import NumberInput from "./NumberInput";
import SelectInput from "./SelectInput";
import { ModelContext } from "../contexts/ModelContext";

function FormFields() {

    const { model, getPrediction, isComputing, temp, setTemp, addData, isSaving } = useContext(ModelContext);
    const attribs = model.metadata.attributes;

    let inputs = {};
    attribs.forEach(attrib => {
        if (attrib.type.toLowerCase() === "continuous") {
            inputs[attrib.name] = attrib.domain.lower;
        }
        else if ( attrib.type.toLowerCase() === "nominal" ) {
            inputs[attrib.name] = attrib.domain.values[0];
        }
    });
    const schema = yup.object({
        INPUTVAR3: yup
            .number("Input accepts numbers only")
            .required("Required")
            .min(1,"Min acceptable age is 1")
            .max(90, "Max acceptable is age 90"),
        INPUTVAR1: yup
            .number("Input accepts numbers only")
            .required("Required")
            .min(-10,"Min temperature is -10℃")
            .max(45, "Temperature must be less than 45℃"),
        INPUTVAR8: yup
            .number("Input accepts numbers only")
            .required("Required")
            .min(0,"Min acceptable input is 0")
            .max(20, "Max acceptable input is 20"),
        INPUTVAR9: yup
            .number("Input accepts numbers only")
            .required("Required")
            .min(0,"Min acceptable input is 0")
            .max(20, "Max acceptable input is 20"),
    });

    const formik = useFormik({
        initialValues: inputs,
        validationSchema: schema
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        getPrediction(formik.values);
    }
    
    return(
        <>
        <Formik onSubmit={() => handleSubmit()}>
            <Form>
            {
                attribs.map((attrib) => (
                    attrib.type.toLowerCase() === "continuous" ? 
                    <Field 
                        key={attrib.name} 
                        name={attrib.name} 
                        label={attrib.question} 
                        helperText={ formik.errors[attrib.name] || null}
                        value={formik.values[attrib.name]} 
                        onChange={formik.handleChange}
                        component={NumberInput} 
                    /> 
                    : 
                    <Field 
                        key={attrib.name} 
                        name={attrib.name} 
                        label={attrib.question} 
                        options={attrib.domain.values}
                        helperText={ formik.errors[attrib.name] || null}
                        value={formik.values[attrib.name]} 
                        onChange={formik.handleChange} 
                        component={SelectInput} 
                    />
                ))
            }
            </Form>
        </Formik>
        {
            isComputing || isSaving ?
            <div className="flex justify-center items-center my-4">
                <svg role="status" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-indigo-500 fill-yellow-50 stroke-yellow-50" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                </svg>
                <span className="text-xl text-indigo-400">{isComputing ? "Computing..." : "Saving..."}</span>
            </div>
            :
            temp.data && !temp.isDuplicate &&
            <div className="flex flex-col bg-indigo-400 rounded mt-3 py-1 px-2">
                <p className="text-yellow-400 font-sm">Prediction🎊</p>
                <p className="self-center text-xl text-white pb-2">{temp.data.attributes.decision}</p>
            </div>
        }
        {
            !temp.data ?
            <button type="submit" onClick={(e) => handleSubmit(e)} className={`uppercase bg-purple-400 hover:bg-purple-500 text-xl text-white font-bold px-4 py-1.5 my-4 rounded-lg shadow-md ${isComputing ? "hidden" : ""}`} >compute</button>
            :
            <>
            {   temp.isDuplicate && 
                <p className="py-2 mt-2 bg-green-400 text-gray-600 text-xl font-bold text-center rounded-md">Duplicate scenario!<br/> Scenario data saved already.</p>
            }
            <div className="flex justify-between">
            <button onClick={() => setTemp({data:null, isDuplicate:false})} className="uppercase bg-red-600 hover:bg-red-500 text-md text-white font-bold px-4 py-2 my-4 rounded-lg shadow-md" >{temp.isDuplicate ? "close" : "discard"}</button>
            {   
                !temp.isDuplicate &&
                <button onClick={addData} className="uppercase bg-blue-600 hover:bg-blue-500 text-md text-white font-bold px-4 py-2 my-4 rounded-lg shadow-md" >save result</button>
                
            }
            </div>
            </>
        }
        </>
    );
}

export default FormFields;