
// Get the form and subscription table
const subscriptionForm = getElement("subscription-form");
const subscriptionList = getElement("subscription-list");

// Load saved subscriptions from Local Storage
let subscriptions = JSON.parse(localStorage.getItem("subscriptions")) || [];


// Add a new subscription
subscriptionForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get values from the form
    const service = getElement("service").value.trim();
    const provider = getElement("provider").value.trim();
    const subscriber = getElement("subscriber").value.trim();
    const renewalDate = getElement("renewal-date").value;
    const category = getElement("category").value;

    // Create a subscription object
    const subscription = {
        service: service,
        provider: provider,
        subscriber: subscriber,
        renewalDate: renewalDate,
        category: category
    };

    // Add subscription to the array
    subscriptions.push(subscription);

    // Save and update the application
    saveSubscriptions();
    displaySubscriptions();
    updateSummary();

    // Clear the form
    subscriptionForm.reset();

});


// Save subscriptions in Local Storage
function saveSubscriptions() {

    localStorage.setItem("subscriptions", JSON.stringify(subscriptions));

}


// Display subscriptions in the table
function displaySubscriptions() {

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
        const deleteButton = createButton("Delete", "button button-danger");

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


// Update subscription statistics
function updateSummary() {

    const total = subscriptions.length;

    let expired = 0;

    subscriptions.forEach(function(subscription) {

        if (getSubscriptionStatus(subscription.renewalDate) === "Expired") {
            expired++;
        }

    });

    getElement("total-subscriptions").textContent = total;
    getElement("expired-subscriptions").textContent = expired;

}


// Load and display saved subscriptions when the page opens
displaySubscriptions();
updateSummary();
