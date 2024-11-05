import { html } from "../lib.js";
import { fetchLocale } from "../i18n/fetch-locale.js";
import { homeViewTemplate } from "../templates/home-view-template.js";
import { homeViewParallaxSectionTemplate } from "../templates/home-view-parallax-section-template.js";
import { homeViewHistoricalFigureCardTemplate } from "../templates/home-view-historical-figure-card-template.js";
const mockData = {
  results: [
    {
      objectId: "1",
      name_bg: "Hristo Botev1",
      hrefInfo: "https://www.wikipedia.org/",
      hrefImg:
        "https://res.cloudinary.com/dmm0gmxdr/image/upload/v1729016464/First-Class-Bg-School/home/historical-figures/hristo-botev_jjpusp.png",
    },
    {
      objectId: "2",
      name_bg: "Hristo Botev2",
      hrefInfo: "https://www.wikipedia.org/",
      hrefImg:
        "https://res.cloudinary.com/dmm0gmxdr/image/upload/v1729016464/First-Class-Bg-School/home/historical-figures/hristo-botev_jjpusp.png",
    },
    {
      objectId: "3",
      name_bg: "Hristo Botev3",
      hrefInfo: "https://www.wikipedia.org/",
      hrefImg:
        "https://res.cloudinary.com/dmm0gmxdr/image/upload/v1729016464/First-Class-Bg-School/home/historical-figures/hristo-botev_jjpusp.png",
    },
    {
      objectId: "4",
      name_bg: "Hristo Botev4",
      hrefInfo: "https://www.wikipedia.org/",
      hrefImg:
        "https://res.cloudinary.com/dmm0gmxdr/image/upload/v1729016464/First-Class-Bg-School/home/historical-figures/hristo-botev_jjpusp.png",
    },
    {
      objectId: "5",
      name_bg: "Hristo Botev5",
      hrefInfo: "https://www.wikipedia.org/",
      hrefImg:
        "https://res.cloudinary.com/dmm0gmxdr/image/upload/v1729016464/First-Class-Bg-School/home/historical-figures/hristo-botev_jjpusp.png",
    },
    {
      objectId: "6",
      name_bg: "Hristo Botev6",
      hrefInfo: "https://www.wikipedia.org/",
      hrefImg:
        "https://res.cloudinary.com/dmm0gmxdr/image/upload/v1729016464/First-Class-Bg-School/home/historical-figures/hristo-botev_jjpusp.png",
    },
    {
      objectId: "7",
      name_bg: "Hristo Botev7",
      hrefInfo: "https://www.wikipedia.org/",
      hrefImg:
        "https://res.cloudinary.com/dmm0gmxdr/image/upload/v1729016464/First-Class-Bg-School/home/historical-figures/hristo-botev_jjpusp.png",
    },
    {
      objectId: "8",
      name_bg: "Hristo Botev8",
      hrefInfo: "https://www.wikipedia.org/",
      hrefImg:
        "https://res.cloudinary.com/dmm0gmxdr/image/upload/v1729016464/First-Class-Bg-School/home/historical-figures/hristo-botev_jjpusp.png",
    },
    {
      objectId: "9",
      name_bg: "Hristo Botev9",
      hrefInfo: "https://www.wikipedia.org/",
      hrefImg:
        "https://res.cloudinary.com/dmm0gmxdr/image/upload/v1729016464/First-Class-Bg-School/home/historical-figures/hristo-botev_jjpusp.png",
    },
    {
      objectId: "10",
      name_bg: "Hristo Botev10",
      hrefInfo: "https://www.wikipedia.org/",
      hrefImg:
        "https://res.cloudinary.com/dmm0gmxdr/image/upload/v1729016464/First-Class-Bg-School/home/historical-figures/hristo-botev_jjpusp.png",
    },
  ],
};
const initParallax = async () => {
  // Parallax Script
  const parallaxOverlay = document.getElementById("parallaxOverlay");
  const parallaxBackground = document.getElementById("parallax");
  const scrollDownSign = document.getElementById("scroll-down");
  const parallaxOverlayTitle = document.getElementById("parallaxOverlayTitle");
  const map = document.getElementById("map");
  const sun = document.getElementById("sun");
  const cloud1 = document.getElementById("cloud1");
  const cloud2 = document.getElementById("cloud2");
  const parallaxThemesData = await fetchLocale("parallax-themes-data");
  const targetElement = document.querySelector("html");
  const setParallaxImgLinks = () => {
    const currentTheme = targetElement.getAttribute("theme");
    if (currentTheme) {
      const elements = document.querySelectorAll("[dynamic-img]");
      elements.forEach(
        (el) => (el.src = parallaxThemesData[currentTheme][el.id]),
      );
    }
  };
  setParallaxImgLinks();
  const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.attributeName === "theme") {
        setParallaxImgLinks();
      }
    }
  });
  observer.observe(targetElement, {
    attributes: true,
    attributeFilter: ["theme"],
  });
  const mountainRight = document.getElementById("mountain-right");
  const mountainLeft = document.getElementById("mountain-left");
  const mountainCenter = document.getElementById("mountain-center");
  const landscape = document.getElementById("landscape");
  let hideScrollSign = false;
  const speed = {
    first: 0.8,
    second: 1.2,
    third: 1.4,
  };
  const historicalFigures = Array.from(
    parallaxOverlay.getElementsByClassName("historical-figure"),
  );
  const historicalFiguresMapper = historicalFigures.map((el) => ({
    el: el,
    elStartingOffsetTop: el.offsetTop,
    elStartingOffsetLeft: el.offsetLeft,
    elStartingOffsetWidth: el.offsetWidth,
    elPerantWidth: parallaxOverlay.offsetWidth,
    side: el.getAttribute("side"),
    row: el.getAttribute("row"),
  }));
  const currentBottomSun =
    parallaxBackground.offsetHeight - sun.offsetTop - sun.offsetHeight;
  const currentLefCloud1 = cloud1.offsetLeft;
  const currentLeftCloud2 = cloud2.offsetLeft;
  const currentBottomMap =
    parallaxOverlay.offsetHeight - map.offsetTop - map.offsetHeight;
  window.addEventListener("scroll", () => {
    let value = window.scrollY;
    hideScrollSign = value > 0 ? true : false;
    if (hideScrollSign) {
      scrollDownSign.style.display = "none";
      parallaxOverlayTitle.style.opacity = "0";
    } else {
      scrollDownSign.style.display = "block";
      parallaxOverlayTitle.style.opacity = "1";
    }
    sun.style.bottom = (value * 0.1 + currentBottomSun).toString() + "px";
    cloud1.style.left = (-value * 0.5 + currentLefCloud1).toString() + "px";
    cloud2.style.left = (value * 0.5 + currentLeftCloud2).toString() + "px";
    mountainRight.style.left = (value * 0.05).toString() + "px";
    mountainRight.style.bottom = (-value * 0.2).toString() + "px";
    mountainLeft.style.left = (-value * 0.04).toString() + "px";
    mountainLeft.style.bottom = (-value * 0.28).toString() + "px";
    mountainCenter.style.bottom = (-value * 0.25).toString() + "px";
    landscape.style.bottom = (-value * 0.2).toString() + "px";
    map.style.bottom = (value * 0.5 + currentBottomMap).toString() + "px";
    for (const historicalFigure of historicalFiguresMapper) {
      const currentSpeed = speed[historicalFigure.row];
      if (historicalFigure.side === "left") {
        historicalFigure.el.style.top =
          (
            -value * currentSpeed +
            historicalFigure.elStartingOffsetTop
          ).toString() + "px";
        historicalFigure.el.style.left =
          (
            -value * currentSpeed +
            historicalFigure.elStartingOffsetLeft
          ).toString() + "px";
      } else if (historicalFigure.side === "right") {
        const elStartingOffsetRight =
          historicalFigure.elPerantWidth -
          historicalFigure.elStartingOffsetLeft -
          historicalFigure.elStartingOffsetWidth;
        historicalFigure.el.style.top =
          (
            -value * currentSpeed +
            historicalFigure.elStartingOffsetTop
          ).toString() + "px";
        historicalFigure.el.style.right =
          (-value * currentSpeed + elStartingOffsetRight).toString() + "px";
      } else {
        historicalFigure.el.style.top =
          (
            -value * currentSpeed +
            historicalFigure.elStartingOffsetTop
          ).toString() + "px";
      }
    }
  });
  // End Parallax Script
};
const loadHomeViewParallaxSection = () => {
  const data = mockData.results;
  const totalHistoricalFigures = 5;
  let currentTemplate = null;
  if (data.length < totalHistoricalFigures) {
    currentTemplate = html`<p>No Historical Figures Data!</p>`;
  } else {
    const shuffled = data.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const historicalFiguresData = shuffled.slice(0, totalHistoricalFigures);
    const historicalFiguresPositions = [
      { side: "left", row: "first" },
      { side: "right", row: "first" },
      { side: "left", row: "second" },
      { side: "right", row: "second" },
      { side: "center", row: "third" },
    ];
    const cards = historicalFiguresData.map((historicalFigureData, index) => {
      historicalFigureData.side = historicalFiguresPositions[index].side;
      historicalFigureData.row = historicalFiguresPositions[index].row;
      return homeViewHistoricalFigureCardTemplate(historicalFigureData, "bg");
    });
    currentTemplate = html` ${cards} `;
  }
  return homeViewParallaxSectionTemplate(currentTemplate);
};
export const homeView = async (ctx) => {
  const homeViewParallaxSection = loadHomeViewParallaxSection();
  ctx.render(homeViewTemplate(homeViewParallaxSection));
  await initParallax();
  console.log(ctx.i18nText.bg.header);
};
