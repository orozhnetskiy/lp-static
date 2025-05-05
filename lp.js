const apiDogPath = document.body.getAttribute("apidog-id");

const initScheduleTabs = () => {
    const scheduleTabs = document.getElementById("schedule-render");
    const ACTIVE = "w--current";
    if (!scheduleTabs) return;
    const tabs = scheduleTabs.querySelectorAll(".schedule-tabs_button");

    if (tabs.length < 2) return;
    document.addEventListener("click", (e) => {
        const currTab = e.target.closest(".schedule-tabs_button");
        if (!currTab) return;
        if (currTab.classList.contains(ACTIVE)) return;
        const activeTab = scheduleTabs.querySelector(
            `.schedule-tabs_button.${ACTIVE}`
        );
        const activeSection = scheduleTabs.querySelector(
            `.schedule-tabs_section.${ACTIVE}`
        );
        const currSection = scheduleTabs.querySelector(
            `.schedule-tabs_section[data-schedule-tab='${Array.from(tabs).indexOf(
                currTab
            )}']`
        );
        activeTab.classList.remove(ACTIVE);
        activeSection.classList.remove(ACTIVE);
        currTab.classList.add(ACTIVE);
        currSection.classList.add(ACTIVE);
    });
};

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

// const updateDates = () => {
//   function getOrdinal(day) {
//     const j = day % 10,
//       k = day % 100;
//     if (j === 1 && k !== 11) return day + "st";
//     if (j === 2 && k !== 12) return day + "nd";
//     if (j === 3 && k !== 13) return day + "rd";
//     return day + "th";
//   }

//   // Форматируем дату вида "April 25th, 2025"
//   function formatDate(isoString, includeYear = true) {
//     const date = new Date(isoString);
//     const day = getOrdinal(date.getUTCDate());
//     const month = date.toLocaleString("en-US", {
//       month: "long",
//       timeZone: "UTC"
//     });
//     const year = date.getUTCFullYear();
//     return includeYear ? `${month} ${day}, ${year}` : `${month} ${day}`;
//   }

//   function formatTime(isoString, type = "hours") {
//     const date = new Date(isoString);
//     const hh = String(date.getHours()).padStart(2, "0");
//     const mm = String(date.getMinutes()).padStart(2, "0");
//     return type === "hours" ? hh : mm;
//   }

//   fetch(apiDogPath, requestOptions)
//     .then((response) => response.text())
//     .then((responseObj) => {
//       const obj = JSON.parse(responseObj);
//       const {
//         startDateTime,
//         endDateTime,
//         tornamentName,
//         timeZone,
//         formActionUrl,
//         schedule
//       } = obj;

//       const datesInRules = document.getElementById("start-end-dates");
//       const startDate = document.getElementById("start-date");
//       const endDate = document.getElementById("end-date");
//       const startTime = document.querySelectorAll("[data-set-time='start']");
//       const endTime = document.querySelectorAll("[data-set-time='end']");
//       const gCalBtn = document.getElementById("google-cal-link");
//       const timeZones = document.querySelectorAll(".time-zone");

//       const wholePeriodBetweenDates = schedule.wholePeriodBetweenDates === true;
//       const keys = Object.keys(schedule.dateAndTime);

//       const dateStringToObj = (str) => {
//         let dateObj = {};
//         const dateArr = str.split("/")[0].split(",");
//         const timeArr = str.split("/")[1].split("-");
//         dateObj.date = dateArr[0];
//         dateObj.year = dateArr[1].replaceAll(" ", "");
//         dateObj.startTime = timeArr[0].replaceAll(" ", "");
//         dateObj.endTime =
//           timeArr.length > 1
//             ? timeArr[1].replaceAll(" ", "")
//             : timeArr[0].replaceAll(" ", "");
//         return dateObj;
//       };

//       if (datesInRules) {
//         if (wholePeriodBetweenDates) {
//           const sd = dateStringToObj(schedule.dateAndTime[keys[0]]);
//           const ed = dateStringToObj(
//             schedule.dateAndTime[keys[keys.length - 1]]
//           );
//           datesInRules.innerHTML = `
//           ${tornamentName} starts on <strong>${sd.date}, ${sd.year} at ${sd.startTime}</strong>, and ends on <strong>${ed.date}, ${ed.year} at ${ed.endTime}</strong>.
//           `;
//         } else {
//           let resultStr = "";
//           keys.forEach((key) => {
//             const d = dateStringToObj(schedule.dateAndTime[key]);
//             resultStr += `
//                ${tornamentName} ${key} starts on <strong>${d.date}, ${d.year} at ${d.startTime}</strong>, and ends on <strong>${d.date}, ${d.year} at ${d.endTime}</strong>.<br>&nbsp;<br>
//           `;
//             datesInRules.innerHTML = resultStr;
//           });
//         }
//       }

