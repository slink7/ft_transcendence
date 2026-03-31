
/**
 *
 *	CONFIG
 *
 */

export const WIDTH: number = 10;
export const HEIGHT: number = 20;

export const CELL_SIZE: number = 30;

export const PALETTES: string[][] = [
	["#00FFFF", "#FFFF00", "#AC00FF", "#FFA700", "#0000FF", "#FF0000", "#00FF00"], //Classique
	["#561D25", "#CE8147", "#ECDD7B", "#D3E298", "#CDE7BE"], //Pastel
	["#202020", "#4b5043", "#9bc4bc", "#d3ffe9", "#8ddbe0"], //Glacial
	["#2e1f27", "#854d27", "#dd7230", "#f4c95d", "#e7e393"], //Summer
]

export const SHAPES = [
	[
		[1, 1, 1, 1]
	],
	[
		[1, 1],
		[1, 1]
	],
	[
		[0, 1, 0],
		[1, 1, 1]
	],
	[
		[1, 0, 0],
		[1, 1, 1]
	],
	[
		[0, 0, 1],
		[1, 1, 1]
	],
	[
		[0, 1, 1],
		[1, 1, 0]
	],
	[
		[1, 1, 0],
		[0, 1, 1]
	]
];

/**
 *
 *	PAS TOUCHE
 *
 */

export const REAL_WIDTH = CELL_SIZE * WIDTH;
export const REAL_HEIGHT = CELL_SIZE * HEIGHT;

export type Cell = number;
