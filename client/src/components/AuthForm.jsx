import { useState, useContext } from "react";
import { useFormik, Formik, Form, Field } from "formik";
import * as yup from "yup";

import FormButton from "./FormButton";
import TextInput from "./TextInput";
import { UserContext } from "../contexts/UserContext";

function AuthForm() {

    const authFormSchema = yup.object({
        username: yup
            .string("Provide")
            .required("Required")
            .min(3, "Username must contain at least 3 characters")
            .max(10, "Username can contain up to 10 characters"),
        password: yup
            .string("Provide any input")
            .min(6, "Password must be at least 6 characters long")
            .max(15, "Must be no longer than 15 characters")
            .required("Required")
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: authFormSchema
    });

    const [label, setLabel] = useState("register");
    const {user, loginUser, registerUser, formIsVisible, setFormIsVisible} = useContext(UserContext);

    const toggleForm = () => {
        if (label==="register") {
            setLabel("login");
        } else {
            setLabel("register");
        }
        return;
    }

    const handleSubmit = (e) => {
        if ( label==="register" ) {
            registerUser(e, formik.values);
        } else {
            loginUser(e, formik.values);
        }
    }

    return(
        <div className={`flex flex-col items-center fixed w-3/4 pt-4 px-4 top-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-xl bg-white shadow-gray-700 shadow-2xl drop-shadow-4xl ${user ? "hidden" : formIsVisible ? "" : "hidden" } md:w-1/2 aspect-auto`}>
            <p className="text-2xl font-bold text-indigo-500 capitalize md:text-5xl md:py-14">{label}</p>
            <Formik onSubmit={(e) => handleSubmit(e)}>
                <Form>
                    <Field 
                            name="username" 
                            label="Username" 
                            helperText={ formik.errors.username || null}
                            value={formik.values.username} 
                            onChange={formik.handleChange} 
                            component={TextInput} 
                        />
                    <Field 
                            name="password" 
                            label="password" 
                            helperText={ formik.errors.password || null}
                            value={formik.values.password} 
                            onChange={formik.handleChange} 
                            component={TextInput} 
                        />
                </Form>
            </Formik>
            <div className="w-full flex justify-between sm:justify-center gap-14">
                <FormButton handleOnClick={() => setFormIsVisible(false)}  title="close" textColor='text-white' bgColor="bg-red-400" />
                <FormButton handleOnClick={(e) => handleSubmit(e)} title={label} textColor="text-white" bgColor="bg-indigo-400" />
            </div>
            <p className="pb-4 text-indigo-300">{label==="register" ? "Already registered?" : "Not Registered?"} <span onClick={toggleForm} className="text-indigo-500 font-bold cursor-pointer px-1">{label==="register" ? "Login" : "Register"}</span></p>
        </div>
    );
}

export default AuthForm;