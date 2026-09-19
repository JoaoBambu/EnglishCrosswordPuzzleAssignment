import db from '../database/db.database.js';

import type { InsertWord, SelectWord, UpdateWord, DeleteWord } from '../types/words.type.js';
import { addQueryParam, addQueryParamIfPresent } from '../utils/sql-builder.utils.js';

export function insertWord(data: InsertWord) {
  const statement = db.prepare(`
    INSERT INTO words (
      public_id,

      word,
      difficult_level
    ) VALUES (?, ?, ?)
  `);

  const result = statement.run(
    data.public_id,

    data.word,
    data.difficult_level
  );

  return selectWordById(result.lastInsertRowid as number);
}

export function selectWordById(id: number) {
  const statement = db.prepare(`
    SELECT * FROM words
    WHERE id = ?
  `);

  const result = statement.get(id) as SelectWord;
  
  return result ?? null;
}

export function updadeWord(data: UpdateWord) {
  const fields: string[] = [];
  const values: unknown[] = [];

  addQueryParamIfPresent(fields, values, "word", data.word);
  addQueryParamIfPresent(fields, values, "difficult_level", data.difficult_level);

  const statement = db.prepare(`
    UPDATE words
    SET ${fields.join(",")}
    WHERE id = ?
  `);

  const result = statement.run(
    ...values,
    data.id
  );
  
  return selectWordById(data.id);
}

export function deleteWord(id: number) {
  const statement = db.prepare(`
    DELETE FROM words
    WHERE id = ?
  `);

  const result = statement.run(
    id
  );
  
  return result.changes > 0;
}



