const API_BASE = 'http://127.0.0.1:5000';
const ALL_SUBSTANCES = [
    // ...same as before, full list...
];
let lastChecked = [];

// Fetch and display available reactions
async function loadReactions() {
    const res = await fetch(`${API_BASE}/reactions`);
    const reactions = await res.json();
    const list = document.getElementById('reactions-list');
    list.innerHTML = '';
    reactions.forEach(r => {
        const li = document.createElement('li');
        li.textContent = `${r.reactants.join(' + ')} → ${r.products} (${r.reactionType})`;
        list.appendChild(li);
    });
    renderReactantOptions(ALL_SUBSTANCES);
}

// Render reactant checkboxes (with optional filter)
function renderReactantOptions(substances) {
    const optionsDiv = document.getElementById('reactant-options');
    optionsDiv.innerHTML = '';
    // Show only the first 30 by default, then allow search for more
    const toShow = substances.slice(0, 30);
    toShow.forEach(reactant => {
        const label = document.createElement('label');
        label.className = 'reactant-label';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = reactant;
        if (lastChecked.includes(reactant)) checkbox.checked = true;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(' ' + reactant));
        optionsDiv.appendChild(label);
    });
    if (substances.length > 30) {
        const more = document.createElement('div');
        more.style.textAlign = 'center';
        more.style.marginTop = '0.7rem';
        more.style.color = '#3a7bd5';
        more.style.fontWeight = '500';
        more.textContent = `Showing 30 of ${substances.length} substances. Use search to find more.`;
        optionsDiv.appendChild(more);
    }
}

// Search/filter substances
window.addEventListener('DOMContentLoaded', function() {
    document.getElementById('search-box').addEventListener('input', function() {
        const val = this.value.trim().toLowerCase();
        const filtered = ALL_SUBSTANCES.filter(s => s.toLowerCase().includes(val));
        renderReactantOptions(filtered);
    });
});

