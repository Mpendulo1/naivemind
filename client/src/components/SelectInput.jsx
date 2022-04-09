
function SelectInput({question, id, options}) {

    return(
        <>
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-indigo-400">{question}</label>
        <select id={id} name={id} className="bg-yellow-50 border border-indigo-300 text-indigo-500 text-sm rounded block w-full p-2 mb-2" >
            {
                options.map( (option, index) => (<option key={index} value={option} >{option}</option>) )
            }
        </select>
        </>
    );
}

export default SelectInput;