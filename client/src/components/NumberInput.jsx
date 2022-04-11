
function NumberInput({label, field, name, helperText, ...props}) {
    return(
        <div className="flex flex-col justify-start items-start w-full py-1">
        <label className="text-md font-semibold text-indigo-400 pb-1 capitalize md:text-lg" htmlFor={field.name}>{label}</label>
        <input className="bg-gray-200 w-full border-b-4 focus:border-indigo-400 focus:outline-none rounded-sm px-1 text-xl font-normal text-gray-500 md:py-1" 
            type="number" {...field} {...props} 
        />
        <p className="text-red-500">{helperText}</p>
        </div>
    );
}

export default NumberInput;