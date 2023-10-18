const header = document.querySelector(".navbar")

window.onscroll = function() {
    var top = window.scrollY;
    if(top >=100) {
        header.classList.add('navbarDark');
    }
    else {
        header.classList.remove('navbarDark');
    }
}
function getPoints(degree) {
    if (degree >= 1 && degree <= 24) {
        const pointsArray = [320, 300, 280, 260, 240, 220, 200, 180, 160, 140, 120, 100, 96, 92, 88, 84, 80, 78, 76, 74, 72, 60, 56, 52];
        return pointsArray[degree - 1];
    } else if (degree >= 25 && degree <= 30) {
        return 48;
    } else if (degree >= 31 && degree <= 36) {
        return 44;
    } else if (degree >= 37 && degree <= 42) {
        return 40;
    } else if (degree >= 43 && degree <= 48) {
        return 36;
    } else if (degree >= 49 && degree <= 96) {
        return 16;
    } else if (degree > 96) {
        return 8;
    } else {
        return "Invalid degree";
    }
}


function calculateDancerPointsforCompetition(degree, numPairs, numClubs, numJudges, classification) {
    
    const DP = getPoints(degree);
    // Define the multipliers for pairs
    let pairMultiplier;
    if (numPairs <= 3) pairMultiplier = -0.50;
    else if (numPairs <= 6) pairMultiplier = -0.25;
    else if (numPairs <= 12) pairMultiplier = -0.10;
    else if (numPairs <= 24) pairMultiplier = +0.10;
    else if (numPairs <= 48) pairMultiplier = +0.25;
    else pairMultiplier = +0.30;

    // Define the multipliers for clubs
    let clubMultiplier;
    if (numClubs <= 4) clubMultiplier = 0;
    else if (numClubs <= 8) clubMultiplier = 0.10;
    else if (numClubs <= 12) clubMultiplier = 0.15;
    else clubMultiplier = 0.20;

    // Define the multipliers for judges
    let judgeMultiplier;
    if (numJudges === 5) judgeMultiplier = 0;
    else if (numJudges === 7) judgeMultiplier = 0.05;
    else if (numJudges === 9) judgeMultiplier = 0.10;
    else if (numJudges === 11) judgeMultiplier = 0.15;
    else judgeMultiplier = 0.20;

    // Define classification multiplier
    let classificationMultiplier;
    switch (classification) {
        case 'A': classificationMultiplier = 1.00; break;
        case 'B': classificationMultiplier = 0.80; break;
        case 'C': classificationMultiplier = 0.50; break;
        case 'D': classificationMultiplier = 0.40; break;
        case 'E': classificationMultiplier = 0.20; break;
    }

    // Calculate the KEP
    const KEP = (DP * classificationMultiplier) * (1 + pairMultiplier + clubMultiplier + judgeMultiplier);
    
    return KEP;
}


function displayCalculation(event) {
    event.preventDefault();  // Prevents the form from submitting

    const form = event.currentTarget;
    const degree = parseInt(form["degreePoints"].value);
    const numPairs = parseInt(form["numPairs"].value);
    const numClubs = parseInt(form["numClubs"].value);
    const numJudges = parseInt(form["numJudges"].value);
    const classification = form["classification"].value;

    const result = calculateDancerPointsforCompetition(degree, numPairs, numClubs, numJudges, classification);
    
    const resultDiv = document.createElement("div");
    resultDiv.textContent = "Calculated Points: " + result;
    form.parentNode.insertBefore(resultDiv, form.nextSibling);
}
