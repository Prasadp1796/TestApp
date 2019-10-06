// Variables Used For Script
var questionSelected = 1;
var totalQuestions, testID;
var questions = new Array();




$(document).ready(function () {
    totalQuestions = $("#queNos").val();
    testID = $("#testId").val();

    //Add Empty Divs To Form
    for(i=1; i<=totalQuestions; i++){
        //Add Question Numbers Buttons To Paginator
        $("#paginator").append(` <li class="page-item"><button class="page-link" onclick="selectQuestion(${i})">${i}</button></li>`);

        //Add Empty Question Rows To Form
        $("#queDetails").append(`
            <form class="question" id="question${i}" method="" action="">
                <div class="form-row">
                    <div class="row mx-auto">
                        <h4 class="text-primary">Question: ${i}</h4>
                    </div>
                    <div class="form-group col-12">
                        <label for="QueType${i}">Question Type</label>
                        <select class="form-control" id="QueType${i}" onchange="onQuestionSelected(${i})">
                            <option selected value="" disabled>---Select Question Type---</option>
                            <option value="1">MCQ</option>
                            <option value="2">Fill In The Blank</option>
                            <option value="3">True Or False</option>
                        </select>
                    </div>
                </div>
            </form>
        `);
    }

    //Show First Question And Hide All Other Questions
    $(".question").hide();
    $("#question1").show();
});

//Method To Select Question
var selectQuestion = function (queNo) {
    $(".question").hide();
    $(`#question${queNo}`).show();
};


//Method Called When Question Type Is Selected
var onQuestionSelected = function (queNo) {
    var queType = $(`#QueType${queNo}`).val();
    var str = '';
    var questionIp = `
            <div class="form-group col-12">
                <label for="questionText${queNo}">Question: </label>
                <textarea class="form-control" name="QuestionText" id="QuestionText" placeholder="Enter Question"></textarea>
            </div>`;

    if(queType == 1){
        str = `
            ${questionIp}
            <div class="form-group col-12">
                <div class="row">
                    <div class="col-6">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <input type="radio" id="answer${queNo}" name="answer${queNo}" value="A">
                                </span>
                            </div>
                            <input type="text" class="form-control" name="OptionA" placeholder="Enter Option A">
                        </div>
                    </div>
                    
                    <div class="col-6">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <input type="radio" id="answer${queNo}" name="answer${queNo}" value="B">
                                </span>
                            </div>
                            <input type="text" class="form-control" name="OptionB" placeholder="Enter Option B">
                        </div>
                    </div>
                    
                    <div class="col-6 mt-2">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <input type="radio" id="answer${queNo}" name="answer${queNo}" value="C">
                                </span>
                            </div>
                            <input type="text" class="form-control" name="OptionC" placeholder="Enter Option C">
                        </div>
                    </div>
                    
                    <div class="col-6 mt-2">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <input type="radio" id="answer${queNo}" name="Answer${queNo}" value="D">
                                </span>
                            </div>
                            <input type="text" class="form-control" name="OptionD" placeholder="Enter Option D">
                        </div>
                    </div>
                </div>
            </div>
        `
    }else if(queType == 2){
        str = `
             ${questionIp}
             <div class="form-group col-12">
                <label for="">Answer</label>
                <input type="text" class="form-control" id="answer${queNo}" name="answer${queNo}" placeholder="Enter Answer Here">
            </div>
        `
    }else if(queType == 3){
        str = `
            ${questionIp}
            <div class="form-group col-12">
                <div class="row">
                    <div class="col-6">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <input type="radio" id="answer${queNo}" name="answer${queNo}" value="A">
                                </span>
                            </div>
                            <input type="text" name="option${queNo}A" class="form-control-plaintext pl-3" placeholder="True" readonly>
                        </div>
                    </div>
                    
                    <div class="col-6">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <input type="radio" id="answer${queNo}" name="answer${queNo}" value="B">
                                </span>
                            </div>
                            <input type="text" name="option${queNo}B" class="form-control-plaintext pl-3" placeholder="False" readonly>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    console.log(str);
    $(`#QueType${queNo}`).prop('disabled', 'disabled');
    $(`#queDetails${queNo}`).empty();
    $(`#question${queNo}`).append(`
        <div class="form-row" id="queDetails${queNo}">
            ${str}
            <div class="form-group col-12 mx-auto">
                <button class="btn btn-danger" onclick="resetQuestion(${queNo})"><i class="fa fa-trash"></i> Reset</button>
                <button class="btn btn-success" onclick="saveQuestion(${queNo}, event)"><i class="fa fa-trash"></i> Add</button>
            </div>
        </div>`);
};

//Method To Reset Question
var resetQuestion = function (queNo) {
    questions[queNo - 1] = {};
    $(`#queDetails${queNo}`).empty();
    $(`#QueType${queNo}`).removeAttr('disabled');
};

//Method To Save Question
var saveQuestion = function (queNo, e) {
    console.log(e)
    e.preventDefault(e);
    var tmpData = $(`#question${queNo}`).serializeArray();
  console.log(questions[queNo-1]);
    questions[queNo - 1] = {};

    for(i=0; i<tmpData.length;i++){
        questions[queNo - 1][tmpData[i].name] = tmpData[i].value;
    }

    questions[queNo - 1].TestID = testID;
    console.log(questions[queNo - 1])
    // return false;
};