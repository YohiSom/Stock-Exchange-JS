class Marquee {
  constructor(element) {
    this.marqueebox = element;
  }

  async result() {
    const url = await fetch(
      "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nyse/?limit=10"
    );
    const data = await url.json();

    this.priceList(data);
  }

  priceList(data) {
    let show = "";
    data.slice(0, 14).forEach((priceData) => {
      const marqueeHtml = `<span>${priceData.symbol}</span>
            <span class="price-amount">$${priceData.price}</span>`;

      show += marqueeHtml;
    });
    this.marqueebox.innerHTML = show;
  }
}

