import db from '../database/db.database.js';

import type { InsertWebBrowserSessionData, SelectWebBrowserSessionData, UpdateWebBrowserSessionData, DeleteWebBrowserSessionData } from '../types/web-browser-sessions-data.type.js';
import { addQueryParam, addQueryParamIfPresent } from '../utils/sql-builder.utils.js';


export function insertWebBrowserSessionData(data: InsertWebBrowserSessionData) {
  const statement = db.prepare(`
    INSERT INTO web_browser_sessions_data (
      public_id,

      web_browser_sessions_data_id,
      session_name,
      acumuled_points
    ) VALUES (?, ?, ?, ?, ?, ?)
  `);

  const result = statement.run(
    data.public_id,

    data.web_browser_sessions_id,
    data.acumuled_points,
    data.session_name
  );

  return selectWebBrowserSessionDataById(result.lastInsertRowid as number);
}

export function selectWebBrowserSessionDataById(id: number) {
  const statement = db.prepare(`
    SELECT * FROM web_browser_sessions_data
    WHERE id = ?
  `);

  const result = statement.get(id) as SelectWebBrowserSessionData;
  
  return result ?? null;
}

export function updadeWebBrowserSessionData(data: UpdateWebBrowserSessionData) {
  const fields: string[] = [];
  const values: unknown[] = [];

  addQueryParamIfPresent(fields, values, "web_browser_sessions_id", data.web_browser_sessions_id);
  addQueryParamIfPresent(fields, values, "session_name", data.session_name);
  addQueryParamIfPresent(fields, values, "acumuled_points", data.acumuled_points);

  const statement = db.prepare(`
    UPDATE web_browser_sessions_data
    SET ${fields.join(",")}
    WHERE id = ?
  `);

  const result = statement.run(
    ...values,
    data.id
  );
  
  return selectWebBrowserSessionDataById(data.id);
}

export function deleteWebBrowserSessionData(id: number) {
  const statement = db.prepare(`
    DELETE FROM web_browser_sessions_data
    WHERE id = ?
  `);

  const result = statement.run(
    id
  );
  
  return result.changes > 0;
}