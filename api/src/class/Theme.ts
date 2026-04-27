export class Theme{
    id_theme:number;
    theme_directory:string;

    constructor(id_theme:number, theme_directory:string)
    {
        this.id_theme = id_theme;
        this.theme_directory = theme_directory;
    }
}