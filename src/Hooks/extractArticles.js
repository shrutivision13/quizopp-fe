export const extractArticles = (articlesData) => {
  if (!Array.isArray(articlesData)) return [];

  if (articlesData.length && articlesData[0]?.articles) {
    // Type 1: Grouped by category
    return articlesData.flatMap(group => 
      group.articles.map(article => ({
        ...article,
        categoryName: group.categoryName, // inject category name
      }))
    );
  } else {
    // Type 2: Flat list with category inside each article
    return articlesData.map(article => ({
      ...article,
      categoryName: article?.categoryId?.categoryName || "",
    }));
  }
};