const apiDogPath = document.body.getAttribute("apidog-id");

const requestOptions = {
    method: "GET",
    redirect: "follow"
};
// const updateTimer = () => {
//     const requestOptions = {
//         method: "GET",
//         redirect: "follow"
//     };
//     fetch(apiDogPath, requestOptions)
//         .then((response) => response.text())
//         .then((responseObj) => {
//             const obj = JSON.parse(responseObj);
//             const { startDateTime, endDateTime, timeZone, currentTime } = obj;
//             const targetMoment = moment.tz(startDateTime, timeZone);
//             const targetEndMoment = moment.tz(endDateTime, timeZone);
//             const targetSection = document.querySelector("#timer-section");
//             const leaderBoardSection = document.querySelector("#section-leaderboard");
//             const formSection = document.querySelector("#section-form");
//             if (!targetSection) return;
//             const now = Math.floor(new Date(currentTime).getTime() / 1000);
//             let interval =
//                 Math.floor(new Date(targetMoment._i).getTime() / 1000) - now;
//             let endInterval =
//                 Math.floor(new Date(targetEndMoment._i).getTime() / 1000) - now;
//             if (interval > 0 || endInterval <= 0) {
//                 leaderBoardSection.style.display = "none";
//                 formSection.style.display = "none";
//             }
//             if (interval <= 0) {
//                 targetSection.style.display = "none";
//                 return;
//             }
//             const preStartTimerDays = document.getElementById("pre-start-timer-days");
//             const preStartTimerHours = document.getElementById(
//                 "pre-start-timer-hours"
//             );
//             const preStartTimerMinutes = document.getElementById(
//                 "pre-start-timer-minutes"
//             );
//             const preStartTimerSeconds = document.getElementById(
//                 "pre-start-timer-seconds"
//             );

//             let prevSeconds = "00";
//             let prevMinutes = "00";
//             let prevHours = "00";
//             let prevDays = "00";
//             const parseVal = (val) => {
//                 return val.toString().length === 1 ? `0${val}` : val.toString();
//             };

//             const updateTimerDisplay = () => {
//                 let days = Math.floor((interval % (86400 * 30)) / 86400);
//                 let hours = Math.floor((interval % 86400) / 3600);
//                 let minutes = Math.floor((interval % 3600) / 60);
//                 let seconds = Math.floor(
//                     interval - days * 86400 - hours * 3600 - minutes * 60
//                 );

//                 if (seconds < 0) {
//                     targetSection.style.display = "none";
//                     return;
//                 }

//                 const isActive = {
//                     days: days > 0,
//                     hours: days > 0 || hours > 0,
//                     minutes: days > 0 || hours > 0 || minutes > 0,
//                     seconds: days > 0 || hours > 0 || minutes > 0 || seconds > 0
//                 };

//                 [
//                     { el: preStartTimerDays, id: "days", val: days },
//                     { el: preStartTimerHours, id: "hours", val: hours },
//                     { el: preStartTimerMinutes, id: "minutes", val: minutes },
//                     { el: preStartTimerSeconds, id: "seconds", val: seconds }
//                 ].forEach(({ el, id, val }) => {
//                     const newVal = val.toString().padStart(2, "0");

//                     if (el.dataset.number !== newVal) {
//                         el.dataset.prevNumber = el.dataset.number;
//                         el.dataset.number = newVal;
//                         el.classList.add("animated");
//                         setTimeout(() => {
//                             el.textContent = newVal;
//                             el.classList.remove("animated");
//                         }, 500);
//                     }

//                     if (isActive[id]) {
//                         el.parentElement.classList.add("timer-cell-active");
//                     } else {
//                         el.parentElement.classList.remove("timer-cell-active");
//                     }
//                 });
//             };

//             updateTimerDisplay();

//             const timer = setInterval(function () {
//                 interval--;
//                 updateTimerDisplay();
//                 if (interval < 0) {
//                     clearInterval(timer);
//                     window.location.reload();
//                 }
//             }, 1000);
//         });
// };

