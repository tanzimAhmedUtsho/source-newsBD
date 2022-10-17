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

const loadCategories = (category) => {
  /* create new div to set book data */
  const div = document.createElement("div");
  const showBookContainer = document.getElementById("show-category");

  /* adding inner html to new div */
  div.innerHTML = `
      <div class="mt-2">
          <button class="border-0 bg-transparent" onclick="showNews(${category.category_id})">
          ${category.category_name}
          </button>
      </div>
  `;

  /* append created div */
  showBookContainer.appendChild(div);
  /* hiding spinner after loading data */
  document.getElementById("loading-spinner").style.display = "none";
};

const showResultOrErrorMessage = (message) => {
  /* spinner before loading data  */
  document.getElementById("loading-spinner").style.display = "block";
  document.getElementById("total-book-or-error-message").textContent = "";
  const numberOfResultShowing = document.getElementById(
    "total-book-or-error-message"
  );

  /* create new div  */
  const newDiv = document.createElement("div");

  /* setting innerHTML inside created div */
  newDiv.innerHTML = `
          <h4 class="text-danger text-center">${message}</h4>
      `;

  /* appending created div  */
  numberOfResultShowing.appendChild(newDiv);

  /* hiding spinner */
  document.getElementById("loading-spinner").style.display = "none";
};

const showNews = (id) => {
  document.getElementById("loading-spinner").style.display = "block";
  document.getElementById("show-news").textContent = "";
  const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayNews(data);
    });
};

const displayNews = (news) => {
  const allNews = news.data.sort((a,b) => {return b.total_view-a.total_view});
  if (allNews.length === 0) {
    showResultOrErrorMessage("Sorry!!!!! No result Found");
  } else {
    showResultOrErrorMessage(
      `Showing ${allNews.length} of ${allNews.length} Result`
    );
  }

  /* for each loop to load all books */
  allNews.forEach((book) => {
    /* calling load books function to load all books */
    loadNews(book);
  });
};

const loadNews = (category) => {
  console.log(category);
  /* create new div to set book data */
  const div = document.createElement("div");
  const showBookContainer = document.getElementById("show-news");
  div.classList.add("col");

  /* adding inner html to new div */
  div.innerHTML = `
  <div class="card h-100 shadow" >
  <div class="row g-0">
    <div class="col-md-4 d-flex align-items-center">
    <img src="${
      category.thumbnail_url
    }" height="350px" class="card-img-top p-2" alt="...">
    </div>
    <div class="col-md-8">
    <div class="card-body">
    <h5 class="card-title">${category.title}</h5>
    <ul class="list-group list-group-flush">
        <li class="list-group-item d-flex align-items-center"><span class="fw-bold">Author : </span>
        <div class="d-flex">
          <div>
          <img src="${
            category.author.img
          }" height="60px" class="card-img-top p-2 rounded-circle" alt="...">
          </div>
          <div>
          <span>${category.author.name || "No result found"}</span> <br/>
          <span>${category.author.published_date || "No result found"}</span>
          </div>
        </div>
        
        </li>
        <li class="list-group-item"><span class="fw-bold">Details : </span>${
          category.details.slice(0, 100) + "..."
        }</li>
        <li class="list-group-item"><span class="fw-bold">Rating : </span>${
          category.rating.number
        }</li>
        <li class="list-group-item"><span class="fw-bold">Badge : </span>${
          category.rating.badge
        }</li>
        <li class="list-group-item"><span class="fw-bold">Total View :  </span>${
          category.total_view
        }</li>
    </ul>
</div>
  </div>
  
  
</div>
  `;

  /* append created div */
  showBookContainer.appendChild(div);
  /* hiding spinner after loading data */
  document.getElementById("loading-spinner").style.display = "none";
};
