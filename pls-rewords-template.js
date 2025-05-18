import "https://tally.so/widgets/embed.js";
import "https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/dist/js.cookie.min.js";

const links = {
    gc_pink_joker: "https://cdn.prod.website-files.com/67a61b6af1f9a373bbe094ec/682655e784035364914a7386_Property%201%3DDefault.avif",
    gc_king_of_the_sky: "https://cdn.prod.website-files.com/67a61b6af1f9a373bbe094ec/682655e862a0acf2e88a7ebc_Property%201%3DVariant2.avif",
    gc_solar_king: "https://cdn.prod.website-files.com/67a61b6af1f9a373bbe094ec/682655e89eec06fc28bca477_Property%201%3DVariant3.avif",
    gc_lion_gems: "https://cdn.prod.website-files.com/67a61b6af1f9a373bbe094ec/682655e8fbb81ea16cee07f3_Property%201%3DVariant5.avif",
    gc_buffalo_power: "https://cdn.prod.website-files.com/67a61b6af1f9a373bbe094ec/682655e8e9bfe726b7815b91_Property%201%3DVariant4.avif",
    gc_charge_the_clovers: "https://cdn.prod.website-files.com/67a61b6af1f9a373bbe094ec/682655e7e9bfe726b7815b52_Property%201%3DVariant6.avif",
    gc_3_luxor_pots: "https://cdn.prod.website-files.com/67a61b6af1f9a373bbe094ec/682655e89db481a901c16a02_Property%201%3DVariant7.avif",
    gc_energy_joker: "https://cdn.prod.website-files.com/67a61b6af1f9a373bbe094ec/682655e84e7cdf3f6fd85ea2_Property%201%3DVariant8.avif",
    gc_crystal_land: "https://cdn.prod.website-files.com/67a61b6af1f9a373bbe094ec/682655e812acb91fa420045f_Property%201%3DVariant9.avif",
    gc_3_carts_of_gold: "https://cdn.prod.website-files.com/67a61b6af1f9a373bbe094ec/682655e8b750ac464fba0ecc_Property%201%3DVariant10.avif",
    gc_3x_catch: "https://cdn.prod.website-files.com/67a61b6af1f9a373bbe094ec/682655e7e77ec3a074f9a92a_Property%201%3DVariant11.avif",
    gc_legend_of_cleopatra: "https://cdn.prod.website-files.com/67a61b6af1f9a373bbe094ec/682655e7f41ab8a586dee9d9_Property%201%3DVariant12.avif",
    gc_3_pirate_barrels: "https://cdn.prod.website-files.com/67a61b6af1f9a373bbe094ec/682655e8d3916deb74db961b_Property%201%3DVariant13.avif",
    gc_arizona_heist: "https://cdn.prod.website-files.com/67a61b6af1f9a373bbe094ec/682655e89eec06fc28bca47b_Property%201%3DVariant14.avif",
    gc_wolf_power: "https://cdn.prod.website-files.com/67a61b6af1f9a373bbe094ec/682655e861eca0e98deb4969_Property%201%3DVariant15.avif"
}

const setIcon = (slug, character, context) => {
    const characterId = "gc_" + character.replaceAll(" ", "_").toLowerCase();
    const link = links[characterId];
    const teamImg = context.querySelector(`[data-team-image='${slug}']`);
    teamImg.setAttribute("src", link);
}

function getPlaceString(place) {
    const j = place % 10,
        k = place % 100;
    if (j === 1 && k !== 11) return place + "st";
    if (j === 2 && k !== 12) return place + "nd";
    if (j === 3 && k !== 13) return place + "rd";
    return place + "th";
}

const totalRangeList = document.getElementById("pr-range-total");
const monthlyRangeList = document.getElementById("pr-range-monthly");

const sortCards = (context) => {
    const teamsCards = Array.from(context.querySelectorAll(".pr-range-row"));

    teamsCards.sort((a, b) => {
        const pointsA = parseFloat(a.dataset.points) || 0;
        const pointsB = parseFloat(b.dataset.points) || 0;
        if (pointsA === pointsB) {
            const updDifference =
                new Date(b.dataset.upd).getTime() - new Date(a.dataset.upd).getTime() >
                    1 ?
                    1 :
                    -1;
            return pointsB - pointsA + updDifference;
        }
        return pointsB - pointsA;
    });

    let i = 0;

    teamsCards.forEach((card, index) => {
        const cardTitle = card.querySelector(".pr-team-name");
        if (Number(card.dataset.points) === 0) {
            card.classList.add("inactive");
        }
        if (Number(card.dataset.points) > 0 && i < 3) {
            i++;
        }
        card.dataset.sort = index + 1;

        cardTitle.insertAdjacentHTML(
            "beforeEnd",
            `
      <span>
        ${getPlaceString(card.dataset.sort)} <span>place</span>
      </span>
    `
        );
    });

    teamsCards
        .filter((e) => e.dataset.sort === `${i}`)[0]
        .classList.add("battle");
};

