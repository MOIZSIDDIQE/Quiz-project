import inquirer from "inquirer";
import chalk from "chalk";
let name = await inquirer.prompt({
    name: "Name",
    type: "input",
    message: "What is your name."
});
let num = await inquirer.prompt({
    name: "number",
    type: "number",
    message: "How many questions would you like to answer?"
});
const apiLink = `https://opentdb.com/api.php?amount=${num.number}&category=18&difficulty=easy&type=multiple`;
let fetchData = async (data) => {
    let fetchQuiz = await fetch(data);
    let response = await fetchQuiz.json();
    return response.results;
};
let Data = await fetchData(apiLink);
if (!Data || Data.length === 0) {
    console.log("No data received from API. Please try again later.");
    process.exit(1);
}
const startQuiz = async () => {
    let score = 0;
    for (let i = 0; i < num.number; i++) {
        let answer = [...Data[i].incorrect_answers, Data[i].correct_answer];
        let ans = await inquirer.prompt({
            name: "quiz",
            type: "list",
            message: Data[i].question,
            choices: answer.map((val) => val)
        });
        if (ans.quiz == Data[i].correct_answer) {
            ++score;
            console.log(chalk.bold.bgGreenBright("Correct"));
        }
        else {
            console.log(("Correct Answer: " + Data[i].correct_answer));
        }
    }
    console.log(`Dear ${chalk.green.bold(name.Name)}, your score is ${chalk.red.bold(score)} 
    out of ${chalk.yellow.bold(num.number)}`);
};
startQuiz();
