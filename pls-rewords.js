import "https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/dist/js.cookie.min.js";

const getIdList = () => {
    const el = document.getElementById("pr-teams-data-list");
    if (!el) return;
    const teamsIdsElements = el.querySelectorAll(".pr-team-data");

    const teamNames = [];
    const teamCategories = [];
    const teamIds = [];

    teamsIdsElements.forEach(e => {
        const id = e.getAttribute("data-team-id");
        const name = e.getAttribute("data-team-name");
        const cat = e.getAttribute("data-team-category");
        teamIds.push(id);
        teamNames.push(name);
        teamCategories.push(cat);
    });
    el.remove();
    return { id: teamIds, categories: teamCategories };
}

const idList = getIdList();

const checkId = () => {

    const checkCookie = Cookies.get("teamId");
    const teamId =
        checkCookie !== null && idList.id.indexOf(checkCookie) > -1 ?
            checkCookie : null;
    if (teamId === null) return;
    const category = idList.categories[idList.id.indexOf(checkCookie)];
    window.location.replace(`/playson-rewards/${category}?id=${teamId}`);
}

const initForm = () => {
    const form = document.querySelector(".w-form");
    if (!form) return;
    const idInput = form.querySelector("[name='team-id']");
    const submit = form.querySelector(".form__input_submit");
    submit.addEventListener("click", e => {
        e.preventDefault();
        if (idList.id.indexOf(idInput.value) >= 0) {
            const teamId = idList.id[idList.id.indexOf(idInput.value)];
            const category = idList.categories[idList.id.indexOf(idInput.value)];
            window.location.replace(`/playson-rewards/${category}?id=${teamId}`);
        } else {
            const errorMessage = document.querySelector(".pr-error-message");
            errorMessage.innerText = idInput.value.length > 0 ?
                "Hmm, we can't find your ID. Try entering the ID again or contact your Playson manager." :
                "Please enter your ID";
            errorMessage.classList.add("active");
            setTimeout(() => {
                errorMessage.classList.remove("active");
            }, 3000);
        };
    })
}

checkId();
initForm();
