const nasdaqUrl =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=";
const inputQ = document.getElementById("input-query");
const nasLimit = "&limit=10&exchange=NASDAQ";
function stockEx() {
  displayLoading();
  fetch(nasdaqUrl + inputQ.value + nasLimit, {
    method: "GET",
    headers: { "x-Auth-Token": "0f1a7c8bc38b968403e38e3990bf8d66" },
  })
    .then((response) => response.json())
    .then((data) => {
      hideLoading();
      nasdaqList(data);
    });
}

function nasdaqList(nasReport) {
  nasReport.forEach((item) => {
    const li = document.createElement("li");
    li.style.listStyleType = "none";
    const nasdaqList = document.getElementById("nasdaq-list");
    nasdaqList.appendChild(li);
    const nameSymbol = item.symbol;

    fetch(
      `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${nameSymbol}`
    )
      .then((response) => response.json())
      .then((info) => {
        const companyLogo = info.profile.image;

        const companyCaps = info.symbol;
        const companyPer = info.profile.changesPercentage;

        if (companyPer < 0) {
          li.innerHTML = `<a target="_blank" href="company.html?symbol=${item.symbol}"><img src="${companyLogo}" width="20" height="20" src="invalid_link" onerror="this.onerror=null;this.src='https://placeimg.com/200/300/animals';"> ${item.name} (${companyCaps}) <div class="company-perc">${companyPer}%</div></a>`;
        } else {
          li.innerHTML = `<a target="_blank" href="company.html?symbol=${item.symbol}"><img src="${companyLogo}" width="20" height="20" src="invalid_link" onerror="this.onerror=null;this.src='https://placeimg.com/200/300/animals';"> ${item.name} (${companyCaps}) <div class="company-percgreen">${companyPer}%</div></a>`;
        }
      })
      .catch((err) => console.log(err));
  });
}

const loader = document.querySelector("#loader");

function nasEvent() {
  const btnNas = document.getElementById("nas-button");
  btnNas.addEventListener("click", stockEx);
}
nasEvent();

function displayLoading() {
  loader.classList.add("display");
  setTimeout(() => {
    loader.classList.remove("display");
  }, 5000);
}

function hideLoading() {
  loader.classList.remove("display");
}

function animeStockPrice() {
  fetch(
    "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nyse/?limit=10"
  )
    .then((response) => response.json())
    .then((price) => {
      priceList(price);
    });
}

animeStockPrice();

function priceList(priceReport) {
  priceReport.forEach((priceData) => {
    const priceLists = document.getElementById("price-list");
    const priceSymbol = document.createElement("span");
    const priceAmount = document.createElement("span");
    priceSymbol.innerText = `${priceData.symbol}`;
    priceAmount.innerText = `$${priceData.price}`;
    priceSymbol.className = "price-symbol";
    priceAmount.className = "price-amount";
    priceLists.append(priceSymbol);
    priceLists.append(priceAmount);
  });
}
