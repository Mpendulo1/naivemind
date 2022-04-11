import { useContext, useState } from "react";
import { Formik, Field, Form, useFormik } from "formik";
import * as yup from "yup";

import NumberInput from "./NumberInput";
import SelectInput from "./SelectInput";
import { ModelContext } from "../contexts/ModelContext";
import FormButton from "./FormButton";
import AuthForm from "./AuthForm";
import Spinner from "./Spinner";

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

    const [showForm, setShowForm] = useState(false);
    const toggleForm = () => {
        setShowForm(!showForm);
    }

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
        <AuthForm visible={showForm} toggleVisible={toggleForm} />
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
            <Spinner altText={isComputing ? "Computing..." : "Saving..."} />
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
            <FormButton 
                handleOnClick={() => setTemp({data:null, isDuplicate:false})} 
                bgColor="bg-red-600"
                textColor="text-white"
                title={temp.isDuplicate ? "close" : "discard"}
            />
            { !temp.isDuplicate && 
            <FormButton 
                handleOnClick={addData} 
                bgColor="bg-blue-600" 
                textColor="text-white"
                title="save result" 
            /> }
            </div>
            </>
        }
        </>
    );
}

export default FormFields;