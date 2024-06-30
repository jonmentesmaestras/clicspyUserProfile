export default function TextAreaComponent({readOnly, onChange, textValue}) {

    const onChangeTextArea = (event) => {
        const inputValue = event.target.value;
        if (onChange) {
            onChange(inputValue)
        }
    }

    return (
        <textarea  readOnly={readOnly} onChange={onChangeTextArea} value={textValue}></textarea>
    );
}