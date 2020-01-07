$(document).ready(function() {
    init();

});

function init() {
    this.time = 75;
    this.correct = 0;
    this.tracker = 0;
    this.unpacked = [];
    this.answers = [];
    this.buttonTracker = 0;
    this.extraButtons = null;
    this.timerFunction;
    this.score = 0;

    unpack(questions, this.unpacked);

    $("#question").text("Coding Quiz Challenge");
    $("#main-content").text("Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!");

    // Highscores eventlistener
    $("#viewHighScores").on("click", function() {
        scoreScreen();
    });
    // Button eventlistener
    $('#buttons').click(function() {
        next();
    });
}

function counterdowner() {
    this.timerFunction = setInterval(function() {
        this.time -= 1;
        $("#timer").text(("Time: " + String(this.time))); 

        if(this.time <= 0) {
            this.clearInterval(timerFunction);
            $("#main-content").text("OUT OF TIME");
            $("#buttons").remove();
            this.time = 0;
        }
    }, 1000);
    
    timerFunction;
}

/**
 * Function description
 *
 * @param (string) answer - string input for checking correct question response
 * @return (boolean) true / false when answer is correct or not
 */
function checkAnswer(answer) {
    if (answer == this.unpacked[tracker - 1].answer) {
        console.log("answer was correct");
        this.correct++;

        $('#rightOrWrong').text("Correct!");
        setTimeout(function() {
            $('#rightOrWrong').empty();
        }, 3000);
        return true;
    } else {
        $('#rightOrWrong').text("Wrong!");
        setTimeout(function() {
            $('#rightOrWrong').empty();
        }, 3000);
        return false;
    }
}

function next(answer) {
    if(this.tracker == 0) {
        counterdowner();
    } else {
        checkAnswer(answer);
    }
    if (this.tracker >= questions.length) {
        console.log("Out of questions"); 
        this.score = this.correct * this.time;
        scoreScreen();   
        leaderboard();
    } else {
        deleteButtons();
        createButtons();
        displayChoices();
        $("#main-content").text(this.unpacked[this.tracker].title);
        this.tracker++;
    }
}

// Takes the array generated by createButtons(), and appends a corresponding number of buttons
function displayChoices() {
    $('#everything').append('<div id = "buttons" class = "btn-group-vertical"></div>');
    for (let i = 0; i < answers.length; i++) {
        $('<button>', {
            id: "button #" + this.buttonTracker,
            class: "btn btn-primary btn-sx rounded",
            style: "margin-bottom: 5%"
        })
        .val(unpacked[tracker].choices[i])
        .text(unpacked[tracker].choices[i])
        .appendTo($("#buttons"));
        this.buttonTracker += 1;
    }
    $('#buttons').unbind();
    $('button').click(function() {
        next(this.value);
    });
}

// Create an array of the possible answers
function createButtons() {
    for (let i = 0; i < unpacked[tracker].choices.length; i++) {
        answers.push(unpacked[tracker].choices[i]);
    }
}

// Empy the array of previous question's possible answers
function deleteButtons() {
    $('#buttons').empty();
    answers = [];

}

// Unpacks the question object into a dictionary
function unpack(obj, dest) {
    for (var key in obj) {
        dest[key] = obj[key];
    }
}

async function leaderboard() {
    let names = [];
    let scores = [];

    const storage = Object.keys(localStorage);
    for (const leader of storage) {
        scores.push(localStorage.getItem(leader));
        names.push(localStorage.key(leader));
        debugger;
    }
    // console.log(storage);
    // for (let i = 0; i <= window.localStorage.length; i++) {
    //     scores.push(JSON.parse(window.localStorage.getItem(window.name)));
    // }
    var dict = {};

    for (let index = 0; index <= scores.length; index++) {
        const element = scores[index];

        dict[names[index]] = element; 
        
    }
    
    $("#main-content").text(scores);
}

// Display the score screen at the end of the game, or when the 'view highscores' button is clicked
function scoreScreen() {
    this.score = this.correct * this.time;
    clearInterval(this.timerFunction);

    $('#question').text("High scores");
    $("#question").text("Your score is " + this.score); 

    $("#buttons").empty();
    $("#everything").append(
        $('<div>', {
            class: "text-center",
            id: "temp"
        }),
    )
    if (this.tracker >= questions.length) {
        $("#temp").append(
            $('<input>', {
                type: 'text',
                placeholder: 'Type your name here',
                id: "inputField"
            })
        );
        $("#temp").append(
            $('<button>', {
                id: "submit",
                class: "btn btn-primary btn-sx rounded",
                style: "margin-bottom: 5%; margin-top: 5%",
                text: "Submit"
            })
        )
        $("#submit").click(function() {

            this.name = $("#inputField").val();
            $("#inputField").val("Score Saved");
            console.log(this.name + " " + window.score);
            
            window.localStorage.setItem(this.name, window.score);
        })
    } 

    $("#buttons").append(
        $('<button>', {
            id: "playAgain",
            class: "btn btn-primary btn-sx rounded",
            text: "Play again"
        })
    );

    $("#playAgain").click(function() {
        init();
        next();
        $("#temp").remove();
    })
}

