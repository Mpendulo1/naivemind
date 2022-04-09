
function NumberInput({question, id, helptext}) {
    return(
        <>
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-indigo-400">{question}</label>
            <input type="number" id={id} name={id} className="bg-yellow-50 border border-indigo-300 text-indigo-500 text-sm rounded block w-full p-2" placeholder="23 years" />
        <p className="mb-2 text-sm text-purple-400">{helptext}</p>
        </>
    );
}

export default NumberInput;