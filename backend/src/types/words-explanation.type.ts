export interface InsertWordExplanation {
  public_id: string;

  word_id: number;
  word_explanation: string;
  word_origin: string;
};

export interface SelectWordExplanation {
  id: number;
  public_id: string;

  word_id: number;
  word_explanation: string;
  word_origin: string;
};

export interface UpdateWordExplanation {
  id: number;

  word_id: number;
  word_explanation: string;
  word_origin: string;
};

export interface DeleteWordExplanation {
  id: number;
};