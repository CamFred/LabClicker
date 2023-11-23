const generators = [
    { name: "Petri Dish Cultures", cost: 10, production: 1, quantity: 0 },
    { name: "Automated Pipettes", cost: 100, production: 10, quantity: 0 },
    { name: "Genetic Sequencers", cost: 1000, production: 100, quantity: 0 },
    { name: "Microscopes", cost: 10000, production: 1000, quantity: 0 },
    { name: "Bioreactors", cost: 100000, production: 10000, quantity: 0 },
    { name: "CRISPR Kits", cost: 1000000, production: 100000, quantity: 0 },
    { name: "Protein Synthesizers", cost: 10000000, production: 1000000, quantity: 0 },
    { name: "Automated Harvesters", cost: 100000000, production: 10000000, quantity: 0 },
    { name: "Cell Culture Chambers", cost: 1000000000, production: 100000000, quantity: 0 },
    { name: "Gene Libraries", cost: 10000000000, production: 1000000000, quantity: 0 },
    { name: "Fermentation Tanks", cost: 100000000000, production: 10000000000, quantity: 0 },
    { name: "AI-Assisted Analysis", cost: 1000000000000, production: 100000000000, quantity: 0 },
    { name: "Robotic Lab Assistants", cost: 10000000000000, production: 1000000000000, quantity: 0 },
    { name: "Nano-Fertilizers", cost: 100000000000000, production: 10000000000000, quantity: 0 },
    { name: "Hyperbaric Growth Chambers", cost: 1000000000000000, production: 100000000000000, quantity: 0 },
    { name: "Enzyme Infusers", cost: 10000000000000000, production: 1000000000000000, quantity: 0 },
    { name: "Molecular Printers", cost: 100000000000000000, production: 10000000000000000, quantity: 0 },
    { name: "Quantum Computers", cost: 1000000000000000000, production: 100000000000000000, quantity: 0 },
    { name: "Synthetic Biology Labs", cost: 10000000000000000000, production: 1000000000000000000, quantity: 0 },
    { name: "Orbital Growth Stations", cost: 100000000000000000000, production: 10000000000000000000, quantity: 0 }
    // Add all generators here with increasing cost and production
];

const generatorImages = {
	"Petri Dish Cultures": "images/01.png",
	"Automated Pipettes": "images/02.png",
	"Genetic Sequencers": "images/03.png",
	"Microscopes": "images/04.png",
	"Bioreactors": "images/05.png",
	"CRISPR Kits": "images/05.png",
    "Protein Synthesizers": "images/05.png",
    "Automated Harvesters": "images/05.png",
    "Cell Culture Chambers": "images/05.png",
    "Gene Libraries": "images/05.png",
    "Fermentation Tanks": "images/05.png",
    "AI-Assisted Analysis": "images/05.png",
    "Robotic Lab Assistants": "images/05.png",
    "Nano-Fertilizers": "images/05.png",
    "Hyperbaric Growth Chambers": "images/05.png",
    "Enzyme Infusers": "images/05.png",
    "Molecular Printers": "images/05.png",
    "Quantum Computers": "images/05.png",
    "Synthetic Biology Labs": "images/05.png",
    "Orbital Growth Stations": "images/05.png",
}

let casein = 0;
let capital = 10;
let totalCaseinProduced = 10;
let caseinConvertedToCapital = 0;


function formatNumber(num) {
    if (num < 1000) {
        return num; // return the same number if less than 1000
    }
	let suffixes = ["", "K", "M", "B", "T", "P", "E", "Z", "Y"]; // Extended to higher magnitudes    
	let i = Math.floor(Math.log(num) / Math.log(1000));
    let formattedNumber = parseFloat((num / Math.pow(1000, i)).toFixed(1));
    return formattedNumber + suffixes[i];
}

