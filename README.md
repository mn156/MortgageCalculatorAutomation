This is a Mortgage Calculator with n8n Automation 
This is a responsive mortgage calulator that responds with real time monthly payment breakdowns and automates the lead processing using local n8n instance 

Features 
Uses Chart.js to display a doughnut chart with Principal Interest, Taxes, and Insurance ratios 
Has live calculations that instantly update as you change the Home Price, Down Pyament, or Interest Rate

Tech Stack
Frontend: HTML, CSS, Javascript 
Automation: n8n 
Containerization: Docker and Docker Compose 

How to run locally 
You can open the index.html in your browser and interact with the calculator

To start the automation you need the n8n environment 
  1. Ensure that docker desktop is running on your system
  2. Open your terminal in the /automation folder
  3. run command docker-compose up -d
  4. access n8n at http://localhost:5678
  5. create a local owner account and import the MortgageAuto.json

Respository includes a .env.test file to run the automation with your own credentials 
