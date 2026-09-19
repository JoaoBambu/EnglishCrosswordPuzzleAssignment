export interface InsertWord {
  public_id: string;

  word: string;
  difficult_level: "easy" | "median" | "hard";
};

export interface SelectWord {
  id: number;
  public_id: string;

  word: string;
  difficult_level: "easy" | "median" | "hard";
};

export interface UpdateWord {
  id: number;
  
  word: string;
  difficult_level: "easy" | "median" | "hard";
};

export interface DeleteWord {
  id: number;
};



