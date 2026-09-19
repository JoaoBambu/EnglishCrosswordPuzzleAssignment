export interface InsertCrosswordsWords {
  public_id: string;

  crossword_id: number;
  word_id: number;

  word_column: number;
  word_line: number;
  word_direction: number;
};

export interface SelectCrosswordsWords {
  id: number;
  public_id: string;

  crossword_id: number;
  word_id: number;

  word_column: number;
  word_line: number;
  word_direction: number;
};

export interface UpdateCrosswordsWords {
  id: number;

  crossword_id: number;
  word_id: number;

  word_column: number;
  word_line: number;
  word_direction: number;
};

export interface DeleteCrosswordsWords {
  id: number;
};
