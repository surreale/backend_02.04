const mysql = require('mysql2/promise');

// Connection pool létrehozása
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',       // adatbázis felhasználónév
  password: 'root',       // adatbázis jelszó
  database: 'ora', // Az adatbázis neve
  waitForConnections: true,
  connectionLimit: 10, // Max. 10 egyidejű kapcsolat
  queueLimit: 0 //korlátlan várakozási sor
});

// Összes adat lekérése egy adott táblából
async function getAllData() {
  try {
    const [rows] = await pool.execute("SELECT * FROM marka");
    return rows;
  } catch (error) {
    console.error("Hiba a getAllData() futtatása közben:", error);
    throw error;
  }
}

async function getFilterData(limit, offset) {
    try {
      const sql = `SELECT * FROM marka LIMIT ? OFFSET ?`;
      const [rows] = await pool.query(sql, [limit, offset]);
      return rows;
    } catch (error) {
      console.error("Hiba a getAllDatalimit() futtatása közben:", error);
      throw error;
    }
  }

  async function getDataById(id) {
    try {
      const [rows] = await pool.execute("SELECT * FROM marka where markaaz= ?", [id]);
      return rows[0];
    } catch (error) {
      console.error("Hiba a getDataByid() futtatása közben:", error);
      throw error;
    }
  }

  //szűrő
  async function getFilterrData(filters){
    let sql = "SELECT * FROM oralekerdezes";

    const conditions = [];
    const values = [];

    if(filters.marka){
      conditions.push("marka = ?");
      values.push(filters.marka);
    }
    if(filters.tipus){
      conditions.push("tipus = ?");
      values.push(filters.tipus);
    }
    if(filters.szijszine){
      conditions.push("szijszine = ?");
      values.push(filters.szijszine);
    }
    if(conditions.length > 0){
      sql += " WHERE " + conditions.join(" AND ");
    }
    console.log("sql:", sql);

    try{
      const [rows] = await pool.query(sql, values);
      return rows;
    }
    catch(error){
      console.error("Hiba a getFilterrData() futtatása közben:", error);
      throw error;
    }
  }
  

module.exports = {
  getAllData,
  getFilterData,
  getDataById,
  getFilterrData
};
