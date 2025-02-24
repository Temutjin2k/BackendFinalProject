function BmiHandler(req, res){
    const { weight, height } = req.query;
    if (!weight || !height) {
        return res.status(400).json({ error: "Missing weight or height parameters" });
    }

    const weightKg = parseFloat(weight);
    const heightM = parseFloat(height) / 100;

    if (isNaN(weightKg) || isNaN(heightM) || heightM <= 0) {
        return res.status(400).json({ error: "Invalid input values" });
    }

    const bmi = weightKg / (heightM * heightM);
    let category = "undefined"
    if (bmi < 18.5){
        category = "Underweight"
    }else if (bmi < 25){
        category = "Normal"
    }else if (bmi < 30){
        category = "Overweight"
    }else{
        category = "Obese"
    }
    console.log("Bmi: ",{bmi, category})
    res.json({ bmi, category });
}

module.exports = BmiHandler