//       if (startDate) {
//         const sd = dateStringToObj(schedule.dateAndTime[keys[0]]);
//         startDate.innerHTML = `${sd.date}`;
//       }

//       if (endDate) {
//         const ed = dateStringToObj(schedule.dateAndTime[keys[keys.length - 1]]);
//         endDate.innerHTML = `${ed.date}`;
//       }

//       const findInex = (e) => {
//         const elWrapper = e.closest(".w-tab-content");
//         const elParent = e.closest(".w-tab-pane");
//         const elIndex = Array.from(
//           elWrapper.querySelectorAll(".w-tab-pane")
//         ).indexOf(elParent);
//         return elIndex;
//       };

//       if (startTime.length > 0) {
//         startTime.forEach((e) => {
//           const sd = dateStringToObj(schedule.dateAndTime[keys[findInex(e)]]);
//           e.innerHTML = `${sd.startTime}`;
//         });
//       }

//       if (endTime.length > 0) {
//         endTime.forEach((e) => {
//           const sd = dateStringToObj(schedule.dateAndTime[keys[findInex(e)]]);
//           e.innerHTML = `${sd.endTime}`;
//         });
//       }

//       if (timeZones.length > 0) {
//         timeZones.forEach((z) => {
//           z.innerText = timeZone;
//         });
//       }

//       const timeInTimeZone = moment.tz(timeZone);
//       const offsetMinutes = timeInTimeZone.utcOffset();
//       const offsetHours = offsetMinutes / 60;

//       function offsetTime(isoStr) {
//         const timeToArray = String(isoStr).slice(-8).split(":");
//         let newTime =
//           Number(timeToArray[0]) - offsetHours > 24
//             ? Number(timeToArray[0]) - offsetHours - 24
//             : Number(timeToArray[0]) - offsetHours;
//         if (newTime.length > 1) {
//           newTime = `0${newTime}`;
//         }
//         timeToArray[0] = newTime;
//         return timeToArray.join("");
//       }

//       const googleCalendarLink = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${tornamentName
//         .replaceAll(" ", "+")
//         .replaceAll("&", "and")}&dates=${startDateTime
//         .substr(0, 10)
//         .replaceAll("-", "")}T${offsetTime(
//         startDateTime
//       )}Z/${endDateTime.substr(0, 10).replaceAll("-", "")}T${offsetTime(
//         endDateTime
//       )}Z&details=${tornamentName
//         .replaceAll(" ", "+")
//         .replaceAll("&", "and")}&location=${formActionUrl}&trp=true`;

//       if (gCalBtn) gCalBtn.href = googleCalendarLink;

//       const updateRangeBetweenDates = () => {
//         const sD = new Date(startDateTime);
//         const eD = new Date(endDateTime);
//         const tD = document.getElementById("time-duration");
//         if (!tD) return;

//         const diffInMs = eD - sD;

//         const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
//         const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
//         const diffInMinutes = Math.floor(
//           (diffInMs % (1000 * 60 * 60)) / (1000 * 60)
//         );

//         const string = `${diffInDays > 0 ? diffInDays + "d " : ""}${
//           diffInHours > 0 ? diffInHours + "h " : ""
//         }${diffInMinutes}m`;

//         tD.innerText = string;
//       };
//       updateRangeBetweenDates();
//     });
// };

function toIso(str, startDate = true) {
    const regex = /(\d+)(?:st|nd|rd|th)\s+([A-Za-z]+),\s+(\d{4})\s*\/\s*(\d{1,2}:\d{2})-(\d{1,2}:\d{2})/;
    const m = str.match(regex);
    if (!m) {
        throw new Error("Не удалось распознать дату: " + str);
    }
    const [, day, monthName, year, startTime, endTime] = m;

    const monthMap = {
        January: "01",
        February: "02",
        March: "03",
        April: "04",
        May: "05",
        June: "06",
        July: "07",
        August: "08",
        September: "09",
        October: "10",
        November: "11",
        December: "12"
    };
    const mm = monthMap[monthName];
    if (!mm) {
        throw new Error("Неизвестный месяц: " + monthName);
    }

    const dd = day.padStart(2, "0");
    return `${year}-${mm}-${dd}T${startDate ? startTime : endTime}:00`;
}

