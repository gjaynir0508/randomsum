const form = document.querySelector("form");
const answerToggler = document.querySelector("#answerToggle");

const leastNumInput = document.getElementById("firstNum");
const greatestNumInput = document.getElementById("lastNum");
const countInput = document.getElementById("count");
const operatorInput = document.getElementById("operator");

answerToggler.addEventListener("click", (e) => {
    var itemList = document.querySelectorAll("p.answers");
    itemList.forEach((elem) => {
        elem.classList.toggle("hidden-text");
    });
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const selectOption = operatorInput.value;
    const leastNumber = leastNumInput.value;
    const greatestNumber = greatestNumInput.value;
    const count = countInput.value;

    const data = {
        leastNum : leastNumber,
        greatestNum : greatestNumber,
        count : count,
        operator: selectOption
    };

    if(count > 0) {
        if(selectOption !== "divide") {
            createRandomSums(data);
        } else if(selectOption === "divide" && greatestNumber !== 0, leastNumber !== 0) {
            createRandomSums(data);
        } else {
            window.alert("Invalid Inputs");
        }
    } else{
        window.alert("Please enter a number greater than Zero in 'Number of Sums' field.");
    }

});





// Random generator code

// function createRandomSums(options) {
//     console.log(options);
// }

function createRandomSums(options) {
    console.log(options)
    const startNum = options.leastNum;
    const endNum = options.greatestNum;
    const numOfSums = options.count;
    const operator = options.operator;

    let randList = [];
    while(randList.length < numOfSums) {
        let rand = randGen(endNum);
        if(rand >= startNum && randList.includes(rand) === false) {
            randList.push(rand);
        }
    }

    let randSumsList = [];
    randList.forEach((elem) => {
        let randSubList = findSecond(elem, startNum);
        randSumsList.push(randSubList);
    });

    randSumsList.forEach((elem) => {
        let answer = calculator(elem[0], elem[1], operator);
        elem.push(answer);
    });

    arrangeSums(randSumsList, operator);
    answerToggler.classList.remove("hidden-text");

}

function randGen(num) {
    let x = Math.random() * (num);
    x = Math.floor(x);
    return x;
}

function findSecond(num1, num2) {
    let pair = [num1];
    while(pair.length < 2) {
        let y = randGen(num1);
        if(y >= num2) {
            pair.push(y);
        }
    }

    return pair;
}

function calculator(num1, num2, operation) {
    switch (operation) {
        case "add":
            return num1 + num2;
            break;

        case "sub":
            return num1 - num2;
            break;

        case "multiply":
            return num1 * num2;
            break;

        case "divide":
            return Math.round(num1 / num2);
            break;
    
        default:
            console.log("no operator matches!");
            break;
    }
}

function getSign(str) {
    switch (str) {
        case "add":
            return "+";
            break;

        case "sub":
            return "-";
            break;

        case "multiply":
            return "×";
            break;

        case "divide":
            return "÷";
            break;
    
        default:
            break;
    }
}


function arrangeSums(list, operator) {
    const listElement = document.getElementById("sumsList");
    let listHTML = "";
    list.forEach((elem) => {
        let listItem = "";
        let listStart = "<li class=\"flex-item\"><p class=\"num\">";
        let num1 = elem[0] + "</p>"
        let num2 = "<p class=\"numbottom\">" + getSign(operator) + makeEqualLength(elem[0], elem[1]) + "</p>";
        let num3 = "<p class=\"answers hidden-text\">" + elem[2] + "</p></li>"
        let total = listStart + num1 + num2 + num3;
        listItem += total;
        listHTML += listItem;
    });

    listElement.innerHTML = listHTML;
}

function makeEqualLength(num1, num2) {
    let num1Str = num1.toString();
    let num2Str = num2.toString();
    let num1StrLen = num1Str.length;
    let num2StrLen = num2Str.length;
    let difference = num1StrLen - num2StrLen;
    let num2StrAdd = " ";
    for(var i = 0; i<difference; i++) {
        num2StrAdd += "&nbsp; ";
    }

    num2StrAdd += num2Str;
    return num2StrAdd;
}