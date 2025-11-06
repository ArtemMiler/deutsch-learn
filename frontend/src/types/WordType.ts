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
    is_plural: false;
    plural?: never;
  };
  
  type PluralWord = GermanWordBase & {
    is_verb: false;
    second_verb?: never;
    third_verb?: never;
    is_plural: true;
    plural: string;
  };
  
  type RegularWord = GermanWordBase & {
    is_verb: false;
    second_verb?: never;
    third_verb?: never;
    is_plural: false;
    plural?: never;
  };
  
  export type GermanWord = VerbWord | PluralWord | RegularWord;