const updateTimer = () => {
    fetch(apiDogPath, requestOptions)
        .then((response) => response.text())
        .then((responseObj) => {
            const obj = JSON.parse(responseObj);
            const { startDateTime, endDateTime, timeZone, currentTime } = obj;
            const targetMoment = moment.tz(startDateTime, timeZone);
            const targetEndMoment = moment.tz(endDateTime, timeZone);
            const targetSection = document.querySelector("#timer-section");
            const leaderBoardSection = document.querySelector("#section-leaderboard");
            const formSection = document.querySelector("#section-form");
            if (!targetSection) return;
            const now = Math.floor(new Date(currentTime).getTime() / 1000);
            let interval =
                Math.floor(new Date(targetMoment._i).getTime() / 1000) - now;
            let endInterval =
                Math.floor(new Date(targetEndMoment._i).getTime() / 1000) - now;
            if (interval > 0 || endInterval <= 0) {
                leaderBoardSection.style.display = "none";
                formSection.style.display = "none";
            }
            if (interval <= 0) {
                targetSection.style.display = "none";
                return;
            }
            let offset = 0;
            let targetStartMs = 0;
            let targetEndMs = 0;
            let timerId = null;

            const D = document.getElementById.bind(document);
            const daysEl = D("pre-start-timer-days");
            const hoursEl = D("pre-start-timer-hours");
            const minsEl = D("pre-start-timer-minutes");
            const secsEl = D("pre-start-timer-seconds");

            async function syncWithServer() {
                const resp = await fetch(apiDogPath, { method: "GET", redirect: "follow" });
                const { startDateTime, endDateTime, timeZone, currentTime } = await resp.json();

                const serverNowMs = new Date(currentTime).getTime();
                const clientNowMs = Date.now();

                offset = serverNowMs - clientNowMs;
                targetStartMs = moment.tz(startDateTime, timeZone).valueOf();
                targetEndMs = moment.tz(endDateTime, timeZone).valueOf();
            }

            function updateDisplay(remainingS) {
                if (remainingS < 0) {
                    document.querySelector("#timer-section").style.display = "none";
                    clearTimeout(timerId);
                    return;
                }

                const days = Math.floor(remainingS / 86400);
                const hours = Math.floor((remainingS % 86400) / 3600);
                const minutes = Math.floor((remainingS % 3600) / 60);
                const seconds = remainingS % 60;

                const pad = n => n.toString().padStart(2, "0");

                [[daysEl, days],
                [hoursEl, hours],
                [minsEl, minutes],
                [secsEl, seconds]
                ].forEach(([el, val]) => {
                    const newVal = pad(val);
                    if (el.dataset.number !== newVal) {
                        el.dataset.prevNumber = el.dataset.number;
                        el.dataset.number = newVal;
                        el.classList.add("animated");
                        setTimeout(() => {
                            el.textContent = newVal;
                            el.classList.remove("animated");
                        }, 500);
                    }
                });
            }

            function startTimerLoop() {
                function tick() {
                    const nowMs = Date.now() + offset;
                    const remainingS = Math.floor((targetStartMs - nowMs) / 1000);

                    updateDisplay(remainingS);

                    if (remainingS >= 0) {
                        const msUntilNextFullSec = 1000 - ((Date.now() + offset) % 1000);
                        timerId = setTimeout(tick, msUntilNextFullSec);
                    }
                }
                tick();
            }

            (async function init() {
                await syncWithServer();
                startTimerLoop();

                setInterval(syncWithServer, 60_000);

                document.addEventListener("visibilitychange", () => {
                    if (!document.hidden) {
                        syncWithServer();
                    }
                });
            })();
        });
}

const swiper = new Swiper(".swiper", {
    // Optional parameters
    loop: false,
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    breakpoints: {
        768: {
            slidesPerView: 2
        },
        960: {
            slidesPerView: 3
        }
    }
});

const form = document.getElementById("email-form");

const validateForm = () => {
    if (!form) return;

    const submit = form.querySelector(".form__input_submit");
    const inputs = Array.from(
        form.querySelectorAll(".form__input:not([type='submit'])")
    );
    const name = document.getElementById("field-name");
    const company = document.getElementById("field-company");
    const email = document.getElementById("field-email");
    const rools = document.getElementById("field-rools");

    if (name) name.setAttribute("name", "_username");
    if (email) email.setAttribute("name", "_email");
    if (company) company.setAttribute("name", "_company");
    rools.removeAttribute("value");
    rools.removeAttribute("name");
    //ttr.remove();

    submit.classList.add("disabled");

    const checkFields = () => {
        const ttr = form.querySelector("[name='cf-turnstile-response']");
        if (ttr) {
            ttr.remove();
        }

        setTimeout(() => {
            const emailRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
            const nameRegExp = /^[a-zA-Z\s]*$/g;
            const isValidEmail =
                email.value.length > 0 && emailRegExp.test(email.value);
            const isValidName = nameRegExp.test(name.value);
            const isValidate = rools.checked;

            if (name.value === "" || !isValidEmail || !isValidate || !isValidName) {
                submit.classList.add("disabled");
                return;
            }
            submit.classList.remove("disabled");
        }, 300);
    };

    inputs.forEach((input) => {
        input.addEventListener("input", checkFields);
    });
    rools.addEventListener("click", checkFields);
};

const updateForm = () => {
    if (!form) return;

    fetch(apiDogPath, requestOptions)
        .then((response) => response.text())
        .then((responseObj) => {
            const obj = JSON.parse(responseObj);
            const { formToken, formActionUrl } = obj;
            const token = form.querySelector("input[name='gorilla.csrf.Token']");
            form.setAttribute("action", formActionUrl);
            token.setAttribute("value", formToken);
        });
};

