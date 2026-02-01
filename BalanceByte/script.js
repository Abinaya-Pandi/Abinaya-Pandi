// Navigation System
function navigateTo(viewId) {
    document.querySelectorAll('.view').forEach(view => {
        view.style.display = 'none';
    });
    document.getElementById(viewId).style.display = 'block';
}

// Core Innovation: Meal Analysis Logic
function analyzeMeal() {
    const hasCarbs = document.getElementById('check-carbs').checked;
    const hasProtein = document.getElementById('check-protein').checked;
    const hasVeg = document.getElementById('check-veg').checked;
    const water = parseInt(document.getElementById('water-intake').value);

    let resultText = "";
    let resultDesc = "";
    let suggestions = [];
    let statusClass = "";

    // Dummy logic for balance detection
    if (hasCarbs && hasProtein && hasVeg && water >= 2) {
        resultText = "✅ Balanced Meal";
        resultDesc = "Great job! This meal provides a steady energy release.";
        statusClass = "balanced";
        suggestions.push("Keep this up for your next meal!");
    } else if (hasCarbs && hasProtein) {
        resultText = "⚠️ Slightly Unbalanced";
        resultDesc = "You have good energy and repair sources, but you're missing micronutrients.";
        suggestions.push("Try adding a small fruit or a handful of greens.");
        if (water < 2) suggestions.push("Drink one more glass of water.");
    } else {
        resultText = "❌ Unbalanced Meal";
        resultDesc = "This meal might leave you feeling tired later.";
        suggestions.push("Focus on adding a vegetable and some protein.");
        suggestions.push("Hydration is key—try to drink some water now.");
    }

    // Update UI
    document.getElementById('result-text').innerText = resultText;
    document.getElementById('result-desc').innerText = resultDesc;
    
    const suggestDiv = document.getElementById('suggestions');
    suggestDiv.innerHTML = suggestions.map(s => `<p>• ${s}</p>`).join('');

    // Update Scores on Dashboard
    updateDashboard(hasCarbs, hasProtein, hasVeg, water);
    
    navigateTo('view-analysis');
}

function updateDashboard(c, p, v, w) {
    let mealScore = (c ? 33 : 0) + (p ? 33 : 0) + (v ? 34 : 0);
    let waterScore = Math.min(w * 20, 100);

    document.getElementById('bar-meal').style.width = mealScore + "%";
    document.getElementById('bar-water').style.width = waterScore + "%";
}

// Motivational Quotes
const quotes = [
    "Small steps lead to big changes.",
    "Fuel your body, don't just fill it.",
    "Progress over perfection, always."
];
document.getElementById('daily-quote').innerText = quotes[Math.floor(Math.random() * quotes.length)];

function processPostMeal() {
    const feeling = document.getElementById('post-feeling').value;
    
    if (feeling === "energized") {
        alert("Great! Your meal choice matched your energy needs perfectly.");
    } else if (feeling === "tired") {
        alert("Take note: You might need more protein or less heavy carbs next time to avoid the energy crash.");
    } else {
        alert("Check-in saved! Let's see your overall progress.");
    }

    navigateTo('view-dashboard');
}