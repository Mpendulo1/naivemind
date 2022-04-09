
function NumberInput({label, field, name, helperText, ...props}) {
    return(
        <div className="flex flex-col justify-start items-start w-full py-2">
        <label className="text-md font-semibold text-indigo-400 pb-1" htmlFor={field.name}>{label}</label>
        <input className="bg-gray-200 w-full border-b-4 focus:border-indigo-400 focus:outline-none rounded-sm px-1 py-2 text-xl font-medium text-gray-600" type="number" {...field} {...props} />
        <p className="text-red-500">{helperText}</p>
        </div>
    );
}

export default NumberInput;