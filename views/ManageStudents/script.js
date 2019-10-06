$(document).ready(function () {

    //Method To Get All Students Data
    getAllStudents();

    //Method To Open Add Student Modal
    $("#addStudent").click(function () {
        $("#myModal").modal();
    });

    //Method To Add New Student
    $("#addNewStudent").click(function () {
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
                    required: "Please Provide Student First Name",
                    minlength: "First Name Must Be At least Five Characters Long"
                },
                LastName: {
                    required: "Please Provide Student Last Name",
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
                    url: '/createNewStudent',
                    data: $('#addEmpForm').serialize(),
                    success: function (response) {
                        alertify.success("Success");
                        getAllStudents();
                        $("#addEmpForm").trigger().reset();
                        $('#myModal').modal('hide');
                    },
                    error: function (response) {
                        alertify.error("Something Went Wrong While Updating Student Details");
                        $("#myModal").modal('hide');
                    }
                })
            }
        });
    });

    //Method To Edit Student Details
    $("#editStudent").click(function () {

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
                    required: "Please Provide Student First Name",
                    minlength: "First Name Must Be At least Five Characters Long"
                },
                LastName: {
                    required: "Please Provide Student Last Name",
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
                    url: '/editStudent',
                    data: $('#editEmpForm').serialize(),
                    success: function (response) {
                        alertify.success("Success");
                        getAllStudents();
                        $('#editModal').modal('hide');
                    },
                    error: function (response) {
                        alertify.error("Something Went Wrong While Updating Student Details");
                        $("#editModal").modal('hide');
                    }
                })
            }
        });

    })
});

//Method To Edit Student
function editStudent(empID) {
    $.ajax({
        type: 'get',
        url: '/getStudentInfo',
        data: {StudentID: empID},
        success: function (response) {
            $("#editModal").modal();
            $("#_id").val(response._id);
            $("#EditFirstName").val(response.FirstName);
            $("#EditLastName").val(response.LastName);
            $("#EditEmailID").val(response.EmailID);
            $("#EditContact").val(response.Contact);
            $("#EditPassword").val(response.Password);
        },
        error: function (response) {
            alertify.error("Something Went Wrong While Getting Student Details");
            $("#editModal").modal('hide');
        }
    });
}

//Method To Get All Students Data
function getAllStudents() {
    var count = 0;
    $.ajax({
        type: 'get',
        url: '/getStudents',
        success: function (response) {
            $("#empTableBody").empty();
            for (var emp of response) {
                $("#empTableBody").append(`<tr>
                    <td>${++count}</td>
                    <td>${emp.FirstName}</td>
                    <td>${emp.LastName}</td>
                    <td>${emp.EmailID}</td>
                    <td>${emp.Contact}</td>
                    <td>${emp.Password}</td>
                    <td>
                        <button class="btn btn-warning btn-sm text-white" onclick="editStudent('${emp._id}')"><i class="fa fa-edit"></i></button>
                        <button class="btn btn-danger btn-sm" onclick="deleteStudent('${emp._id}')"><i class="fa fa-trash"></i> </button>
                    </td>
                </tr>`)
            }
        },
        error: function (response) {
            alertify.error("Something Went Wrong While Updating Students List");
        }
    });
}


//Method To Delete Student
function deleteStudent(empID) {
    console.log(empID)
    alertify.confirm("Delete Student", function () {
        $.ajax({
            type: "get",
            url: '/deleteStudent',
            data: {StudentID: empID},
            success: function (response) {
                // console.log(response)
                alertify.success("Student Deleted Successfully");
                getAllStudents();
            },
            error: function (response) {
                alertify.error("Something Went Wrong While Deleting Student Details");
                $("#editModal").modal('hide');
            }
        });
    })
}