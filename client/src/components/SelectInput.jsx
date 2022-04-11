
function SelectInput({label, field, helperText, options, ...props}) {
  
  return (
    <div className="flex flex-col justify-start items-start w-full py-1">
        <label className="text-md font-semibold text-indigo-400 pb-1 capitalize md:text-lg" htmlFor={field.name}>{label}</label>
        <select className="bg-gray-200 w-full border-b-4 focus:border-indigo-400 focus:outline-none rounded-sm px-1 text-xl font-normal text-gray-500 md:py-1"  {...field} {...props} >
        {
            options.map( op => (<option key={op} value={op} >{op}</option>) )
        }
        </select>
        <p className="text-red-600">{helperText}</p>
    </div>
  );
}

export default SelectInput;