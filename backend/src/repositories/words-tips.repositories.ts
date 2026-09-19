import db from '../database/db.database.js';

import type { InsertWordTip, SelectWordTip, UpdateWordTip, DeleteWordTip } from '../types/words-tips.type.js';
import { addQueryParam, addQueryParamIfPresent } from '../utils/sql-builder.utils.js';

export function insertWordTip(data: InsertWordTip) {
  const statement = db.prepare(`
    INSERT INTO words_tips (
      public_id,

      word_id,
      word_tip
    ) VALUES (?, ?, ?)
  `);

  const result = statement.run(
    data.public_id,

    data.word_id,
    data.word_tip
  );

  return selectWordTipById(result.lastInsertRowid as number);
}

export function selectWordTipById(id: number) {
  const statement = db.prepare(`
    SELECT * FROM words_tips
    WHERE id = ?
  `);

  const result = statement.get(id) as SelectWordTip;
  
  return result ?? null;
}

export function updadeWordTip(data: UpdateWordTip) {
  const fields: string[] = [];
  const values: unknown[] = [];

  addQueryParamIfPresent(fields, values, "word_id", data.word_id);
  addQueryParamIfPresent(fields, values, "word_tip", data.word_tip);

  const statement = db.prepare(`
    UPDATE words_tips
    SET ${fields.join(",")}
    WHERE id = ?
  `);

  const result = statement.run(
    ...values,
    data.id
  );
  
  return selectWordTipById(data.id);
}

export function deleteWordTip(id: number) {
  const statement = db.prepare(`
    DELETE FROM words_tips
    WHERE id = ?
  `);

  const result = statement.run(
    id
  );
  
  return result.changes > 0;
}



