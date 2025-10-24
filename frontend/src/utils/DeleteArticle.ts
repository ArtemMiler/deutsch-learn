export const removeArticle = (germanWord: string): string => {
  const articles = ['der ', 'die ', 'das '];
  for (const article of articles) {
    if (germanWord.toLowerCase().startsWith(article)) {
      return germanWord.slice(article.length);
    }
  }
  return germanWord;
};

