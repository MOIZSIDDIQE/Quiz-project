import inquirer from "inquirer";
const apiLink = "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple";
let fetchData = async (data) => {
    let fetchQuiz = await fetch(data);
    let response = await fetchQuiz.json();
    return response;
};
let Data = await fetchData(apiLink);
const startQuiz = async () => {
    let score = 0;
    let name = await inquirer.prompt({
        name: "Name",
        type: "input",
        message: "What is your name."
    });
    for (let i = 1; i < 5; i++) {
        let answer = [...Data[i].incorrect_answers, Data[i].correct_answer];
        let ans = await inquirer.prompt({
            name: "quiz",
            type: "list",
            message: Data[i].question,
            choices: answer.map((val) => val)
        });
    }
};
