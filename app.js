
// Get subscriptions from Local Storage
let subscriptions = JSON.parse(localStorage.getItem("subscriptions")) || [];


// =================================
// 1. SAVE SUBSCRIPTIONS
// =================================

function saveSubscriptions() {
    localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
}


// =================================
// 2. ADD SUBSCRIPTION
// =================================

const subscriptionForm = getElement("subscription-form");

if (subscriptionForm) {

    subscriptionForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const service = getElement("service").value.trim();
        const provider = getElement("provider").value.trim();
        const subscriber = getElement("subscriber").value.trim();
        const renewalDate = getElement("renewal-date").value;
        const category = getElement("category").value;

        const subscription = {
            service: service,
            provider: provider,
            subscriber: subscriber,
            renewalDate: renewalDate,
            category: category
        };

        subscriptions.push(subscription);

        saveSubscriptions();

        subscriptionForm.reset();

        alert("Subscription added successfully!");

        window.location.href = "subscriptions.html";

    });

}


// =================================
// 3. DISPLAY SUBSCRIPTIONS
// =================================

function displaySubscriptions() {

    const subscriptionList = getElement("subscription-list");

    if (!subscriptionList) {
        return;
    }

    subscriptionList.innerHTML = "";

    subscriptions.forEach(function(subscription, index) {

        const row = createElement("tr");

        row.appendChild(createTableCell(subscription.service));
        row.appendChild(createTableCell(subscription.provider));
        row.appendChild(createTableCell(subscription.subscriber));
        row.appendChild(createTableCell(formatDate(subscription.renewalDate)));
        row.appendChild(createTableCell(subscription.category));
        row.appendChild(createTableCell(getSubscriptionStatus(subscription.renewalDate)));

        // Create Delete button
        const actionCell = createElement("td");

        const deleteButton = createButton(
            "Delete",
            "button button-danger"
        );

        deleteButton.addEventListener("click", function() {

            subscriptions.splice(index, 1);

            saveSubscriptions();

            displaySubscriptions();

            updateSummary();

        });

        actionCell.appendChild(deleteButton);

        row.appendChild(actionCell);

        subscriptionList.appendChild(row);

    });

}


// =================================
// 4. UPDATE SUMMARY
// =================================

function updateSummary() {

    const totalElement = getElement("total-subscriptions");
    const expiredElement = getElement("expired-subscriptions");

    const total = subscriptions.length;

    let expired = 0;

    subscriptions.forEach(function(subscription) {

        if (getSubscriptionStatus(subscription.renewalDate) === "Expired") {
            expired++;
        }

    });

    if (totalElement) {
        totalElement.textContent = total;
    }

    if (expiredElement) {
        expiredElement.textContent = expired;
    }

}


// =================================
// 5. INITIALIZE PAGE
// =================================

displaySubscriptions();
updateSummary();
