class Result {
  constructor(el) {
    this.list = el;
  }

  renderResults(userInput) {
    this.onLoad(userInput);
  }

  onLoad(searchTerm) {
    const nasdaqUrl =
      "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=";

    const nasLimit = "&limit=10&exchange=NASDAQ";

    fetch(nasdaqUrl + searchTerm + nasLimit, {
      method: "GET",
      headers: { "x-Auth-Token": "0f1a7c8bc38b968403e38e3990bf8d66" },
    })
      .then((response) => response.json())
      .then((data) => {
        
        if (!data.length){const message = "no match found";
        let title = document.getElementById("title");
        title.innerHTML=`${message}`;
        title.style.color = '#E83A14'
      }

        else {this.onLoadSymbols(data); title.innerHTML = "Search Nasdaq Stocks"; title.style.color = '#141E27'}
        
      });
  }

  onLoadSymbols(nasReport) {

const li = document.createElement("li");
    while(this.list.firstChild) {
this.list.removeChild(this.list.lastChild);
    }

    nasReport.forEach((item) => {
      
      li.style.listStyleType = "none";
      const nameSymbol = item.symbol;
      const regexp = /\bnameSymbol\b/;
      const newNameSymbol = nameSymbol.replace(regexp);
      const companyName = item.name;
      const regexc = /\bcompanyName\b/;
      const newCompanyName = companyName.replace(regexc);
     


      fetch(
        `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${nameSymbol}`
      )
        .then((response) => response.json())
        .then((info) => {
          const companyLogo = info.profile.image;
          const li = document.createElement("li");
          const companyCaps = info.symbol;
          const companyPer = info.profile.changesPercentage;
          
          if (companyPer < 0) {
            li.innerHTML = `<a target="_blank" href="company.html?symbol=${item.symbol}"><img src="${companyLogo}" width="20" height="20" src="invalid_link" onerror="this.onerror=null;this.src='https://placeimg.com/200/300/animals';"><span class=new-symbol>(${newCompanyName})</span><span class=new-symbol>(${newNameSymbol})</span><span class="company-perc">${companyPer}%</span></a>`;
          } else {
            li.innerHTML = `<a target="_blank" href="company.html?symbol=${item.symbol}"><img src="${companyLogo}" width="20" height="20" src="invalid_link" onerror="this.onerror=null;this.src='https://placeimg.com/200/300/animals';"><span class=new-symbol>(${newCompanyName})</span><span class=new-symbol>(${newNameSymbol})</span><span class="company-percgreen">${companyPer}%</span></a>`;
          }
          
          this.list.appendChild(li);
        });
    });
  }
}
