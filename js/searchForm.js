class Form {
  constructor(element) {
    this.searchFormContainer = element;
  }

  searchForm(renderResults) {
    const form = `<div class="input"> <input class="input-q" id="input-query" type="text"> <button id="nas-button" class="button" >Search</button></div><div  id="loader"></div>`;
    this.searchFormContainer.innerHTML = form;

    const input = document.querySelector(".input-q");
    const button = document.querySelector(".button");

    button.addEventListener("click", (e) => {
      e.preventDefault();
      renderResults(input.value);
    });
  }
}


