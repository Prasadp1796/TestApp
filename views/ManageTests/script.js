$(document).ready(function () {

    //Method To Get All Tests Data
    getAllTests();

    //Method To Open Add Test Modal
    $("#addTest").click(function () {
        $("#myModal").modal();
    });

    //Method To Add New Test
    $("#addNewTest").click(function () {
        $("#addEmpForm").validate({
            rules: {
                FirstName: {
                    required: true,
                    minlength: 4
                },
                LastName: {
                    required: true,
                    minlength: 4
                },
                EmailID: {
                    required: true,
                    email: true
                },
                Contact: {
                    required: true
                    // regex: "/^[6-9][0-9]{9}$/"
                },
                Password: {
                    required: true,
                    minlength: 5
                },
                ConfirmPassword: {
                    equalTo: "#Password"
                }
            },
            messages: {
                FirstName: {
                    required: "Please Provide Test First Name",
                    minlength: "First Name Must Be At least Five Characters Long"
                },
                LastName: {
                    required: "Please Provide Test Last Name",
                    minlength: "Last Name Must Be At least Five Characters Long"
                },
                EmailID: {
                    required: "Please Provide Email ID",
                    email: "Please Enter Valid Email ID"
                },
                Contact: {
                    required: "Please Enter Contact Number",
                    regex: "Please Enter Valid Contact Number",
                },
                Password: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long"
                },
                ConfirmPassword: {
                    equalTo: "Please Enter Same Password Again"
                }
            },
            submitHandler: function (form) {
                console.log(form);
                $.ajax({
                    type: "post",
                    url: '/createNewTest',
                    data: $('#addEmpForm').serialize(),
                    success: function (response) {
                        alertify.success("Success");
                        getAllTests();
                        $("#addEmpForm").trigger().reset();
                        $('#myModal').modal('hide');
                    },
                    error: function (response) {
                        alertify.error("Something Went Wrong While Updating Test Details");
                        $("#myModal").modal('hide');
                    }
                })
            }
        });
    });

    //Method To Edit Test Details
    $("#editTest").click(function () {

        $("#editEmpForm").validate({
            rules: {
                FirstName: {
                    required: true,
                    minlength: 4
                },
                LastName: {
                    required: true,
                    minlength: 4
                },
                EmailID: {
                    required: true,
                    email: true
                },
                Contact: {
                    required: true
                    // regex: "/^[6-9][0-9]{9}$/"
                },
                Password: {
                    required: true,
                    minlength: 5
                },
                ConfirmPassword: {
                    equalTo: "#EditPassword"
                }
            },
            messages: {
                FirstName: {
                    required: "Please Provide Test First Name",
                    minlength: "First Name Must Be At least Five Characters Long"
                },
                LastName: {
                    required: "Please Provide Test Last Name",
                    minlength: "Last Name Must Be At least Five Characters Long"
                },
                EmailID: {
                    required: "Please Provide Email ID",
                    email: "Please Enter Valid Email ID"
                },
                Contact: {
                    required: "Please Enter Contact Number"
                    // regex: "Please Enter Valid Contact Number",
                },
                Password: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long"
                },
                ConfirmPassword: {
                    equalTo: "Please Enter Same Password Again"
                }
            },
            submitHandler: function (form) {
                $.ajax({
                    type: "post",
                    url: '/editTest',
                    data: $('#editEmpForm').serialize(),
                    success: function (response) {
                        alertify.success("Success");
                        getAllTests();
                        $('#editModal').modal('hide');
                    },
                    error: function (response) {
                        alertify.error("Something Went Wrong While Updating Test Details");
                        $("#editModal").modal('hide');
                    }
                })
            }
        });

    })
});

//Method To Edit Test
function editTest(empID) {
    $.ajax({
        type: 'get',
        url: '/getTestInfo',
        data: {TestID: empID},
        success: function (response) {
            $("#editModal").modal();
            $("#_id").val(response._id);
            $("#EditTestName").val(response.TestName);
            $("#EditNoOfQuestions").val(response.NoOfQuestions);
        },
        error: function (response) {
            alertify.error("Something Went Wrong While Getting Test Details");
            $("#editModal").modal('hide');
        }
    });
}

//Method To Get All Tests Data
function getAllTests() {
    var count = 0;
    $.ajax({
        type: 'get',
        url: '/getTests',
        success: function (response) {
            $("#testTableBody").empty();
            for (var test of response) {
                $("#testTableBody").append(`<tr>
                    <td>${++count}</td>
                    <td>${test.TestName}</td>
                    <td>${test.NoOfQuestions}</td>
                    <td>
                        <a class="btn btn-info btn-sm text-white" href="/manageTest/${test._id}"><i class="fa fa-edit"></i></a>
                        <button class="btn btn-warning btn-sm text-white" onclick="editTest('${test._id}')"><i class="fa fa-edit"></i></button>
                        <button class="btn btn-danger btn-sm" onclick="deleteTest('${test._id}')"><i class="fa fa-trash"></i> </button>
                    </td>
                </tr>`)
            }
        },
        error: function (response) {
            alertify.error("Something Went Wrong While Updating Tests List");
        }
    });
}


//Method To Delete Test
function deleteTest(empID) {
    console.log(empID)
    alertify.confirm("Delete Test", function () {
        $.ajax({
            type: "get",
            url: '/deleteTest',
            data: {TestID: empID},
            success: function (response) {
                // console.log(response)
                alertify.success("Test Deleted Successfully");
                getAllTests();
            },
            error: function (response) {
                alertify.error("Something Went Wrong While Deleting Test Details");
                $("#editModal").modal('hide');
            }
        });
    })
}