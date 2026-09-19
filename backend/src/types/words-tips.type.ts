export interface InsertWordTip {
  public_id: string;

  word_id: number;
  word_tip: string;
};

export interface SelectWordTip {
  id: number;
  public_id: string;

  word_id: number;
  word_tip: string;
};

export interface UpdateWordTip {
  id: number;

  word_id: number;
  word_tip: string;
};

export interface DeleteWordTip {
  id: number;
};