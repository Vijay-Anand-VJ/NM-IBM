const API_URL = 'http://localhost:3000/books';

// 1. GET & DISPLAY (Read + Filters)
async function refreshStack(filterType = '') {
    let url = API_URL;

    // Apply Filters (Assignments Requirement)
    if (filterType === 'recent') url += '?new=true';
    if (filterType === 'fiction') url += '?category=Fiction';

    try {
        const res = await fetch(url);
        const data = await res.json();
        const container = document.getElementById('stack-container');
        
        container.innerHTML = ''; // Clear the stack

        data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'stack-item';
            
            // Logic: Is stock safe?
            const isStockLow = item.availableCopies === 0;
            const stockColor = isStockLow ? 'red' : 'black';

            div.innerHTML = `
                <div class="item-info">
                    <strong>${item.title.toUpperCase()}</strong>
                    <span class="tag">${item.category}</span>
                    <small>By ${item.author} | ${item.publishedYear}</small>
                    
                    <div style="margin-top:10px; font-weight:bold; color:${stockColor}; display:flex; align-items:center; gap:10px;">
                        STOCK: ${item.availableCopies}
                        
                        <button onclick="updateStock('${item._id}', -1)" style="cursor:pointer; font-weight:bold; padding:2px 8px; border:2px solid black;">-</button>
                        <button onclick="updateStock('${item._id}', 1)" style="cursor:pointer; font-weight:bold; padding:2px 8px; border:2px solid black; background:black; color:white;">+</button>
                    </div>
                </div>
                
                <button class="btn-del" onclick="popItem('${item._id}')">X</button>
            `;
            container.appendChild(div);
        });
    } catch (err) {
        console.error("Error fetching stack:", err);
    }
}

// 2. PUSH TO STACK (Create)
async function pushData() {
    const title = document.getElementById('p-title').value;
    const author = document.getElementById('p-author').value;
    const category = document.getElementById('p-category').value;
    const publishedYear = document.getElementById('p-year').value;
    const availableCopies = document.getElementById('p-copies').value;

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, author, category, publishedYear, availableCopies })
        });

        if (res.ok) {
            refreshStack(); // Update the list
            // Clear all inputs
            document.querySelectorAll('input').forEach(el => el.value = '');
        } else {
            const err = await res.json();
            alert('STACK ERROR: ' + err.error); // Handles Negative Stock Error
        }
    } catch (err) {
        console.error("Error pushing data:", err);
    }
}

// 3. UPDATE STOCK (Update)
async function updateStock(id, change) {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ change: change })
        });

        const data = await res.json();

        if (res.ok) {
            refreshStack(); // Refresh to show new number
        } else {
            alert('UPDATE FAILED: ' + data.error); // Shows "Stock cannot be negative"
        }
    } catch (err) {
        console.error("Error updating stock:", err);
    }
}

// 4. REMOVE ITEM (Delete)
async function popItem(id) {
    if(!confirm('REMOVE ITEM FROM STACK?')) return;
    
    try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        const data = await res.json();

        if(res.ok) {
            refreshStack();
        } else {
            alert('DELETE ERROR: ' + data.message); // Shows "Cannot delete if copies > 0"
        }
    } catch (err) {
        console.error("Error deleting item:", err);
    }
}

// Init
refreshStack();