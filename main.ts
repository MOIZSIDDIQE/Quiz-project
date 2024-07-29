import inquirer from "inquirer"
import chalk from "chalk"

const apiLink:string = "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple"

let fetchData = async (data:string)=>{
    let fetchQuiz:any = await fetch(data);
    let response = await fetchQuiz.json();
    return response.results;
};

let Data = await fetchData(apiLink);

const startQuiz = async ()=>{
    let score :number = 0;
    let name = await inquirer.prompt({
        name:"Name",
        type:"input",
        message:"What is your name."
    });

    for(let i=0; i<5; i++){
        let answer= [...Data[i].incorrect_answers , Data[i].correct_answer];

        let ans =await inquirer.prompt({
            name:"quiz",
            type:"list",
            message:Data[i].question,
            choices: answer.map((val:any)=>val)
        });

        if(ans.quiz == Data[i].correct_answer){
            ++score;
            // console.log(chalk.greenBright("Correct Answer: " + Data[i].correct_answer));
        }
    }
console.log(score);

    
};


startQuiz()