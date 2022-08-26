(() => {
  const t = (async function ([t, a]) {
    let e;
    try {
      const c = "4e767ccf870324498e595e40179c0c00",
        o = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${t}&lon=${a}&appid=${c}`
        );
      e = (await o.json()).weather;
    } catch (t) {
      console.log(t);
    }
    return e;
  })(["30", "40"]);
  console.log(t);
})();
