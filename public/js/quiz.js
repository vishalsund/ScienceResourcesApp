const questions = quizData[0]
const answers = quizData[1]

let score = 0
let inAnim = false
const scoreObj = document.getElementById("score")

function scoreUpdate()
{
    scoreObj.innerHTML = "Score: "+score;
}


let answerChoice, qIndex
function uniqueRandom(length, blacklisted)
{
    let choice = Math.floor(Math.random()*length)
    while (blacklisted.indexOf(choice) != -1)
    {
        choice = Math.floor(Math.random()*length)
    }
    return choice
}

function question()
{
    qIndex = uniqueRandom(questions.length, [qIndex])
    document.getElementById("question").innerHTML = questions[qIndex]

    let choices = [qIndex]
    for (let i = 0; i < 4; i++)
    {
        choices.push(uniqueRandom(questions.length, choices))
    }

    answerChoice = Math.floor(Math.random()*4)+1
    choices[answerChoice] = qIndex
    for (let i = 1; i < 5; i++)
    {
        document.getElementById(`answer-text-${i}`).innerHTML = answers[choices[i]]
    }
}

question()

for (let i = 1; i <= 4; i++)
{
    let ci = i
    document.getElementById(`answer-${i}`).onclick = () => {
        if (inAnim) {return}
        if (ci == answerChoice)
        {
            score++;
            scoreUpdate()
        } else {

        }

        // Animation
        for (let i = 1; i <= 4; i++)
        {
            if (answerChoice == i)
                document.getElementById(`answer-${i}`).classList.add("correct")
            else
                document.getElementById(`answer-${i}`).classList.add("incorrect")
        }
        inAnim = true

        let c = answerChoice

        setTimeout(question, 500)
        setTimeout(() => {
            inAnim = false
            for (let i = 1; i < 5; i++)
            {
                if (c == i)
                    document.getElementById(`answer-${i}`).classList.remove("correct")
                else
                    document.getElementById(`answer-${i}`).classList.remove("incorrect")
            }
        }, 1000)
    }
}