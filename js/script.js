/* hidding spinner at begining */
document.getElementById("loading-spinner").style.display = "none";

const showCategories = () => {
  /* fetching data from url  */
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayCategories(data);
    })
    .catch((error) => console.log(error));
};

showCategories();

const displayCategories = (categories) => {
  const allCategory = categories.data.news_category;

  /* for each loop to load all books */
  allCategory.forEach((category) => {
    /* calling load books function to load all books */
    loadCategories(category);
  });
};