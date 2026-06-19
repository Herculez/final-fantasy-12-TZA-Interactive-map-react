import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const db = new Database(path.join(__dirname, './database.db'));

export default db;