import readline from "readline";
import fs from "fs";

const app = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const questions = JSON.parse(
    fs.readFileSync("questions.json", "utf-8")
);

let answers = [];

if (fs.existsSync("answers.json")) {
    const data = fs.readFileSync("answers.json", "utf-8");

    if (data.trim()) {
        answers = JSON.parse(data);
    }
}

app.question("Savol ID sini kiriting: ", (id) => {

    const question = questions.find(
        (item) => item.id === Number(id)
    );

    if (!question) {
        console.log("Bunday ID li savol topilmadi!");
        app.close();
        return;
    }

    console.log("\n" + question.text);
    console.log("A:", question.A);
    console.log("B:", question.B);
    console.log("C:", question.C);

    app.question("Javobingiz: ", (answer) => {

        const newAnswer = {
            id: Number(id),
            answer: answer.toUpperCase()
        };

        answers.push(newAnswer);

        fs.writeFileSync(
            "answers.json",
            JSON.stringify(answers, null, 4)
        );

        console.log("\nJavob answers.json ga saqlandi!");

        if (
            answer.toUpperCase() ===
            question.answer.toUpperCase()
        ) {
            console.log("To'g'ri topdingiz!");
        } else {
            console.log("Noto'g'ri topdingiz!");
        }

        app.close();
    });
});