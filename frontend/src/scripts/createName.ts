
import { adjectives } from "./adjectives";
import { nouns } from "./nouns";

function randomFromArray(array: string[]) {
	return (array[Math.floor(Math.random() * array.length)]);
}

function upperFirst(str: string) {
	return (str.charAt(0).toUpperCase() + str.slice(1));
}

export function createName() {
	const adjective: string = upperFirst(randomFromArray(adjectives));
	const noun: string = upperFirst(randomFromArray(nouns));

	return (adjective + noun);
}
