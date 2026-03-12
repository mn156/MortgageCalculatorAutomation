
async function sendLead() {
    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        HomePrice: document.getElementById('HomePrice').value,
        DownPayment: document.getElementById('DownPayment').value,
        LoanAmount: document.getElementById('LoanTerm-select').value,
        creditScore: document.getElementById('CreditScore').value,
        MonthlyIncome: document.getElementById('MonthlyIncome').value,

    };

    const webhookUrl = 'http://localhost:5678/webhook/AI-GATEWAY';

    try {

        if (!data.name || !data.email.includes('@')) {
            document.getElementById('status').innerText = "enter a valid name and email";
            return; 
        }

        
        if (data.homePrice < 50000) {
            document.getElementById('status').innerText = "Home price is too low for a quote";
            return; 
        }

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            document.getElementById('status').innerText = "Application was submitted";
        }
    } catch (error) {
        document.getElementById('status').innerText = "Error";
    }
}

const ctx = document.getElementById('myChart');

let m = 1000;
let taxes =  800;
let HOwners = 210;
let total = 0; 
document.getElementById('TotalString').innerText = "$" + `${total.toFixed(2)}`;

const dataChart = new Chart(ctx, {
    type: 'doughnut', 
    data: {
    labels: ['Principal & Interest', 'Property Tax', 'Homeowners Insurance'],
    datasets: [{
        label: 'Monthly Payment $',
        data: [m, taxes, HOwners], 
        backgroundColor: ['#00529b', '#0074d9', '#7fdbff'],
        borderColor: '#00529b',

    }]
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    color: 'white', 
                    font: {
                        family: "'Inter', sans-serif", 
                        size: 18
                    }
                }
            }
        }
    }
});


function CalculateMonthlyCost() {

    checkFields();
    let homeValue = document.getElementById('HomePrice').value;
    let downValue = document.getElementById('DownPayment').value;

    let home = parseFloat(homeValue.replace(/,/g, '')) || 0;
    let down = parseFloat(downValue.replace(/,/g, '')) || 0;
    let interestRate = parseFloat(document.getElementById('Interest').value) || 0;
    let loanTermYears = parseFloat(document.getElementById('LoanTerm-select').value) || 30;

    let principal = home - down;
    let monthlyInterest = (interestRate / 100) / 12;
    let numberOfPayments = loanTermYears * 12;


    m = principal * ((monthlyInterest * Math.pow(1 + monthlyInterest, numberOfPayments)) / (Math.pow(1 + monthlyInterest, numberOfPayments) - 1));
    taxes =  (home * 0.012) / 12;
    let HOwners = 210;

    dataChart.data.datasets[0].data[0] = m;
    dataChart.data.datasets[0].data[1] = taxes;
    dataChart.data.datasets[0].data[2] = HOwners;

    dataChart.update();

    let total = m + taxes + HOwners;
    document.getElementById('TotalString').innerText = "$" + `${total.toFixed(2)}`;
}

function checkFields() {
    let name = document.getElementById('name').value;
    let email =  document.getElementById('email').value;
    let HomePrice = document.getElementById('HomePrice').value;
    let DownPayment = document.getElementById('DownPayment').value;
    let LoanAmount = document.getElementById('LoanTerm-select').value;
    let creditScore = document.getElementById('CreditScore').value;
    let MonthlyIncome = document.getElementById('MonthlyIncome').value;

    let inputList = [name, email, HomePrice, DownPayment, LoanAmount, creditScore, MonthlyIncome];

    inputList.forEach((input, index) =>{
        console.log(`Index ${index}: ${input}`)

    });

}

document.querySelectorAll("input, select").forEach(el => {
        el.addEventListener("input", CalculateMonthlyCost);
});
