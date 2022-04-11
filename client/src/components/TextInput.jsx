
function TextInput({label, field, name, helperText, ...props}) {
    return(
        <div className="flex flex-col justify-start items-start w-full py-1">
        <label className="text-md font-semibold text-indigo-400 pb-1 capitalize" htmlFor={field.name}>{label}</label>
        <input className="bg-indigo-50 w-full border-2 border-indigo-300 rounded focus:border-0 focus:border-b-4 focus:border-indigo-400 focus:outline-none focus:rounded-sm px-1 text-xl font-normal text-gray-500" 
            type="text" {...field} {...props} 
        />
        <p className="text-red-500">{helperText}</p>
        </div>
    );
}

export default TextInput;