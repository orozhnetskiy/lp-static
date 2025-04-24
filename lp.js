const updateTimer = () => {
    const apiDogPath = document.body.getAttribute("apidog-id");
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

            const updateString = (el, val, prevDecVal, id) => {
                const newVal = parseVal(val);
                let prevVal =
                    id === "days"
                        ? prevDays
                        : id === "hours"
                            ? prevHours
                            : id === "minutes"
                                ? prevMinutes
                                : prevSeconds;
                if (newVal === prevVal) return;
                const updateOpacity = () => {
                    if (val > 0 && !prevDecVal) {
                        el.parentElement.classList.add("timer-cell-active");
                    } else {
                        if (id === "seconds" && prevMinutes !== "00") return;
                        if (id === "minutes" && prevHours !== "00") return;
                        if (id === "hours" && prevDays !== "00") return;
                        if (!el.parentElement.classList.contains("timer-cell-active"))
                            return;
                        el.parentElement.classList.remove("timer-cell-active");
                    }
                };
                updateOpacity();
                el.dataset.prevNumber = prevVal;
                el.dataset.number = newVal;
                setTimeout(() => {
                    el.innerHTML = newVal;
                    el.classList.remove("animated");
                }, 500);
                el.classList.add("animated");
                if (id === "days") {
                    prevDays = newVal;
                } else if (id === "hours") {
                    prevHours = newVal;
                } else if (id === "minutes") {
                    prevMinutes = newVal;
                } else {
                    prevSeconds = newVal;
                }
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

                updateString(preStartTimerDays, parseVal(days), 0, "days");

                updateString(
                    preStartTimerHours,
                    parseVal(hours),
                    Number(parseVal(days)) === 0,
                    "hours"
                );
                console.log(Number(parseVal(days)) === 0);

                updateString(
                    preStartTimerMinutes,
                    parseVal(minutes),
                    Number(parseVal(hours)) === 0 && Number(parseVal(days)) === 0,
                    "minutes"
                );
                updateString(
                    preStartTimerSeconds,
                    parseVal(seconds),
                    Number(parseVal(hours)) === 0 &&
                    Number(parseVal(days)) === 0 &&
                    Number(parseVal(minutes)) === 0,
                    "seconds"
                );
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

const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: false,
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
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
    const inputs = Array.from(form.querySelectorAll(".form__input:not([type='submit'])"));
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
        };

        setTimeout(() => {
            const emailRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
            const nameRegExp = /^[a-zA-Z\s]*$/g;
            const isValidEmail = email.value.length > 0 && emailRegExp.test(email.value);
            const isValidName = nameRegExp.test(name.value);
            const isValidate = rools.checked;

            if (name.value === "" || !isValidEmail || !isValidate || !isValidName) {
                submit.classList.add("disabled");
                return;
            }
            submit.classList.remove("disabled");
        }, 300);
    };

    inputs.forEach(input => {
        input.addEventListener("input", checkFields);
    });
    rools.addEventListener("click", checkFields);
}

const updateForm = () => {
    const apiDogPath = document.body.getAttribute("apidog-id");
    if (!form) return;

    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(apiDogPath, requestOptions)
        .then(response => response.text())
        .then(responseObj => {
            const obj = JSON.parse(responseObj);
            const { formToken, formActionUrl } = obj;
            const token = form.querySelector("input[name='gorilla.csrf.Token']");
            form.setAttribute("action", formActionUrl);
            token.setAttribute("value", formToken);
            // console.log(token);
        });
};

updateTimer();
validateForm();
updateForm();