let currentTeam = null;

const teamNames = []; //TODO: move it to getIdList
const characters = []; //TODO: move it to getIdList

const getIdList = () => {
    const el = document.getElementById("pr-teams-data-list");
    if (!el) return;
    const teamsIdsElements = el.querySelectorAll(".pr-team-data");
    const teamIds = [];
    teamsIdsElements.forEach((e) => {
        const id = e.dataset.teamId;
        const name = e.dataset.teamName;
        const character = e.dataset.teamCharacter;
        teamIds.push(id);
        teamNames.push(name);
        characters.push(character);
    });
    el.remove();
    return teamIds;
};

const idList = getIdList(); //TODO: move it to getIdList

// console.log(teamNames, characters);

const setIcons = (context) => {
    teamNames.forEach((t, index) => {
        setIcon(t, characters[index], context);
    })
}

const checkId = () => {

    const checkCookie = Cookies.get("teamId");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const teamId =
        checkCookie !== null && idList.indexOf(checkCookie) > -1 ?
            checkCookie :
            urlParams.get("id") !== null && idList.indexOf(urlParams.get("id")) > -1 ?
                urlParams.get("id") :
                null;
    if (teamId === null) {
        window.location.replace("/playson-rewards");
        return;
    }
    Cookies.set("teamId", teamId);
    // console.log(teamNames);
    currentTeam = teamNames[idList.indexOf(teamId)];
};

const setCurrentCategory = (context) => {
    const currentItem = context.querySelector(`[data-item-is="${currentTeam}"]`);
    const list = context.querySelector(".pr-range-list");
    const wrapper = list.closest(".w-container");
    const button = wrapper.querySelector(".button");
    if (!list) return;
    const rows = context.querySelectorAll(".pr-range-row");
    if (rows.length > 6) {
        list.classList.add("contracted");
    } else {
        button.remove();
    }
    if (!currentItem) return;
    currentItem.classList.add("active");
    if (Number(currentItem.dataset.sort) > 6) {
        list.classList.add("contracted-long");
    }
    if (!button) return;
    button.addEventListener("click", () => {
        list.classList.remove("contracted");
        button.remove();
    });

    const showMessage = () => {
        const place = Number(currentItem.dataset.sort);
        const points = Number(currentItem.dataset.points);
        let placeNum;

        if (points === 0) {
            placeNum = "0";
        } else if (place < 4) {
            placeNum = "1-3";
        } else if (place < 11) {
            placeNum = "4-10";
        } else {
            placeNum = "11+";
        }

        const message = context.querySelector(
            `.pr-message[data-place="${placeNum}"]`
        );
        if (!message) return;
        message.classList.add("visible");
        const placeNumText = message.querySelector(".pr-message_place");
        if (placeNumText) placeNumText.innerText = getPlaceString(place);
    };

    showMessage();
};

const initAccordion = () => {
    const items = document.querySelectorAll(".pr-earn-points_row");
    if (!items) return;
    items.forEach((el) => {
        const hiddenDescr = el.querySelector(".pr-earn-points_description");
        if (hiddenDescr.classList.contains("w-condition-invisible")) {
            return;
        } else {
            el.classList.add("toggle");
        }
        el.addEventListener("click", (e) => {
            e.target.closest(".pr-earn-points_row").classList.toggle("opened");
        });
    });
};

const initForm = () => {
    const path = window.location.pathname.split("/");
    const slug = path[path.length - 1];
    const id = "3EaLRB";
    const url =
        `https://tally.so/embed/${id}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;
    console.log(currentTeam);
    const newUrl =
        url +
        "&team=" +
        currentTeam +
        "&category=" +
        slug;
    const iframe = document.querySelector(".file-upload");
    iframe.dataset.tallySrc = newUrl;
};

checkId();
setIcons(totalRangeList);
setIcons(monthlyRangeList);
sortCards(totalRangeList);
sortCards(monthlyRangeList);
setCurrentCategory(totalRangeList);
setCurrentCategory(monthlyRangeList);
initAccordion();
initForm();
Tally.loadEmbeds();
