const apiDogPath = document.body.getAttribute("apidog-id");

const requestOptions = {
    method: "GET",
    redirect: "follow"
};

const updateLeaderBoard = () => {
    const apiDogPath = document.body.getAttribute("apidog-id");
    const lbSection = document.getElementById("section-leaderboard");
    const lw = lbSection.querySelector(".leaderboard-wrapper");
    if (!lw) return;
    let winnersNum;

    fetch(apiDogPath, requestOptions)
        .then((response) => response.text())
        .then((responceObj) => {
            const obj = JSON.parse(responceObj);
            const {
                sayMyNameState,
                id,
                widgetLimitLoginPage,
                winners,
                turnamentType,
                updateIntervalSec
            } = obj;
            const sayMyNameStateBoolean = sayMyNameState === "true";
            winnersNum = winners;
            const path = `https://viewboard.app/v1/${turnamentType}/leaderboard?id=`;
            const sayMyName = sayMyNameState ? "&sayMyName=MisterWhite" : "";
            const url = `${path}${id}${sayMyName}&limit=${widgetLimitLoginPage}`;
            let interval = Number(updateIntervalSec);
            let loaded = false;
            const updateData = () => {
                updateArray(url).then((newArray) => {
                    const arraysIsEqual = _.isEqual(newArray, oldArray);
                    if (!loaded) {
                        lw.classList.add("loaded");
                        loaded = true;
                    }
                    if (!arraysIsEqual) {
                        oldArray = newArray;
                        updateMarkup(newArray);
                    }
                });
            };
            updateData();
            setInterval(updateData, interval);
        });
    let oldArray = [];
    async function updateArray(url) {
        const response = await fetch(url);
        const newArray = await response.json();
        return newArray;
    }
    const updateMarkup = (playersArray) => {
        let newMarkup = `
        <div class="leaderbord-table">
      `;
        const buildMarkup = () =>
            playersArray.forEach((row, index) => {
                const mod = index < Number(winnersNum) ? "highlighted" : "base";
                const id = "w-variant-e54158ea-1ce3-b384-f346-c09914813972";
                newMarkup += `
          <div 
            data-wf--leaderboard-table-row--variant="${mod}" 
            class="leaderbord-tr ${mod === "base" ? "" : id}">
              <div class="leaderbord-tr__container">
        `;
                const sortedObj = {};
                sortedObj.name = row["name"];
                sortedObj.score = row["score"];
                sortedObj.place = row["place"];
                sortedObj.type = row["type"];
                sortedObj.prize = row["prize"];
                sortedObj.currency = row["currency"];
                for (const key of Object.keys(sortedObj)) {
                    let value;
                    const maskEmail = (email) => {
                        if (row[key].indexOf("@") < 0) return row[key];
                        const p1 = row[key].split("@")[0];
                        const p2 = row[key].split("@")[1];
                        const cutLength = p1.length > 20 ? 8 : p1.length > 10 ? 5 : 3;
                        return p1.slice(0, p1.length - cutLength) + "...@" + p2;
                    };
                    const isEmail = (email) => {
                        return String(email)
                            .toLowerCase()
                            .match(
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            );
                    };
                    switch (key) {
                        case "type":
                            value =
                                mod === "base"
                                    ? "&nbsp;"
                                    : `
                <div class='leaderbord-star ${id}'>
                  <img src='https://cdn.prod.website-files.com/677bda6af407d3b963833347/678047786a40ded56068d3bd_crown-icon-48.avif' loading='lazy' width='48' alt=''>
                </div>
              `;
                            break;
                        case "name":
                            value = isEmail(value)
                                ? maskEmail(row[key])
                                : row[key].replaceAll("|", "");
                            break;
                        case "currency":
                            break;
                        case "prize":
                            break;
                        case "score":
                            value = row[key]
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, "&nbsp;");
                            break;
                        default:
                            value = row[key];
                    }
                    if (value) {
                        if (key === "name") {
                            newMarkup += `
              <div class="leaderbord-td-group">
              `;
                        }
                        newMarkup += `
              <div class="leaderbord-td leaderbord-td__${key}">
                ${value}
              </div>
            `;
                        if (key === "score") {
                            newMarkup += `
              </div>
              `;
                        }
                    }
                }
                newMarkup += `
            </div>
          </div>
        `;
            });
        buildMarkup();
        newMarkup += `
          <div class="blur-section-bg"></div>
        </div>
      `;
        lw.innerHTML = newMarkup;
    };
};

updateLeaderBoard();
