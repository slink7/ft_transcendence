export class Theme {
    L_left: string;
    L_right: string;
    S_left: string;
    S_right: string;
    T: string;
    square: string;
    rod: string;

    constructor(L_left:string, L_right:string, S_left:string, S_right:string, T:string, square:string, rod:string) {
        this.L_left = L_left;
        this.L_right = L_right;
        this.S_left = S_left;
        this.S_right = S_right;
        this.T = T;
        this.square = square;
        this.rod = rod;
    }
}

export function parseTheme(result:any)
{
    return new Theme(result.l_left, result.l_right, result.s_left, result.s_right, result.t, result.square, result.rod);
}