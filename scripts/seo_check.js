// Check SEO meta tags
(function(){
  function getAttr(sel, attr) {
    const el = document.querySelector(sel);
    return el ? (attr ? el.getAttribute(attr) : el.content) : null;
  }
  const result = {
    title: document.title,
    description: getAttr('meta[name="description"]'),
    keywords: getAttr('meta[name="keywords"]'),
    ogTitle: getAttr('meta[property="og:title"]'),
    ogDescription: getAttr('meta[property="og:description"]'),
    ogImage: getAttr('meta[property="og:image"]'),
    ogType: getAttr('meta[property="og:type"]'),
    ogLocale: getAttr('meta[property="og:locale"]'),
    twitterCard: getAttr('meta[name="twitter:card"]'),
    twitterTitle: getAttr('meta[name="twitter:title"]'),
    canonical: document.querySelector('link[rel="canonical"]')?.href,
    manifest: document.querySelector('link[rel="manifest"]')?.href,
    lang: document.documentElement.lang,
    themeColor: getAttr('meta[name="theme-color"]'),
    geoRegion: getAttr('meta[name="geo.region"]'),
    geoPosition: getAttr('meta[name="geo.position"]'),
    robots: getAttr('meta[name="robots"]'),
    iconCount: document.querySelectorAll('link[rel="icon"]').length,
    altTextsCount: document.querySelectorAll('img[alt]').length,
    imgsWithoutAlt: Array.from(document.querySelectorAll('img')).filter(i => !i.alt).length,
    h1Count: document.querySelectorAll('h1').length,
    h2Count: document.querySelectorAll('h2').length,
    h3Count: document.querySelectorAll('h3').length,
    sectionCount: document.querySelectorAll('section').length,
    mainCount: document.querySelectorAll('main').length,
    headerCount: document.querySelectorAll('header').length,
    footerCount: document.querySelectorAll('footer').length,
    navCount: document.querySelectorAll('nav').length,
    articleCount: document.querySelectorAll('article').length,
  };
  return JSON.stringify(result, null, 2);
})();
