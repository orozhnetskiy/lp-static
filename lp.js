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
