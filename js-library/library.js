
/* =================================
   1. SELECT HTML ELEMENTS
================================= */

function getElement(id) {
    return document.getElementById(id);
}


/* =================================
   2. CREATE HTML ELEMENTS
================================= */

function createElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    if (text !== undefined) {
        element.textContent = text;
    }

    return element;
}


/* =================================
   3. FORMAT DATES
================================= */

function formatDate(dateString) {
    const parts = dateString.split("-");

    const date = new Date(
        Number(parts[0]),
        Number(parts[1]) - 1,
        Number(parts[2])
    );

    return date.toLocaleDateString();
}


/* =================================
   4. CHECK SUBSCRIPTION STATUS
================================= */

function getSubscriptionStatus(renewalDate) {
    const today = new Date();

    const currentDate =
        today.getFullYear() + "-" +
        String(today.getMonth() + 1).padStart(2, "0") + "-" +
        String(today.getDate()).padStart(2, "0");

    if (renewalDate < currentDate) {
        return "Expired";
    }

    return "Active";
}


/* =================================
   5. CREATE TABLE CELLS
================================= */

function createTableCell(text) {
    const cell = createElement("td", "", text);

    return cell;
}


/* =================================
   6. CREATE BUTTONS
================================= */

function createButton(text, className) {
    const button = createElement("button", className, text);

    button.type = "button";

    return button;
}