// Handle simulation form submit
window.addEventListener('DOMContentLoaded', function() {
    document.getElementById('reaction-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        lastChecked = Array.from(document.querySelectorAll('#reactant-options input:checked')).map(cb => cb.value);
        if (lastChecked.length === 0) {
            alert('Please select at least one reactant.');
            return;
        }
        const res = await fetch(`${API_BASE}/simulate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reactants: lastChecked })
        });
        const result = await res.json();
        const resultSection = document.getElementById('result-section');
        const output = document.getElementById('result-output');
        const visual = document.getElementById('visual-effect');
        if (result.error) {
            output.innerHTML = `<span class="error">${result.error}</span>`;
            visual.innerHTML = '';
            animateGlassware('error');
        } else {
            output.innerHTML = `
                <strong>Products:</strong> ${result.products}<br>
                <strong>Reaction Type:</strong> ${result.reactionType}<br>
                <strong>Energy:</strong> ${result.energy}<br>
                <strong>Visual:</strong> ${result.visual.replace('_', ' ')}
            `;
            showVisualEffect(result.visual);
            animateGlassware(result.visual);
        }
        resultSection.style.display = 'block';
        document.getElementById('reset-btn').style.display = 'inline-block';
    });
});

// Reset button
window.addEventListener('DOMContentLoaded', function() {
    document.getElementById('reset-btn').addEventListener('click', function() {
        lastChecked = [];
        document.getElementById('result-section').style.display = 'none';
        document.getElementById('result-output').innerHTML = '';
        document.getElementById('visual-effect').innerHTML = '';
        document.getElementById('reaction-form').reset();
        renderReactantOptions(ALL_SUBSTANCES);
        resetGlassware();
    });
});

// About modal
window.addEventListener('DOMContentLoaded', function() {
    document.getElementById('about-link').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('about-modal').style.display = 'block';
    });
    document.getElementById('close-modal').addEventListener('click', function() {
        document.getElementById('about-modal').style.display = 'none';
    });
    window.onclick = function(event) {
        if (event.target == document.getElementById('about-modal')) {
            document.getElementById('about-modal').style.display = 'none';
        }
    }
});

// Navigation logic
window.addEventListener('DOMContentLoaded', function() {
    const navExperiment = document.getElementById('nav-experiment');
    const navReactions = document.getElementById('nav-reactions');
    const navAbout = document.getElementById('nav-about');
    const experimentSection = document.getElementById('experiment-section');
    const reactionsSection = document.getElementById('reactions-section');
    const aboutModal = document.getElementById('about-modal');
    // Set initial state
    navExperiment.classList.add('active');
    experimentSection.style.display = '';
    reactionsSection.style.display = 'none';
    // Navigation events
    navExperiment.onclick = function() {
        navExperiment.classList.add('active');
        navReactions.classList.remove('active');
        experimentSection.style.display = '';
        reactionsSection.style.display = 'none';
        aboutModal.style.display = 'none';
    };
    navReactions.onclick = function() {
        navReactions.classList.add('active');
        navExperiment.classList.remove('active');
        experimentSection.style.display = 'none';
        reactionsSection.style.display = '';
        aboutModal.style.display = 'none';
    };
    navAbout.onclick = function() {
        aboutModal.style.display = 'block';
    };
    // About modal close
    document.getElementById('close-modal').onclick = function() {
        aboutModal.style.display = 'none';
    };
    window.onclick = function(event) {
        if (event.target == aboutModal) {
            aboutModal.style.display = 'none';
        }
    };
});

// Visual effect for reactions
function showVisualEffect(type) {
    const visual = document.getElementById('visual-effect');
    if (type === 'color_change') {
        visual.innerHTML = '🧪 The solution changes color!';
    } else if (type === 'white_precipitate') {
        visual.innerHTML = '⚗ A white precipitate forms!';
    } else if (type === 'bubbles' || type === 'gas') {
        visual.innerHTML = '💨 Bubbles and gas are released!';
    } else if (type === 'explosion') {
        visual.innerHTML = '💥 An explosion occurs!';
    } else if (type === 'error') {
        visual.innerHTML = '';
    } else {
        visual.innerHTML = '✨ Something interesting happens!';
    }
}

// Animate glassware for fun
function animateGlassware(type) {
    const beaker = document.querySelector('.beaker');
    const flask = document.querySelector('.flask');
    const testTube = document.querySelector('.test-tube');
    const burette = document.querySelector('.burette');
    const pipette = document.querySelector('.pipette');
    const conical = document.querySelector('.conical-flask');
    const watchGlass = document.querySelector('.watch-glass');
    const funnel = document.querySelector('.funnel');
    const burner = document.querySelector('.burner');
    const tripod = document.querySelector('.tripod');
    resetGlassware();
    if (type === 'color_change') {
        beaker && (beaker.style.boxShadow = '0 0 32px 8px #4fc3f7');
        flask && (flask.style.boxShadow = '0 0 32px 8px #4fc3f7');
        conical && (conical.style.boxShadow = '0 0 32px 8px #4fc3f7');
    } else if (type === 'white_precipitate') {
        flask && (flask.style.boxShadow = '0 0 32px 8px #fff');
        testTube && (testTube.style.boxShadow = '0 0 32px 8px #fff');
        watchGlass && (watchGlass.style.boxShadow = '0 0 32px 8px #fff');
    } else if (type === 'bubbles' || type === 'gas') {
        testTube && (testTube.style.boxShadow = '0 0 32px 8px #b2dfdb');
        pipette && (pipette.style.boxShadow = '0 0 32px 8px #b2dfdb');
    } else if (type === 'explosion') {
        beaker && (beaker.style.boxShadow = '0 0 48px 16px #ff5252');
        flask && (flask.style.boxShadow = '0 0 48px 16px #ff5252');
        testTube && (testTube.style.boxShadow = '0 0 48px 16px #ff5252');
        burner && (burner.style.boxShadow = '0 0 48px 16px #ff5252');
        tripod && (tripod.style.boxShadow = '0 0 48px 16px #ff5252');
    }
}
function resetGlassware() {
    document.querySelectorAll('.beaker, .flask, .test-tube, .burette, .pipette, .conical-flask, .watch-glass, .funnel, .burner, .tripod').forEach(el => {
        el.style.boxShadow = 'none';
    });
}

// Initial load
window.addEventListener('DOMContentLoaded', loadReactions);

// Fetch all reactions from backend
fetch('http://127.0.0.1:5000/reactions')
.then(response => response.json())
.then(data => {
    console.log('All reactions:', data);
    // You can display these reactions in your UI
});

// Example function to simulate a reaction
function simulateReaction(reactants) {
fetch('http://127.0.0.1:5000/simulate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reactants: reactants })
})
    .then(response => response.json())
    .then(data => {
      console.log('Simulation result:', data);
      // You can update your UI with the result here
    });
}

// Example usage:
simulateReaction(['H2', 'O2']); // Replace with user input as needed