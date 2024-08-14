const arrayContainer = document.getElementById('array-container');
const sortButton = document.getElementById('sortButton');
const shuffleButton = document.getElementById('shuffleButton');
const arrayInput = document.getElementById('arrayInput');
const algorithmSelect = document.getElementById('algorithmSelect');
let array = [];

// Generate an array from user input
function generateArrayFromInput() {
    array = arrayInput.value.split(',').map(Number);
    renderArray();
}

// Render the array as bars in the container
function renderArray() {
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.style.height = `${value * 3}px`;
        bar.classList.add('bar');

        const valueLabel = document.createElement('span');
        valueLabel.innerText = value;

        bar.appendChild(valueLabel);
        arrayContainer.appendChild(bar);
    });
}

// Bubble Sort visualization
async function bubbleSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = 'red';
            bars[j + 1].style.backgroundColor = 'red';
            
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                bars[j].style.height = `${array[j] * 3}px`;
                bars[j + 1].style.height = `${array[j + 1] * 3}px`;
                bars[j].children[0].innerText = array[j];
                bars[j + 1].children[0].innerText = array[j + 1];
            }

            await new Promise(resolve => setTimeout(resolve, 1000));
            bars[j].style.backgroundColor = '#3498db';
            bars[j + 1].style.backgroundColor = '#3498db';
        }
        bars[array.length - i - 1].style.backgroundColor = 'green';
    }
    bars[0].style.backgroundColor = 'green';
}

// Selection Sort visualization
async function selectionSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        bars[i].style.backgroundColor = 'red';

        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = 'yellow';

            if (array[j] < array[minIndex]) {
                if (minIndex !== i) {
                    bars[minIndex].style.backgroundColor = '#3498db';
                }
                minIndex = j;
            }

            await new Promise(resolve => setTimeout(resolve, 1000));
            bars[j].style.backgroundColor = '#3498db';
        }

        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            bars[i].style.height = `${array[i] * 3}px`;
            bars[minIndex].style.height = `${array[minIndex] * 3}px`;
            bars[i].children[0].innerText = array[i];
            bars[minIndex].children[0].innerText = array[minIndex];
        }
        bars[i].style.backgroundColor = 'green';
    }
    bars[array.length - 1].style.backgroundColor = 'green';
}

// Insertion Sort visualization
async function insertionSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        bars[i].style.backgroundColor = 'red';

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j] * 3}px`;
            bars[j + 1].children[0].innerText = array[j];
            j--;

            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${key * 3}px`;
        bars[j + 1].children[0].innerText = key;
        bars[i].style.backgroundColor = 'green';
    }
    bars[array.length - 1].style.backgroundColor = 'green';
}

// Shuffle the array
function shuffleArray() {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    renderArray();
}

// Sort the array based on the selected algorithm
function sortArray() {
    const selectedAlgorithm = algorithmSelect.value;
    switch (selectedAlgorithm) {
        case 'bubble':
            bubbleSort();
            break;
        case 'selection':
            selectionSort();
            break;
        case 'insertion':
            insertionSort();
            break;
        default:
            break;
    }
}

sortButton.addEventListener('click', sortArray);
shuffleButton.addEventListener('click', shuffleArray);
arrayInput.addEventListener('input', generateArrayFromInput);

// Initialize the array
generateArrayFromInput();
