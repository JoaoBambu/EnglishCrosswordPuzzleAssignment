import db from '../database/db.database.js';

import type { InsertWordExplanation, SelectWordExplanation, UpdateWordExplanation, DeleteWordExplanation } from '../types/words-explanation.type.js';
import { addQueryParam, addQueryParamIfPresent } from '../utils/sql-builder.utils.js';

export function insertWordExplanation(data: InsertWordExplanation) {
  const statement = db.prepare(`
    INSERT INTO words_explanation (
      public_id,

      word_id,
      word_explanation,
      word_origin
    ) VALUES (?, ?, ?, ?)
  `);

  const result = statement.run(
    data.public_id,

    data.word_id,
    data.word_explanation,
    data.word_origin
  );

  return selectWordExplanationById(result.lastInsertRowid as number);
}

export function selectWordExplanationById(id: number) {
  const statement = db.prepare(`
    SELECT * FROM words_explanation
    WHERE id = ?
  `);

  const result = statement.get(id) as SelectWordExplanation;
  
  return result ?? null;
}

export function updadeWordExplanation(data: UpdateWordExplanation) {
  const fields: string[] = [];
  const values: unknown[] = [];

  addQueryParamIfPresent(fields, values, "word_id", data.word_id);
  addQueryParamIfPresent(fields, values, "word_explanation", data.word_explanation);
  addQueryParamIfPresent(fields, values, "word_origin", data.word_origin);

  const statement = db.prepare(`
    UPDATE words_explanation
    SET ${fields.join(",")}
    WHERE id = ?
  `);

  const result = statement.run(
    ...values,
    data.id
  );
  
  return selectWordExplanationById(data.id);
}

export function deleteWordExplanation(id: number) {
  const statement = db.prepare(`
    DELETE FROM words_explanation
    WHERE id = ?
  `);

  const result = statement.run(
    id
  );
  
  return result.changes > 0;
}