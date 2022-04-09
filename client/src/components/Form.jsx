import NumberInput from "./NumberInput";
import SelectInput from "./SelectInput";


function Form() {
    
    return(
        <form action="" className="flex flex-col items-start">
            <NumberInput question="Age" id="age" helpext="Please provide number between 1 and 90." />
            <SelectInput question="Gender?" id="gender" options={["female", "male"]} />
            <SelectInput question="Pregnant?" id="pregnant" options={["no", "yes", "na"]} />
            <SelectInput question="Sensitive to caffeine?" id="caffeine" options={["yes", "no", "not sure"]} />
            <SelectInput question="Health conscious?" id="health" options={["yes", "no"]} />
            <SelectInput question="Time of day?" id="time" options={["morning", "afternoon", "evening"]} />
            <NumberInput question="Temperature?" id="temperature" helptext="Please provide a number between -10 and 45." />
            <NumberInput question="Number of drinks consumed per day?" id="drinks" helptext="Please provide a number between 0 and 20." />
            <NumberInput question="Number of drinks consumed today?" id="drinksCount" helptext="Please provide a number between 0 and 20." />

            <button type="submit" className="uppercase self-end bg-purple-400 text-xl text-white font-bold px-4 py-1.5 my-4 rounded shadow-md" >compute</button>
        </form>
    );
}

export default Form;