import { Formik, Field, Form, useFormik } from "formik";
import * as yup from "yup";

import NumberInput from "./NumberInput";
import SelectInput from "./SelectInput";

const schema = yup.object({
    age: yup
        .number("Input accepts numbers only")
        .required("Required")
        .min(1,"Min acceptable age is 1")
        .max(90, "Max acceptable is age 90"),
    temperature: yup
        .number("Input accepts numbers only")
        .required("Required")
        .min(-10,"Min temperature is -10℃")
        .max(45, "Temperature must be less than 45℃"),
    drinksNumber: yup
        .number("Input accepts numbers only")
        .required("Required")
        .min(0,"Min acceptable input is 0")
        .max(20, "Max acceptable input is 20"),
    drinksCount: yup
        .number("Input accepts numbers only")
        .required("Required")
        .min(0,"Min acceptable input is 0")
        .max(20, "Max acceptable input is 20"),
});

function FormFields() {

    const formik = useFormik({
        initialValues: {
            age: 21,
            gender: "Female",
            pregnant: "No",
            caffeine: "No",
            health: "Yes",
            time: "Morning",
            temperature: 40,
            drinksNumber: 0,
            drinksCount: 0
        },
        validationSchema: schema
    });

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    
    return(
        <>
        <Formik onSubmit={() => handleSubmit()}>
            <Form>
                <Field name="age" label="Age?" helperText={formik.errors.age || null}
                    value={formik.values.age} 
                    onChange={formik.handleChange} 
                    component={NumberInput} 
                />    
                <Field name="gender" label="Gender" placeholder="gender" options={["Female","Male"]} helperText={formik.errors.gender || null}
                    value={formik.values.gender} 
                    onChange={formik.handleChange} 
                    component={SelectInput} 
                />    
                <Field name="pregnant" label="Pregnant?" options={["No","Yes"]} helperText={formik.errors.pregnant || null}
                    value={formik.values.pregnant} 
                    onChange={formik.handleChange} 
                    component={SelectInput} 
                />    
                <Field name="caffeine" label="Sensitive to caffeine?" options={["No","Yes"]} helperText={formik.errors.caffeine || null}
                    value={formik.values.caffeine} 
                    onChange={formik.handleChange} 
                    component={SelectInput} 
                />      
                <Field name="health" label="Health conscious?" options={["No","Yes"]} helperText={formik.errors.health || null}
                    value={formik.values.health} 
                    onChange={formik.handleChange} 
                    component={SelectInput} 
                />    
                <Field name="time" label="Time of day?" options={["Morning","Afternoon","Evening"]} helperText={formik.errors.time || null}
                    value={formik.values.time} 
                    onChange={formik.handleChange} 
                    component={SelectInput} 
                />    
                <Field name="temperature" label="Temperature?" placeholder="Beverage temperature in ℃" helperText={formik.errors.temperature || null}
                    value={formik.values.temperature} 
                    onChange={formik.handleChange} 
                    component={NumberInput} 
                />
                <Field name="drinksNumber" label="Number of drinks consumed per day?" helperText={formik.errors.drinksNumber || null}
                    value={formik.values.drinksNumber} 
                    onChange={formik.handleChange} 
                    component={NumberInput} 
                />
                <Field name="drinksCount" label="Number of drinks consumed today?" helperText={formik.errors.drinksCount || null}
                    value={formik.values.drinksCount} 
                    onChange={formik.handleChange} 
                    component={NumberInput} 
                />
            </Form>
        </Formik>
        <button type="submit" className="uppercase self-right bg-purple-400 text-xl text-white font-bold px-4 py-1.5 my-4 rounded shadow-md" >compute</button>
        </>
    );
}

export default FormFields;