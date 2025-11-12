import mysql from 'mysql2/promise';
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'practicaN2-web3'
});

export default pool;