const utilities = (function() {
    const posts_place = document.querySelector(".posts_place");
    const delete_toastLive = document.getElementById('delLiveToast');
    const approve_toastLive = document.getElementById('approveLiveToast');
    const unApproved_toastLive = document.getElementById('unApprovedLiveToast');
    const problem_toastLive = document.getElementById('probLLiveToast');
    const spinner = document.querySelector("div.spinner-border");
    return {
        posts_place:posts_place,
        delete_toastLive: delete_toastLive,
        approve_toastLive: approve_toastLive,
        unApproved_toastLive: unApproved_toastLive,
        problem_toastLive: problem_toastLive,
        spinner: spinner,
    };
})()
const funcs = (function (){
    return {
        build_page: ()=> {
            utilities.posts_place.innerHTML = ''
            fetch(`/api/allData`)
                .then((status) => {
                    if (status.status >= 200 && status.status < 300) {
                        return Promise.resolve(status)
                    } else {
                        return Promise.reject(new Error(status.statusText))
                    }
                })
                .then((response) => response.json())
                .then((json) => {
                    if (json.length === 0) {
                        utilities.posts_place.innerHTML =
                            `<div class="col-12 text-center">
                            <h2>There are no posts yet &#129488;</h2>
                        </div>`
                    } else {
                        json.forEach(post => {
                            let str = `<div class="col-12 col-sm-6 col-lg-4 text-center">
                            <div class="card">
                                <p class="card-text">${post["title"]}</p>
                                <img src="/images/post_icon.png" class="card-img-top img-fluid d-none d-sm-block" alt="mars image">
                                    <div class="card-body">
                                        <p class="card-text">${post["description"]}</p>
                                        <p class="card-text">approve: ${post["approve"]}</p>
                                        <p class="card-text">email: ${post["email"]}</p>
                                        <p class="card-text">phone number: ${post["phone"]}</p>
                                        <p class="card-text">price: ${post["price"]}</p>
                                        <form class="row g-3" method="post" action="/">
                                        <button type="button" class="btn btn-primary approve_data" value="${post["id"]}">Approve</button>
                                        <button type="button" class="btn btn-primary unapprove_data" value="${post["id"]}">Unapprove</button>
                                        <button type="button" class="btn btn-danger del_data" value="${post["id"]}">Delete</button>
                                    </div>
                                </div>
                            </div>`;
                            utilities.posts_place.insertAdjacentHTML('afterbegin', str);
                        })
                    }
                    utilities.spinner.classList.add("d-none");
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        approve_change: (event, val, toast_ev) => {
            fetch(`/api/allData`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', // Set the content type if sending JSON data
                },
                body: JSON.stringify({approve: val, postId: event.target.value}) // Convert data to JSON format if needed
            }).then(response => {
                if (!response.ok)
                    throw new Error(`HTTP error! Status: ${response.status}`);
                return response.json(); // You can change this based on the response format
            }).then(data => {
                if(data["0"] === 0) {
                    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(utilities.problem_toastLive);
                    toastBootstrap.show();
                } else {
                    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast_ev);
                    toastBootstrap.show();
                }
                funcs.build_page();
                console.log('Success:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        },
    }
})();
const main = (function () {
    return {
        main_func: function () {
            funcs.build_page();
            utilities.posts_place.addEventListener("click", function (event) {
                utilities.spinner.classList.remove("d-none");
                if (event.target.classList.contains("approve_data"))
                    funcs.approve_change(event, 'yes', utilities.approve_toastLive);
                else if (event.target.classList.contains("unapprove_data"))
                    funcs.approve_change(event, 'no',utilities.unApproved_toastLive);
                else if (event.target.classList.contains("del_data")) {
                    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(utilities.delete_toastLive)
                    toastBootstrap.show()
                    fetch(`/api/allData`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({postId: event.target.value})
                    }).then(response => {
                        if (response.status >= 200 && response.status < 300)
                            return Promise.resolve(response)
                        return Promise.reject(new Error(response.statusText))
                    }).then((response) => response.json())
                    .then((json) => {
                        funcs.build_page();
                    }).catch(error => {
                        console.error('Error:', error);
                    });
                }
            })
        },
    }
})()
document.addEventListener('DOMContentLoaded', function(){main.main_func()});