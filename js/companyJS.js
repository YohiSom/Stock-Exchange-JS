const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const symbol = urlParams.get("symbol");
const compURL =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/";

const spinner = document.querySelector("#spinner");
function fetchCompanyUrl() {
  fetch(
    `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`
  )
    .then((response) => response.json())
    .then((data) => {
      const companyShow = document.getElementById("company");
      companyShow.style.fontWeight = "bold";
      const companyDes = document.getElementById("description");
      const companyNa = data.profile.companyName;
      const companyWebsite = data.profile.website;
      const companyDe = data.profile.description;
      const companyIndus = data.profile.industry;
      const companyLogo = data.profile.image;
      const companyPrice = data.profile.price;
      const companyPercent = data.profile.changesPercentage;
      const price = document.getElementById("price");
      const percent = document.getElementById("percent");
      price.innerText = `$ ${companyPrice}`;

      if (companyPercent < 0) {
        percent.innerText = `${companyPercent}%`;
        percent.style.color = "red";
      } else {
        percent.innerText = `${companyPercent}%`;
        percent.style.color = "green";
      }

      companyShow.innerHTML = `<img src="${companyLogo}" width="20" height="20" src="invalid_link" onerror="this.onerror=null;this.src='https://placeimg.com/200/300/animals';"> <a target="_blank" href="${companyWebsite}">${companyNa} (${companyIndus})</a>`;

      companyDes.innerText = companyDe;
    });
}
fetchCompanyUrl();

function fetchHistory() {
  displaySpinner();
  fetch(
    `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`
  )
    .then((response) => response.json())
    .then((data) => {
      hideSpinner();
      const history = data.historical;

      const labels = history.map((item) => item.date);

      const close = history.map((item) => item.close);

      const ctx = document.getElementById("myChart").getContext("2d");

      const dataChart = {
        labels: labels,
        datasets: [
          {
            label: "Stock Price History",
            data: close,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      };
      const myChart = new Chart(ctx, {
        type: "line",
        data: dataChart,
      });
    });
}
fetchHistory();

function displaySpinner() {
  const spinner = document.querySelector("#spinner");
  spinner.classList.add("display");
  setTimeout(() => {
    spinner.classList.remove("display");
  }, 9000);
}

function hideSpinner() {
  const spinner = document.querySelector("#spinner");
  spinner.classList.remove("display");
}
