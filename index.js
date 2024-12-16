
const addItemInput = document.getElementById('addItem');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');
const shoppingList = document.getElementById('shoppingList');

// Retrieve existing shopping list from localStorage
let itemArray = JSON.parse(localStorage.getItem('shoppingList')) || [];

// Function to update the list display in the HTML
function updateListDisplay() {
    shoppingList.innerHTML = "";

    // Loop through the array and create a list of items
    itemArray.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item.name;

        // Apply strikethrough and background color if the item is purchased
        if (item.purchased) {
            li.classList.add('purchased');
        }

        // Add an event listener to toggle the purchased status
        li.addEventListener('click', () => togglePurchased(index));

        // Create a delete button for each item
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent event from triggering togglePurchased
            deleteItem(index);
        });

        li.appendChild(deleteBtn);
        shoppingList.appendChild(li);
    });

    // Save updated shopping list to localStorage
    localStorage.setItem('shoppingList', JSON.stringify(itemArray));
}

// Function to add an item to the list
function addItem() {
    const itemName = addItemInput.value.trim();
    if (itemName) {
        itemArray.push({ name: itemName, purchased: false });
        addItemInput.value = '';
        updateListDisplay();
    }
}

// Function to toggle an item's purchased status
function togglePurchased(index) {
    itemArray[index].purchased = !itemArray[index].purchased;
    updateListDisplay();
}

// Function to delete an item from the list
function deleteItem(index) {
    itemArray.splice(index, 1);
    updateListDisplay();
}

// Function to clear all items from the list
function clearList() {
    itemArray = [];
    updateListDisplay();
}

// Event listeners for the buttons
addBtn.addEventListener('click', addItem);
clearBtn.addEventListener('click', clearList);

// Event listener to add items using the Enter key
addItemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addItem();
    }
});


updateListDisplay();
