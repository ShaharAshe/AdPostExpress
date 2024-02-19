const utilities = (function() {
    const field_name = ['Title', 'Description', 'Price', 'Phone Number', 'Email']
    const email_pattern = /\S+@\S+\..+/;
    const phone_number_pattern = /^[0-9]{2,3}-[0-9]{7}$/;

    const form_action_ev = document.querySelector(".form_action");
    const title_ev = document.getElementById("title");
    const description_ev = document.getElementById("description");
    const price_ev = document.getElementById("price");
    const phone_number_ev = document.getElementById("phone_number");
    const email_ev = document.getElementById("email");
    const form_fields_ev = document.querySelectorAll(".fields_check")
    const good_alert = document.querySelectorAll(".alert-success");
    const bad_alert = document.querySelectorAll(".alert-danger");

    return {
        field_name: field_name,
        form_action_ev: form_action_ev,
        title_ev: title_ev,
        description_ev: description_ev,
        price_ev: price_ev,
        phone_number_ev: phone_number_ev,
        email_ev: email_ev,
        form_fields_ev: form_fields_ev,
        good_alert: good_alert,
        bad_alert: bad_alert,
        phone_number_pattern: phone_number_pattern,
        email_pattern: email_pattern,
    };
})()

// ===================================================================

const funcs = (function (){
    return {
    }
})();

// ======================================================================

const main = (function () {
    const click_submit = (event)=> {
        let is_valid = true;
        let name_of_field = 0;
        utilities.good_alert.forEach(good => {
            good.classList.add('d-none')
            good.innerHTML = ``
        })
        utilities.bad_alert.forEach(bad => {
            bad.classList.add('d-none')
            bad.innerHTML = ``
        })

        utilities.form_fields_ev.forEach(field => {
            if(field.children[1].value.trim() === '') {
                field.lastElementChild.innerHTML += `<li>The ${utilities.field_name[name_of_field]} must not be empty</li>`
            }
            ++name_of_field;
        })

        if(!utilities.phone_number_pattern.test(utilities.phone_number_ev.value.trim()))
        {
            utilities.bad_alert[3].innerHTML += `<li>phone number in format XXX-XXXXXXX (for example 02-1231212 or 055-1231212)</li>`;
        }
        if(!utilities.email_pattern.test(utilities.email_ev.value.trim()))
        {
            utilities.bad_alert[4].innerHTML += (utilities.bad_alert[4].innerHTML === ``)?`<li>email need to be 2 parts and a “@” character in between</li>`:`<li>email need to be 2 parts and a “@” character in between</li>`;
        }

        utilities.bad_alert.forEach(bad => {
            if (bad.innerHTML !== ``) {
                bad.classList.remove('d-none')
                is_valid = false;
            }
        })

        if (is_valid) {
            document.cookie = 'LastVisit' + '=' + new Date().toISOString() + ';';
            document.cookie = 'EmailAdr' + '=' + utilities.email_ev.value.trim()+';';
            event.target.submit();
        }

    }
    return {
        main_func: function () {
            utilities.form_action_ev.addEventListener("submit", function (event) {
                event.preventDefault();
                click_submit(event)
            })
        },
    }
})()

document.addEventListener('DOMContentLoaded', function(){main.main_func()});