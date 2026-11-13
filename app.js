
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

    // Update the table
    displaySubscriptions();

    // Clear the form
    subscriptionForm.reset();

});


// Display subscriptions in the table
function displaySubscriptions() {

    // Clear previous table rows
    subscriptionList.innerHTML = "";

    // Loop through subscriptions
    subscriptions.forEach(function(subscription, index) {

        const row = createElement("tr");

        // Create table cells
        row.appendChild(createTableCell(subscription.service));
        row.appendChild(createTableCell(subscription.provider));
        row.appendChild(createTableCell(subscription.subscriber));
        row.appendChild(createTableCell(formatDate(subscription.renewalDate)));
        row.appendChild(createTableCell(subscription.category));
        row.appendChild(createTableCell(getSubscriptionStatus(subscription.renewalDate)));

        // Create Delete button
        const actionCell = createElement("td");
        const deleteButton = createButton("Delete", "button button-danger");

        // Delete subscription when clicked
        deleteButton.addEventListener("click", function() {
            subscriptions.splice(index, 1);
            displaySubscriptions();
        });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        // Add row to the table
        subscriptionList.appendChild(row);

    });

}
