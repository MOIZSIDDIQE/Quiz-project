import inquirer from "inquirer"
import chalk from "chalk"

const apiLink:string = "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple"

let fetchData = async (data:string)=>{
    let fetchQuiz:any = await fetch(data);
    let response = await fetchQuiz.json();
    return response;
};

let Data = await fetchData(apiLink);

console.log(Data.results)
