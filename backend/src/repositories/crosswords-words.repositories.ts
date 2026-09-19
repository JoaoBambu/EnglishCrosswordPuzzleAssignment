import db from '../database/db.database.js';

import type { InsertCrosswordsWords, SelectCrosswordsWords, UpdateCrosswordsWords, DeleteCrosswordsWords } from '../types/crosswords-words.type.js';
import { addQueryParam, addQueryParamIfPresent } from '../utils/sql-builder.utils.js';

export function insertCrosswordsWords(data: InsertCrosswordsWords) {
  const statement = db.prepare(`
    INSERT INTO crosswords_words (
      public_id,

      crossword_id,
      word_id,

      word_column,
      word_line,
      word_direction
    ) VALUES (?, ?, ?, ?, ?, ?)
  `);

  const result = statement.run(
    data.public_id,

    data.crossword_id,
    data.word_id,

    data.word_column,
    data.word_line,
    data.word_direction
  );

  return selectCrosswordsWordsById(result.lastInsertRowid as number);
}

export function selectCrosswordsWordsById(id: number) {
  const statement = db.prepare(`
    SELECT * FROM crosswords_words
    WHERE id = ?
  `);

  const result = statement.get(id) as SelectCrosswordsWords;
  
  return result ?? null;
}

export function updadeCrosswordsWords(data: UpdateCrosswordsWords) {
  const fields: string[] = [];
  const values: unknown[] = [];

  addQueryParamIfPresent(fields, values, "crossword_id", data.crossword_id);
  addQueryParamIfPresent(fields, values, "word_id", data.word_id);
  addQueryParamIfPresent(fields, values, "word_column", data.word_column);
  addQueryParamIfPresent(fields, values, "word_line", data.word_line);
  addQueryParamIfPresent(fields, values, "word_direction", data.word_direction);

  const statement = db.prepare(`
    UPDATE crosswords_words
    SET ${fields.join(",")}
    WHERE id = ?
  `);

  const result = statement.run(
    ...values,
    data.id
  );
  
  return selectCrosswordsWordsById(data.id);
}

export function deleteCrosswordsWords(id: number) {
  const statement = db.prepare(`
    DELETE FROM crosswords_words
    WHERE id = ?
  `);

  const result = statement.run(
    id
  );
  
  return result.changes > 0;
}