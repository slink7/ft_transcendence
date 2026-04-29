import { pool } from "../db.js";

export async function getAllTheme()
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

export async function getTheme(id_theme:number) 
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