
// Get the form and subscription table
const subscriptionForm = getElement("subscription-form");
const subscriptionList = getElement("subscription-list");

// Store subscriptions
let subscriptions = [];


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

    // Update table and summary
    displaySubscriptions();
    updateSummary();

    // Clear the form
    subscriptionForm.reset();

});


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

    // Calculate total subscriptions
    const total = subscriptions.length;

    // Count expired subscriptions
    let expired = 0;

    subscriptions.forEach(function(subscription) {

        if (getSubscriptionStatus(subscription.renewalDate) === "Expired") {
            expired++;
        }

    });

    // Display the results
    getElement("total-subscriptions").textContent = total;
    getElement("expired-subscriptions").textContent = expired;

}

