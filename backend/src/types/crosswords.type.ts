export interface InsertCrosswords {
  public_id: string;

  crossword_title: string;
  crossword_description: string;

  crossword_grid: string;
  crossword_solution: string;
};

export interface SelectCrosswords {
  id: number;
  public_id: string;

  crossword_title: string;
  crossword_description: string;

  crossword_grid: string;
  crossword_solution: string;
};

export interface UpdateCrosswords {
  id: number;

  crossword_title: string;
  crossword_description: string;

  crossword_grid: string;
  crossword_solution: string;
};

export interface DeleteCrosswords {
  id: number;
};
