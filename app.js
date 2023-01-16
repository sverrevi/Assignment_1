const laptopsElement = document.getElementById("laptops");
const priceElement = document.getElementById("price");
const descriptionElement = document.getElementById("description");
const buyElement = document.getElementById("buy");
const balanceElement = document.getElementById("balance");
const workElement = document.getElementById("work");
const payElement = document.getElementById("pay");
const bankElement = document.getElementById("bank");
const loanElement = document.getElementById("loan");
const debtElement = document.getElementById("debt");
const repayLoanElement = document.getElementById("loan repay");
const imageElement = document.getElementById("laptopImage");
const bottomLaptopElement = document.getElementById("bottomLaptop");
const featuresElement = document.getElementById("features");


//Defining our main variables
let laptops = [];
let balance = 0;
let pay = 0;
let debt = 0;

balanceElement.innerHTML = `Balance: ${balance.toFixed(2)} NOK`;
payElement.innerHTML = `Pay: ${pay.toFixed(2)} NOK`;
debtElement.innerHTML = `Your loan: ${debt.toFixed(2)} NOK`;




fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => addLaptopsToSelection(laptops));

//Function to handle initial options when loading website.
//Special treatment using a for loop
//for FeaturesElement, which refers to the
//"specs" key in the API that contains a list of description.
const addLaptopsToSelection = (laptops) =>{
    laptops.forEach(x => addLaptopToSelection(x));
    priceElement.innerText = laptops[0].price;
    descriptionElement.innerText = `Description: ${laptops[0].description}`;
    bottomLaptopElement.innerText = `Laptop: ${laptops[0].title}`;
    imageElement.src = `https://hickory-quilled-actress.glitch.me/${laptops[0].image}`;
    specs = laptops[0].specs;
    for (spec of specs){
        const feature = document.createElement("h5");
        feature.textContent = spec;
        featuresElement.appendChild(feature);
    }


}

const addLaptopToSelection = (laptop) => {
    const laptopElement = document.createElement("option");
    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptopsElement.appendChild(laptopElement);
}

//Changes prices, features, etc. when a new laptop is selected. 
const handleLaptopSelctionChange = e => {
    featuresElement.innerHTML=""
    const selectedLaptop = laptops[e.target.selectedIndex];
    specs = selectedLaptop.specs;
    for (spec of specs){
        const feature = document.createElement("h5");
        feature.textContent = spec;
        featuresElement.appendChild(feature);
    }
    priceElement.innerText = selectedLaptop.price;
    descriptionElement.innerText = `Description: ${selectedLaptop.description}`;
    imageElement.src = `https://hickory-quilled-actress.glitch.me/${selectedLaptop.image}`
}

const handleBuyLaptop = () => {
    const selectedLaptop = laptops[laptopsElement.selectedIndex];
    const laptopPrice = selectedLaptop.price;
    if (balance >= laptopPrice){
        balance -= laptopPrice;
        alert(`Congratulations on buying yourself a ${selectedLaptop.title}`);
    }
    else{
        alert("You can not afford this laptop");
    }
        
    balanceElement.innerHTML = `Balance: ${balance.toFixed(2)} NOK`;
}

const handleAddWork = () => {
    pay +=100;
    payElement.innerHTML = `Pay: ${pay.toFixed(2)} NOK`;
}

const handleAddBank = () => {

    if (debt == 0){
        balance += pay;
    }

    else if(debt < 0.1*pay){
        prev_debt = debt;
        debt = 0;
        balance += pay - prev_debt;
    }

    else{
        debt -= 0.1*pay;
        balance += 0.9*pay;
    }

    pay = 0;
    balanceElement.innerHTML = `Balance: ${balance.toFixed(2)} NOK`;
    payElement.innerHTML = `Pay: ${pay.toFixed(2)} NOK`;
    debtElement.innerHTML = `Your loan: ${debt.toFixed(2)} NOK`;
}

const handleLoan = () => {
    if (debt > 0){
        alert("You must pay your debt before you can take up a new loan");
        return;
    }
    else{
        const loanAmount = prompt("Please enter loan amount");

        if (isNaN(loanAmount)){
            alert("Please enter a valid number");
            return;
        }

        //Makes sure pressing "cancel" on prompt up window does not change loan to NaN
        if (loanAmount === null){
            return;
        }

        maxLoan = 2*balance;
    
        if (parseFloat(loanAmount) <= 0){
            alert("Your loan amount must be a non-zero positive number");
            return;

        }
        if (parseFloat(loanAmount) > maxLoan){
            alert("Your loan amount can not exceed twice your balance");
            return;
        }
        debt += parseFloat(loanAmount);
        balance += parseFloat(loanAmount);

        repayLoanElement.style.display = "block";
        balanceElement.innerHTML = `Balance: ${balance.toFixed(2)} NOK`;
        debtElement.innerHTML = `Your loan: ${debt.toFixed(2)} NOK`;
    }
}

const handleRepayLoan = () => {
    debt -= pay;
    pay = 0;
    if (debt <= 0){
        repayLoanElement.style.display = "none";
        balance += Math.abs(debt);
        debt = 0;
    }
    debtElement.innerHTML = `Your loan: ${debt.toFixed(2)} NOK`;
    payElement.innerHTML = `Pay: ${pay.toFixed(2)} NOK`;
    balanceElement.innerHTML = `Balance: ${balance.toFixed(2)} NOK`;

}

laptopsElement.addEventListener("change", handleLaptopSelctionChange);
buyElement.addEventListener("click", handleBuyLaptop);
workElement.addEventListener("click", handleAddWork);
bankElement.addEventListener("click", handleAddBank);
loanElement.addEventListener("click", handleLoan);
repayLoanElement.addEventListener("click", handleRepayLoan);
