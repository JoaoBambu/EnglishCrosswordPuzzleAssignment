import db from '../database/db.database.js';

import type { InsertWebBrowserSession, SelectWebBrowserSession, UpdateWebBrowserSession, DeleteWebBrowserSession } from '../types/web-browser-sessions.type.js';
import { addQueryParam, addQueryParamIfPresent } from '../utils/sql-builder.utils.js';

export function insertWebBrowserSession(data: InsertWebBrowserSession) {
  const statement = db.prepare(`
    INSERT INTO web_browser_sessions (
      public_id,

      token,
      session_status,

      expires_at,
    ) VALUES (?, ?, ?, ?, ?, ?)
  `);

  const result = statement.run(
    data.public_id,

    data.token,
    data.session_status,

    data.expires_at
  );

  return selectWebBrowserSessionById(result.lastInsertRowid as number);
}

export function selectWebBrowserSessionById(id: number) {
  const statement = db.prepare(`
    SELECT * FROM web_browser_sessions
    WHERE id = ?
  `);

  const result = statement.get(id) as SelectWebBrowserSession;
  
  return result ?? null;
}

export function updadeWebBrowserSession(data: UpdateWebBrowserSession) {
  const fields: string[] = [];
  const values: unknown[] = [];

  addQueryParamIfPresent(fields, values, "session_status", data.session_status);
  addQueryParamIfPresent(fields, values, "expires_at", data.expires_at);

  const statement = db.prepare(`
    UPDATE web_browser_sessions
    SET ${fields.join(",")}
    WHERE id = ?
  `);

  const result = statement.run(
    ...values,
    data.id
  );
  
  return selectWebBrowserSessionById(data.id);
}

export function deleteWebBrowserSession(id: number) {
  const statement = db.prepare(`
    DELETE FROM web_browser_sessions
    WHERE id = ?
  `);

  const result = statement.run(
    id
  );
  
  return result.changes > 0;
}