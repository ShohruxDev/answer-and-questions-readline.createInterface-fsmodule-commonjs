import readline from "readline";
import fs from "fs";

const app = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

app.question("Yangi savolni kiriting: ", (text) => {
    app.question("A: ", (a) => {
        app.question("B: ", (b) => {
            app.question("C: ", (c) => {
                app.question("To'g'ri javob: ", (answer) => {

                    let questions = [];

                    if (fs.existsSync("questions.json")) {
                        const data = fs.readFileSync(
                            "questions.json",
                            "utf-8"
                        );

                        if (data.trim()) {
                            questions = JSON.parse(data);
                        }
                    }

                    const newQuestion = {
                        id: questions.length + 1,
                        text: text,
                        A: a,
                        B: b,
                        C: c,
                        answer: answer.toUpperCase()
                    };

                    questions.push(newQuestion);

                    fs.writeFileSync(
                        "questions.json",
                        JSON.stringify(questions, null, 4)
                    );

                    console.log("Savol saqlandi!");

                    app.close();
                });
            });
        });
    });
});