const utilities = (function() {
    const field_name = ['Title', 'Price', 'Email']
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
    const add_error_scope = (pattern, val_ev, alert_num, msg) => {
        if(!pattern.test(val_ev.value.trim()))
        {
            utilities.bad_alert[alert_num].innerHTML += `<li>${msg}</li>`;
        }
    }

    const hide_alert = () => {
        utilities.good_alert.forEach(good => {
            good.classList.add('d-none')
            good.innerHTML = ``
        })
        utilities.bad_alert.forEach(bad => {
            bad.classList.add('d-none')
            bad.innerHTML = ``
        })
    }

    return {
        click_submit: (event)=> {
            let is_valid = true;
            let name_of_field = 0;
            hide_alert();
            utilities.form_fields_ev.forEach(field => {
                if(field.children[1].value.trim() === '') {
                    field.lastElementChild.innerHTML += `<li>The ${utilities.field_name[name_of_field]} must not be empty</li>`
                }
                ++name_of_field;
            })
            if(utilities.phone_number_ev.value.trim().length > 0)
                add_error_scope(utilities.phone_number_pattern, utilities.phone_number_ev, 3, `phone number in format XXX-XXXXXXX (for example 02-1231212 or 055-1231212)`)

            add_error_scope(utilities.email_pattern, utilities.email_ev, 4, `email need to be 2 parts and a “@” character in between`)
            utilities.bad_alert.forEach(bad => {
                if (bad.innerHTML !== ``) {
                    bad.classList.remove('d-none')
                    is_valid = false;
                }
            })

            if (is_valid)
                event.target.submit();
        }
    }
})();

// ======================================================================

const main = (function () {
    return {
        main_func: function () {
            fetch(`/api/allData`)
                .then((status)=> {
                    if (status.status >= 200 && status.status < 300) {
                        return Promise.resolve(status)
                    } else {
                        return Promise.reject(new Error(status.statusText))
                    }
                })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                })
                .catch((error) => {
                    console.log(error);
                });
            utilities.form_action_ev.addEventListener("submit", function (event) {
                event.preventDefault();
                funcs.click_submit(event)
            })
        },
    }
})()

document.addEventListener('DOMContentLoaded', function(){main.main_func()});