import { pool } from "../db.js";

export async function selectAllTheme()
{
    const query = `SELECT
                theme.l_left,
                theme.l_right,
                theme.s_left,
                theme.s_right,
                theme.t,
                theme.square,
                theme.rod
                FROM theme`;
    return await pool.query(query);  
}

export async function selectThemeById(id_theme:any) 
{
    const query = `SELECT
                theme.l_left,
                theme.l_right,
                theme.s_left,
                theme.s_right,
                theme.t,
                theme.square,
                theme.rod
                FROM theme
                WHERE theme.id_theme=$1`;
    return await pool.query(query, [id_theme]);    
}