const updateDates = () => {
    function getOrdinal(day) {
        const j = day % 10,
            k = day % 100;
        if (j === 1 && k !== 11) return day + "st";
        if (j === 2 && k !== 12) return day + "nd";
        if (j === 3 && k !== 13) return day + "rd";
        return day + "th";
    }

    // Форматируем дату вида "April 25th, 2025"
    function formatDate(isoString, includeYear = true) {
        const date = new Date(isoString);
        const day = getOrdinal(date.getUTCDate());
        const month = date.toLocaleString("en-US", {
            month: "long",
            timeZone: "UTC"
        });
        const year = date.getUTCFullYear();
        return includeYear ? `${month} ${day}, ${year}` : `${month} ${day}`;
    }

    function formatTime(isoString, type = "hours") {
        const date = new Date(isoString);
        const hh = String(date.getHours()).padStart(2, "0");
        const mm = String(date.getMinutes()).padStart(2, "0");
        return type === "hours" ? hh : mm;
    }

    fetch(apiDogPath, requestOptions)
        .then((response) => response.text())
        .then((responseObj) => {
            const obj = JSON.parse(responseObj);
            const {
                startDateTime,
                endDateTime,
                tornamentName,
                timeZone,
                formActionUrl
            } = obj;

            const datesInRules = document.getElementById("start-end-dates");
            const startDate = document.getElementById("start-date");
            const endDate = document.getElementById("end-date");
            const startTime = document.getElementById("start-time");
            const endTime = document.getElementById("end-time");
            const gCalBtn = document.getElementById("google-cal-link");
            const timeZones = document.querySelectorAll(".time-zone");

            if (datesInRules) {
                datesInRules.innerHTML = `
                    ${tornamentName} starts on 
                    <strong>${formatDate(startDateTime)} 
                    at ${formatTime(startDateTime)}:${formatTime(
                    startDateTime,
                    "minutes"
                )}</strong>, and ends on <strong>${formatDate(endDateTime)} 
                    at ${formatTime(endDateTime)}:${formatTime(
                    endDateTime,
                    "minutes"
                )}</strong>.`;
            }

            if (startDate)
                startDate.innerHTML = `${formatDate(startDateTime, false)}`;

            if (endDate) endDate.innerHTML = `${formatDate(endDateTime, false)}`;

            if (startTime)
                startTime.innerHTML = `${formatTime(startDateTime)}:${formatTime(
                    startDateTime,
                    "minutes"
                )}`;

            if (endTime)
                endTime.innerHTML = `${formatTime(endDateTime)}:${formatTime(
                    endDateTime,
                    "minutes"
                )}`;

            if (timeZones.length > 0) {
                timeZones.forEach((z) => {
                    z.innerText = timeZone;
                });
            }

            const timeInTimeZone = moment.tz(timeZone);
            const offsetMinutes = timeInTimeZone.utcOffset();
            const offsetHours = offsetMinutes / 60;

            function offsetTime(isoStr) {
                const timeToArray = String(isoStr).slice(-8).split(":");
                let newTime =
                    Number(timeToArray[0]) - offsetHours > 24
                        ? Number(timeToArray[0]) - offsetHours - 24
                        : Number(timeToArray[0]) - offsetHours;
                if (newTime.length > 1) {
                    newTime = `0${newTime}`;
                }
                timeToArray[0] = newTime;
                return timeToArray.join("");
            }

            const googleCalendarLink = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${tornamentName
                .replaceAll(" ", "+")
                .replaceAll("&", "and")}&dates=${startDateTime
                    .substr(0, 10)
                    .replaceAll("-", "")}T${offsetTime(
                        startDateTime
                    )}Z/${endDateTime.substr(0, 10).replaceAll("-", "")}T${offsetTime(
                        endDateTime
                    )}Z&details=${tornamentName
                        .replaceAll(" ", "+")
                        .replaceAll("&", "and")}&location=${formActionUrl}&trp=true`;

            if (gCalBtn) gCalBtn.href = googleCalendarLink;

            const updateRangeBetweenDates = () => {
                const sD = new Date(startDateTime);
                const eD = new Date(endDateTime);
                const tD = document.getElementById("time-duration");
                if (!tD) return;

                const diffInMs = eD - sD;

                const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
                const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
                const diffInMinutes = Math.floor(
                    (diffInMs % (1000 * 60 * 60)) / (1000 * 60)
                );

                const string = `${diffInDays > 0 ? diffInDays + "d " : ""}${diffInHours > 0 ? diffInHours + "h " : ""
                    }${diffInMinutes}m`;

                tD.innerText = string;
            };
            updateRangeBetweenDates();
        });
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
            const sayMyName = sayMyNameStateBoolean ? "&sayMyName=MisterWhite" : "";
            const url = `${path}${id}${sayMyName}&limit=${widgetLimitLoginPage}`;
            let interval = Number(updateIntervalSec);
            let loaded = false;
            const updateData = () => {
                updateArray(url).then((newArray) => {
                    if (newArray.length <= 0) {
                        lbSection.style.display = "none";
                    } else {
                        lbSection.style.display = "block";
                    }
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
                            value = maskEmail(row[key]);
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


updateDates();
updateTimer();
validateForm();
updateForm();
updateLeaderBoard();
