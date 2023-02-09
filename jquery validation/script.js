let list = [];
let valuarry = [];

$(document).ready(function () {
    $("#subm").click(function () {
        username = $('input[name=username]').val(),
            fathername = $('input[name=fname]').val(),
            email = $('input[name=email]').val(),
            dob = $('input[name=dob]').val(),
            radio = $('input:radio[name=gender]:checked').val(),
            Language = $('input:checkbox[name=Language]:checked').val(),
            number = $('input[name=number]').val(),
            address = $('textarea[name=address]').val(),

            jQuery.validator.addMethod("customEmail", function (value, element) {
                return this.optional(element) || /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
            }, "Please enter valid email address!");

        jQuery.validator.addMethod("phoneUS", function (phone_number, element) {
            phone_number = phone_number.replace(/\s+/g, "");
            return this.optional(element) || phone_number.length > 9 &&
                phone_number.match(/^(\+?1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
        }, "Please specify a valid phone number");


        jQuery.validator.addMethod("checkboxes", function (value, element) {
            return $('input[type=checkbox]:checked').length > 0;
        }, "please select at least one checkbox");

        jQuery.validator.addMethod("gender", function (value, element) {
            return this.optional(element) || /^(male|female)$/i.test(value);
        }, "Please enter a valid gender (male or female).");



        var $registrationForm = $('#registration');
        if ($registrationForm.length) {
            $registrationForm.validate(
                {

                    rules: {
                        username: {
                            required: true,

                        },
                        fname: {
                            required: true,
                        },
                        email: {
                            required: true,
                            customEmail: true
                        },
                        dob: {
                            required: true,
                        },
                        number: {
                            required: true,
                            phoneUS: true
                        },


                        gender: {
                            required: true,
                            gender: true
                        },
                        Language: {
                            required: true,
                            checkboxes: true


                        },
                        address: {
                            required: true,

                        }
                    },
                    messages: {
                        username: {

                            required: 'Please enter username!'
                        },
                        fname: {
                            required: 'Please enter father name!'
                        },
                        email: {
                            required: 'Please enter email!',
                            email: 'Please enter valid email!'
                        },
                        dob: {
                            required: 'Please enter dateofbirth!'
                        },
                        number: {
                            required: 'Please enter phonenumber!'

                        },
                        address: {
                            required: 'Please enter address!'
                        },

                    },
                    errorPlacement: function (error, element) {

                        if (element.attr('type') == 'radio') {
                            error.appendTo(element.closest('.form-group'));
                        } else {
                            error.insertAfter(element);
                        }
                        if (element.attr('type') == 'checkbox') {
                            error.appendTo(element.closest('.form-group'));
                        } else {
                            error.insertAfter(element);
                        }


                    }

                }


            )
        }
        
        var registration = {
            'username': username, 'fname': fathername, 'email': email, 'dob': dob, 'gender': radio, 'Language': Language, 'number': number, 'address': address
        }
        console.log(registration);

        if (username && fname && email && dob && gender && number && Language && address) {
            list.push(registration);
            localStorage.setItem("registrationvalue", JSON.stringify(list))
            buildTable()
        }
    })
})


    function buildTable(){
        let row = "";
        debugger
        list = JSON.parse(localStorage.getItem("registrationvalue"));
        console.log(list)
        for (var i = 0; i < list.length; i++) {
            
            row += `<tr>
<td>${list[i].username}</td>
 <td>${list[i].fname}</td>
 <td>${list[i].email}</td>
 <td>${list[i].dob}</td>
<td>${list[i].number}</td>
 <td>${list[i].gender}</td>
<td>${list[i].Language}</td>
 <td>${list[i].address}</td>
 </tr>`
        }
        table = document.getElementById("mytable").innerHTML = row;
    }
