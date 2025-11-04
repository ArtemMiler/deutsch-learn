type GermanWordBase = {
    id: number;
    german_word: string;
    translation: string;
    image?: string;
    hard_level: number;
  };
  
  type VerbWord = GermanWordBase & {
    is_verb: true;
    second_verb: string;
    third_verb: string;
  };
  
  type NonVerbWord = GermanWordBase & {
    is_verb: false;
    second_verb?: never;
    third_verb?: never;
  };
  
  export type GermanWord = VerbWord | NonVerbWord;