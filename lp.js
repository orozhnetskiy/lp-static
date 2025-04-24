const apiDogPath = document.body.getAttribute("apidog-id");

const updateTimer = () => {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };
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
            const preStartTimerDays = document.getElementById("pre-start-timer-days");
            const preStartTimerHours = document.getElementById(
                "pre-start-timer-hours"
            );
            const preStartTimerMinutes = document.getElementById(
                "pre-start-timer-minutes"
            );
            const preStartTimerSeconds = document.getElementById(
                "pre-start-timer-seconds"
            );
            let prevSeconds = "00";
            let prevMinutes = "00";
            let prevHours = "00";
            let prevDays = "00";
            const parseVal = (val) => {
                return val.toString().length === 1 ? `0${val}` : val.toString();
            };

            const updateTimerDisplay = () => {
                let days = Math.floor((interval % (86400 * 30)) / 86400);
                let hours = Math.floor((interval % 86400) / 3600);
                let minutes = Math.floor((interval % 3600) / 60);
                let seconds = Math.floor(
                    interval - days * 86400 - hours * 3600 - minutes * 60
                );

                if (seconds < 0) {
                    targetSection.style.display = "none";
                    return;
                }

                const isActive = {
                    days: days > 0,
                    hours: days > 0 || hours > 0,
                    minutes: days > 0 || hours > 0 || minutes > 0,
                    seconds: days > 0 || hours > 0 || minutes > 0 || seconds > 0
                };

                [
                    { el: preStartTimerDays, id: "days", val: days },
                    { el: preStartTimerHours, id: "hours", val: hours },
                    { el: preStartTimerMinutes, id: "minutes", val: minutes },
                    { el: preStartTimerSeconds, id: "seconds", val: seconds }
                ].forEach(({ el, id, val }) => {
                    const newVal = val.toString().padStart(2, "0");

                    if (el.dataset.number !== newVal) {
                        el.dataset.prevNumber = el.dataset.number;
                        el.dataset.number = newVal;
                        el.classList.add("animated");
                        setTimeout(() => {
                            el.textContent = newVal;
                            el.classList.remove("animated");
                        }, 500);
                    }

                    if (isActive[id]) {
                        el.parentElement.classList.add("timer-cell-active");
                    } else {
                        el.parentElement.classList.remove("timer-cell-active");
                    }
                });
            };

            updateTimerDisplay();

            const timer = setInterval(function () {
                interval--;
                updateTimerDisplay();
                if (interval < 0) {
                    clearInterval(timer);
                    window.location.reload();
                }
            }, 1000);
        });
};

updateTimer();

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

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

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
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

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
        // Берём день, месяц и год в UTC (чтобы не зависеть от таймзоны)
        const day = getOrdinal(date.getUTCDate());
        const month = date.toLocaleString("en-US", {
            month: "long",
            timeZone: "UTC"
        });
        const year = date.getUTCFullYear();
        return includeYear ? `${month} ${day}, ${year}` : `${month} ${day}`;
    }

    // Форматируем время вида "20:00"
    function formatTime(isoString, type = "hours") {
        const date = new Date(isoString);
        const hh = String(date.getUTCHours()).padStart(2, "0");
        const mm = String(date.getUTCMinutes()).padStart(2, "0");
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

            if (datesInRules) {
                datesInRules.innerHTML = `
          ${tornamentName} starts on 
          <strong>${formatDate(startDateTime)} 
          at ${formatTime(endDateTime)}</strong>, 
          and ends on <strong>${formatDate(startDateTime)} 
          at ${formatTime(endDateTime)}</strong>.`;
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
        });
};

updateDates();
updateTimer();
validateForm();
updateForm();
