
export default function FieldSetter({fieldName, setField}: {fieldName: string, setField: (any) => void} ) {

	const setFieldFromInput = (formData: FormData) => {
		setField(formData.get("value"));
	}

	return (
		<form action={setFieldFromInput}>
			<input name="value" placeholder={fieldName}/>
			<button type="submit"> Set </button>
		</form>
	);
}