function formatInterval(startStr, endStr) {
    const start = new Date(startStr);
    const end = new Date(endStr);

    // разница в миллисекундах
    let diffMs = end - start;
    // если нужно всегда положительное значение:
    if (diffMs < 0) diffMs = -diffMs;

    // сколько целых минут
    const totalMinutes = Math.floor(diffMs / 1000 / 60);

    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes - days * 60 * 24) / 60);
    const minutes = totalMinutes - days * 60 * 24 - hours * 60;

    return `${days}d ${hours}h ${minutes}m`;
}

const updateTimer = () => {
    fetch(apiDogPath, requestOptions)
        .then((response) => response.text())
        .then((responseObj) => {
            const targetSection = document.querySelector("#timer-section");
            const leaderBoardSection = document.querySelector("#section-leaderboard");
            const formSection = document.querySelector("#section-form");

            const obj = JSON.parse(responseObj);
            const { schedule, timeZone, currentTime } = obj;
            const { dateAndTime } = schedule;
            const keys = Object.keys(dateAndTime);
            const sd = toIso(dateAndTime[keys[0]]);
            const ed = toIso(dateAndTime[keys[keys.length - 1]], false);
            const targetMoment = moment.tz(sd, timeZone);
            const targetEndMoment = moment.tz(ed, timeZone);

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
                const resp = await fetch(apiDogPath, {
                    method: "GET",
                    redirect: "follow"
                });
                const { timeZone, currentTime, schedule } = await resp.json();

                const nsd = toIso(dateAndTime[keys[0]]);
                const ned = toIso(dateAndTime[keys[keys.length - 1]], false);

                const serverNowMs = new Date(currentTime).getTime();
                const clientNowMs = Date.now();

                offset = serverNowMs - clientNowMs;
                targetStartMs = moment.tz(nsd, timeZone).valueOf();
                targetEndMs = moment.tz(ned, timeZone).valueOf();
            }

            function updateDisplay(remainingS) {
                if (remainingS < 0) {
                    document.querySelector("#timer-section").style.display = "none";
                    window.location.reload();
                    clearTimeout(timerId);
                    return;
                }

                const days = Math.floor(remainingS / 86400);
                const hours = Math.floor((remainingS % 86400) / 3600);
                const minutes = Math.floor((remainingS % 3600) / 60);
                const seconds = remainingS % 60;

                const pad = (n) => n.toString().padStart(2, "0");

                [
                    [daysEl, days],
                    [hoursEl, hours],
                    [minsEl, minutes],
                    [secsEl, seconds]
                ].forEach(([el, val]) => {
                    const newVal = pad(val);
                    if (el.dataset.number !== newVal) {
                        const currId = el.id.replace("pre-start-timer-", "");
                        const prevCell =
                            currId === "seconds"
                                ? minutes + hours + days
                                : currId === "minutes"
                                    ? hours + days
                                    : currId === "hours"
                                        ? days
                                        : 0;
                        if (newVal <= 0 && prevCell <= 0) {
                            el.parentNode.classList.remove("timer-cell-active");
                        } else {
                            if (!el.parentNode.classList.contains("timer-cell-active")) {
                                el.parentNode.classList.add("timer-cell-active");
                            }
                        }

                        el.dataset.prevNumber = el.dataset.number;
                        el.dataset.number = newVal;
                        setTimeout(() => {
                            el.textContent = newVal;
                        }, 500);
                    }
                });
            }

            function startTimerLoop() {
                function tick() {
                    const nowMs = Date.now() + offset;
                    const remainingS = Math.floor((targetStartMs - nowMs) / 1000);

                    updateDisplay(remainingS, offset);

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
};

function offsetTime(isoStr, timeZone) {
    const timeInTimeZone = moment.tz(timeZone);
    const offsetMinutes = timeInTimeZone.utcOffset();
    const offsetHours = offsetMinutes / 60;
    const timeToArray = String(isoStr).slice(-8).split(":");
    let newTime =
        Number(timeToArray[0]) - offsetHours > 24
            ? Number(timeToArray[0]) - offsetHours - 24
            : Number(timeToArray[0]) - offsetHours;
    if (String(newTime).length < 2) {
        newTime = `0${newTime}`;
    }
    timeToArray[0] = newTime;
    return timeToArray.join("");
}

const updateGCal = (obj, keys, tornamentName, timeZone, formActionUrl) => {
    const gCalBtn = document.getElementById("google-cal-link");
    if (!gCalBtn) return;
    const sd = toIso(obj[Object.keys(obj)[0]]);
    const ed = toIso(obj[Object.keys(obj)[keys.length - 1]], false);
    const googleCalendarLink = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${tornamentName
        .replaceAll(" ", "+")
        .replaceAll("&", "and")}&dates=${sd
            .substr(0, 10)
            .replaceAll("-", "")}T${offsetTime(sd, timeZone)}Z/${ed
                .substr(0, 10)
                .replaceAll("-", "")}T${offsetTime(
                    ed,
                    timeZone
                )}Z&details=${tornamentName
                    .replaceAll(" ", "+")
                    .replaceAll("&", "and")}&location=${formActionUrl}&trp=true`;

    gCalBtn.href = googleCalendarLink;
};

const updateDates = () => {
    const target = document.getElementById("schedule-render");
    if (!target) return;

    fetch(apiDogPath, requestOptions)
        .then((response) => response.text())
        .then((responseObj) => {
            const obj = JSON.parse(responseObj);
            const { tornamentName, timeZone, formActionUrl, schedule } = obj;

            const keys = Object.keys(schedule.dateAndTime);
            const datesLength = Object.keys(schedule.dateAndTime).length;
            const wholePeriodBetweenDates =
                schedule.wholePeriodBetweenDates && datesLength === 2;
            const datesInRules = document.getElementById("start-end-dates");

            const dateStringToObj = (str) => {
                let dateObj = {};
                const dateArr = str.split("/")[0].split(",");
                const timeArr = str.split("/")[1].split("-");
                dateObj.date = dateArr[0];
                dateObj.year = dateArr[1].replaceAll(" ", "");
                dateObj.startTime = timeArr[0].replaceAll(" ", "");
                dateObj.endTime =
                    timeArr.length > 1
                        ? timeArr[1].replaceAll(" ", "")
                        : timeArr[0].replaceAll(" ", "");
                return dateObj;
            };

            if (datesInRules) {
                if (wholePeriodBetweenDates) {
                    const sd = dateStringToObj(schedule.dateAndTime[keys[0]]);
                    const ed = dateStringToObj(
                        schedule.dateAndTime[keys[keys.length - 1]]
                    );
                    datesInRules.innerHTML = `
          ${tornamentName} starts on <strong>${sd.date}, ${sd.year} at ${sd.startTime}</strong>, and ends on <strong>${ed.date}, ${ed.year} at ${ed.endTime}</strong>.
          `;
                } else {
                    let resultStr = "";
                    keys.forEach((key) => {
                        const d = dateStringToObj(schedule.dateAndTime[key]);
                        resultStr += `
               ${tornamentName}${keys.length > 1 ? ` ${key}` : ""
                            } starts on <strong>${d.date}, ${d.year} at ${d.startTime
                            }</strong>, and ends on <strong>${d.date}, ${d.year} at ${d.endTime
                            }</strong>.<br>&nbsp;<br>
          `;
                        datesInRules.innerHTML = resultStr;
                    });
                }
            }

            const renderMultipleDates = () => {
                const tabButtons = () => {
                    let render = "";
                    keys.forEach((key, index) => {
                        const d = dateStringToObj(schedule.dateAndTime[key]);
                        render += `<div class="schedule-tabs_button${index === 0 && datesLength > 1 ? " w--current" : ""
                            }">${d.date}</div>`;
                    });
                    return render;
                };

                const tabSections = () => {
                    let render = "";
                    keys.forEach((key, index) => {
                        const d = dateStringToObj(schedule.dateAndTime[key]);
                        const sh = Number(d.startTime.split(":")[0]);
                        const sm = Number(d.startTime.split(":")[1]);
                        const eh = Number(d.endTime.split(":")[0]);
                        const em = Number(d.endTime.split(":")[1]);
                        const rangeInMin = eh * 60 + em - (sh * 60 + sm);
                        const rangeStr = `
              ${Math.round(rangeInMin / 60)}h${rangeInMin % 60 > 0 ? ` ${rangeInMin % 60}m` : ""
                            }`;

                        render += `
              <div class="schedule-tabs_section${index === 0 ? " w--current" : ""
                            }" data-schedule-tab='${index}'>
                <div class="schedule">
                  <div class="schedule-column">
                    <div class="schedule_overline">Starts</div>
                    <div data-wf--time-component--variant="base" class="schedule_accent-text-copy">
                      <div class="schedule_accent-text">
                        <div>${d.startTime}</div>
                        <div class="schedule_time-zone time-zone">${timeZone}</div>
                      </div>
                      <div class="schedule_arrow">
                        <img src="https://cdn.prod.website-files.com/677bda6af407d3b963833347/679a90ea91fa31d2c75394c0_time-arrow.svg" loading="lazy" alt="" class="schedule_arrow-direction">
                        <div class="schedule_time-length">${rangeStr}</div>
                      </div>
                    </div>
                  </div>
                  <div class="schedule-column blue">
                    <div class="schedule_overline">Ends</div>
                    <div data-wf--time-component--variant="base" class="schedule_accent-text-copy">
                      <div class="schedule_accent-text">
                        <div>${d.endTime}</div>
                        <div class="schedule_time-zone time-zone">${timeZone}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `;
                    });
                    return render;
                };

                return `
        <div class="schedule-tabs">
          <div class="schedule-tabs_buttons">
            ${tabButtons()}
          </div>
          <div class="schedule-tabs_sections">
            ${tabSections()}
          </div>
        </div>
      `;
            };

            const renderPeriod = () => {
                const d = dateStringToObj(schedule.dateAndTime[keys[0]]);
                const ed = dateStringToObj(schedule.dateAndTime[keys[keys.length - 1]]);

                const startDateIso = toIso(schedule.dateAndTime[keys[0]]);
                const endDateIso = toIso(
                    schedule.dateAndTime[keys[keys.length - 1]],
                    false
                );
                const sh = Number(d.startTime.split(":")[0]);
                const sm = Number(d.startTime.split(":")[1]);
                const eh = Number(d.endTime.split(":")[0]);
                const em = Number(d.endTime.split(":")[1]);
                const rangeStr = formatInterval(startDateIso, endDateIso);

                return `
        <div class="schedule-tabs">
          <div class="schedule-tabs_sections">
              <div class="schedule-tabs_section w--current">
                <div class="schedule">
                  <div class="schedule-column">
                    <div class="schedule_overline">Starts</div>
                    <div class="schedule_accent-text-copy">
                      <div class="schedule_accent-text">
                        <div>${d.date}</div>
                      </div>
                      <div class="schedule_arrow">
                        <img src="https://cdn.prod.website-files.com/677bda6af407d3b963833347/679a90ea91fa31d2c75394c0_time-arrow.svg" loading="lazy" alt="" class="schedule_arrow-direction">
                        <div class="schedule_time-length">${rangeStr}</div>
                      </div>
                    </div>
                    <div class="schedule_accent-text-copy w-variant-41b5da7b-60b7-5e82-beda-c4fd270bda0e">
                      <div class="schedule_accent-text w-variant-41b5da7b-60b7-5e82-beda-c4fd270bda0e">
                        <div id="start-time">${d.startTime}</div>
                        <div class="schedule_time-zone time-zone">${timeZone}</div>
                      </div>
                    </div>
                  </div>
                  <div class="schedule-column blue">
                    <div class="schedule_overline">Ends</div>
                    <div class="schedule_accent-text-copy">
                      <div class="schedule_accent-text">
                        <div>${ed.date}</div>
                      </div>
                    </div>
                    <div class="schedule_accent-text-copy w-variant-41b5da7b-60b7-5e82-beda-c4fd270bda0e">
                      <div class="schedule_accent-text w-variant-41b5da7b-60b7-5e82-beda-c4fd270bda0e">
                        <div id="start-time">${ed.endTime}</div>
                        <div class="schedule_time-zone time-zone">${timeZone}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      `;
            };

            target.innerHTML = !wholePeriodBetweenDates
                ? renderMultipleDates()
                : renderPeriod();
            initScheduleTabs();
            updateGCal(
                schedule.dateAndTime,
                keys,
                tornamentName,
                timeZone,
                formActionUrl
            );
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
            const sayMyName = sayMyNameState ? "&sayMyName=MisterWhite" : "";
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

const setGameLinks = () => {
    const gameIcons = document.querySelectorAll("[data-game-link]");
    if (gameIcons.length <= 0) return;
    gameIcons.forEach((icon) => {
        const link =
            "https://playson.com/game/" + icon.getAttribute("data-game-link");
        icon.href = link;
    });
};

setGameLinks();

updateDates();
updateTimer();
validateForm();
updateForm();
updateLeaderBoard();
