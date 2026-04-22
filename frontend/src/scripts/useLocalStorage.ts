import { useState } from "react"

export function useLocalStorage(key: string, initial: string) {
	// const [value, setValue] = useState(localStorage.getItem(key) || initial);
	const [value, setValue] = useState(() => {
		return (localStorage.getItem(key) || initial);
	});

	const setStoredValue = (newValue: string) => {
		localStorage.setItem(key, newValue);
		setValue(newValue);
	}

	return [value, setStoredValue] as const;
}
