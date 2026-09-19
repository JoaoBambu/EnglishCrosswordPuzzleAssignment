import db from '../database/db.database.js';

import type { InsertCrosswords, SelectCrosswords, UpdateCrosswords, DeleteCrosswords } from '../types/crosswords.type.js';
import { addQueryParam, addQueryParamIfPresent } from '../utils/sql-builder.utils.js';

export function insertCrosswords(data: InsertCrosswords) {
  const statement = db.prepare(`
    INSERT INTO crosswords (
      public_id,

      crossword_title,
      crossword_description,

      crossword_grid,
      crossword_solution
    ) VALUES (?, ?, ?, ?, ?)
  `);

  const result = statement.run(
    data.public_id,

    data.crossword_title,
    data.crossword_description,

    data.crossword_grid,
    data.crossword_solution
  );

  return selectCrosswordsById(result.lastInsertRowid as number);
}

export function selectCrosswordsById(id: number) {
  const statement = db.prepare(`
    SELECT * FROM crosswords
    WHERE id = ?
  `);

  const result = statement.get(id) as SelectCrosswords;
  
  return result ?? null;
}

export function updadeCrosswords(data: UpdateCrosswords) {
  const fields: string[] = [];
  const values: unknown[] = [];

  addQueryParamIfPresent(fields, values, "crossword_id", data.crossword_title);
  addQueryParamIfPresent(fields, values, "word_id", data.crossword_description);
  addQueryParamIfPresent(fields, values, "word_column", data.crossword_grid );
  addQueryParamIfPresent(fields, values, "word_line", data.crossword_solution);

  const statement = db.prepare(`
    UPDATE crosswords
    SET ${fields.join(",")}
    WHERE id = ?
  `);

  const result = statement.run(
    ...values,
    data.id
  );
  
  return selectCrosswordsById(data.id);
}

export function deleteCrosswords(id: number) {
  const statement = db.prepare(`
    DELETE FROM crosswords
    WHERE id = ?
  `);

  const result = statement.run(
    id
  );
  
  return result.changes > 0;
}