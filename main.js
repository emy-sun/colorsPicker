let uniqIndex = 1;
let colorSet = document.getElementById('js_colorSet');

const createFirstColor = () => {
    uniqIndex; 
    const div = document.createElement('div');
    div.id = 'js_color' + (uniqIndex);
    div.className = 'color';
    div.innerHTML += `<p>${uniqIndex}</p><input type='color' id="${'js_colorCode' + uniqIndex}" value='#909090' colorNumber=${uniqIndex}><p id='output${uniqIndex}' class='colorValue'>#909090</p>`;
    colorSet.appendChild(div);

    document.getElementById('js_colorCode' + uniqIndex).onchange = function () {
        newColor = this.value; 
        updateColors(newColor, 1);
        output.innerText = newColor;
    }
}

window.onload = createFirstColor();

let colorCode = document.getElementById('js_colorCode' + uniqIndex);
let output = document.getElementById("output" + uniqIndex);
output.innerText = colorCode.value;
let colorNumber = colorCode.getAttribute('colorNumber');
let newColor = colorCode.value;
const addColorButton = document.getElementById('js_addButton');
const exportBtn = document.getElementById('js_exportBtn');

let colorsArray = [
    {
        id: uniqIndex,
        color: colorCode.value
    }
]

const updateColors = (newColor, number) => {
    colorsArray = colorsArray.map((el, index) => {
        if(index === number - 1) {
        return Object.assign(el, {
            id: colorNumber,
            color: newColor});
        }
        return el;
    });

    return colorsArray;
}

const addColor = () => colorsArray.push({id: uniqIndex, color: '#909090'});

addColorButton.onclick = function() {
    ++uniqIndex; 
    colorNumber = uniqIndex;
    const div = document.createElement('div');
    div.id = 'js_color' + (uniqIndex);
    div.className = 'color';
    div.innerHTML += `<p>${uniqIndex}</p><input type='color' id="${'js_colorCode' + uniqIndex}" value='#909090' colorNumber=${uniqIndex}><p id='output${uniqIndex}' class='colorValue'>#909090</p>`;
    colorSet.appendChild(div);
    $('button').animate({left: "+=73"}, 500);
    addColor();  
    
    document.getElementById('js_colorCode' + uniqIndex).onchange = function () {
        newColor = this.value; 
        updateColors(newColor, colorNumber);
        let output = document.getElementById("output" + uniqIndex);
        output.innerText = newColor;
    };
};

exportBtn.addEventListener('click', () => {
    let colorValue = document.querySelectorAll('.colorValue'); 
    colorValue.forEach(color => {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(color);
        selection.removeAllRanges();
        selection.addRange(range);

        document.execCommand('copy');
        selection.removeAllRanges();

        setTimeout(() => {
            console.log(color.textContent);
        }, 1000);
    });
});