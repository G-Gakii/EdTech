interface comment {
  comment: string;
  created_at: string;
  id: number;
  student: string;
  thumbs_down: number;
  thumbs_up: number;

  updated_at: Date;
}

interface Answer {
  answer: string;
  comment: comment[];
  created_at: string;
  id: number;
  student: string;
  thumbs_down: number;
  thumbs_up: number;
  updated_at: string;
}
export interface Question {
  created_at: string;
  description: null | string;
  id: number;
  question: "What is django?";
  student: string;
  subject: string;
  updated_at: string;
  comment: comment[];
  answer: Answer[];
}

export interface QuestionPOsted {
  question: string;
  subject: string;
  description?: string;
}
