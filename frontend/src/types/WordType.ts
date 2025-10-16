type WordBase = {
    word: string;
    translation: string;
    image?: string;
    hard_level: number;
  };
  
  type VerbWord = WordBase & {
    is_verb: true;
    second_verb: string;
    third_verb: string;
  };
  
  type NonVerbWord = WordBase & {
    is_verb: false;
    second_verb?: never;
    third_verb?: never;
  };
  
  export type Word = VerbWord | NonVerbWord;