function updateGeneratorDisplay(index) {
    let gen = generators[index];
    let button = document.getElementById('generatorButton' + index);
    let costSpan = document.getElementById('generatorCost' + index);
    let genRow = document.getElementById('generatorRow' + index);

    // Determine if the generator row should be visible
    let isVisible = index === 0 || generators[index - 1].quantity > 0;

    if (gen.quantity === 0 && isVisible) {
        button.innerText = 'Unlock';
		button.classList.add('locked');
		button.classList.remove('unlocked');
        costSpan.innerText = `Cost: $${formatNumber(gen.cost)}`;
        genRow.style.display = 'flex'; // Show the row
    } else if (gen.quantity > 0) {
        button.innerText = 'Buy';
		button.classList.remove('locked');
		button.classList.add('unlocked');

		costSpan.innerHTML = `Cost: $${formatNumber(gen.cost)}<br>Owned: ${gen.quantity}`; // Use innerHTML to include a line break

		
        genRow.style.display = 'flex'; // Show the row
    } else {
        genRow.style.display = 'none'; // Hide the row
    }
}

function buyGenerator(index) {
    const gen = generators[index];
    if (capital >= gen.cost) {
        capital -= gen.cost;
        gen.quantity++;
        gen.cost *= 2;
        updateGeneratorDisplay(index);
        if (index + 1 < generators.length) {
            updateGeneratorDisplay(index + 1);
        }
    }
}

function generateCasein(amount) {
    casein += amount;
    totalCaseinProduced += amount;
    document.getElementById("caseinCount").innerText = formatNumber(casein);
    convertCaseinToCapital();
}

function convertCaseinToCapital() {
    let newCaseinForConversion = totalCaseinProduced - caseinConvertedToCapital;
    let dollarsToAdd = Math.floor(newCaseinForConversion / 100);
    capital += dollarsToAdd;
    caseinConvertedToCapital += dollarsToAdd * 100;
    document.getElementById("capitalCount").innerText = formatNumber(capital);
}

function updateCasein() {
    const totalProduction = generators.reduce((total, gen) => total + gen.production * gen.quantity, 0);
    generateCasein(totalProduction);
}


function adjustSidebarHeight() {
    const gameContainer = document.querySelector('.game-container');
    const gameSidebar = document.querySelector('.game-sidebar');

    if (gameContainer && gameSidebar) {
        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                // Set the sidebar height to match the game container's height
                gameSidebar.style.height = `${entry.contentRect.height}px`;
            }
        });

        // Start observing the game container
        observer.observe(gameContainer);
    }
}


function createGeneratorRow(gen, index) {
    const genRow = document.createElement("div");
    genRow.id = 'generatorRow' + index;
    genRow.classList.add('generator-row');

    // Add icon
    const iconDiv = document.createElement("div");
    iconDiv.classList.add('generator-icon');
    if (generatorImages[gen.name]) {
        iconDiv.style.backgroundImage = `url('${generatorImages[gen.name]}')`;
    }
    genRow.appendChild(iconDiv);

    // Add name
    const nameSpan = document.createElement("span");
    nameSpan.innerText = gen.name;
    nameSpan.classList.add('generator-name');
    genRow.appendChild(nameSpan);

    // Add cost and owned
    const costSpan = document.createElement("span");
    costSpan.id = 'generatorCost' + index;
    costSpan.classList.add('generator-cost');
    costSpan.innerHTML = `Cost: $${formatNumber(gen.cost)}<br>Owned: ${gen.quantity}`;
    genRow.appendChild(costSpan);

    // Add button
    const button = document.createElement("button");
    button.id = 'generatorButton' + index;
    button.onclick = () => buyGenerator(index);
    genRow.appendChild(button);

    return genRow;
}

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}



window.onload = () => {
    adjustSidebarHeight();

    document.getElementById("caseinCount").innerText = formatNumber(casein);
    document.getElementById("capitalCount").innerText = formatNumber(capital);

    const genContainer = document.getElementById("generators");
    generators.forEach((gen, index) => {
        const genRow = createGeneratorRow(gen, index);
        genContainer.appendChild(genRow);
        updateGeneratorDisplay(index);
    });

    setInterval(updateCasein, 10);
	
	 // Open the Lab tab by default
    document.getElementById("defaultOpen").click();
};
