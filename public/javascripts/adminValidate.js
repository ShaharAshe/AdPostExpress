const utilities = (function() {
    const posts_place = document.querySelector(".posts_place");
    return {
        posts_place:posts_place,
    };
})()

// ===================================================================

const funcs = (function (){
    return {
    }
})();

// ======================================================================

const main = (function () {
    const build_page = ()=>{
        console.log('Build page function called');
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
                console.log(json)
                utilities.posts_place.innerHTML = ``
                json.forEach(post => {
                    utilities.posts_place.innerHTML +=
                        `<div class="col-12 col-sm-6 col-lg-4 text-center">
                            <div class="card">
                                <img src="/images/post_icon.png" class="card-img-top img-fluid d-none d-sm-block" alt="mars image">
                                    <div class="card-body">
                                        <p class="card-text">${post["title"]}</p>
                                        <p class="card-text">${post["description"]}</p>
                                        <p class="card-text">approve: ${post["approve"]}</p>
                                        <p class="card-text">email: ${post["email"]}</p>
                                        <p class="card-text">phone number: ${post["phone"]}</p>
                                        <p class="card-text">price: ${post["price"]}</p>
                                        <form class="row g-3" method="post" action="/">
                                        <button type="button" class="btn btn-primary approve_data" value="${post["id"]}">approve</button>
                                        <button type="button" class="btn btn-primary del_data" value="${post["id"]}">delete</button>
                                    </div>
                                </div>
                            </div>`
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return {
        main_func: function () {
            build_page();
            utilities.posts_place.addEventListener("click", function (event) {
                if (event.target.classList.contains("approve_data")) {
                    fetch(`/api/allData`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json', // Set the content type if sending JSON data
                        },
                        body: JSON.stringify({approve: "yes", postId: event.target.value}) // Convert data to JSON format if needed
                    }).then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json(); // You can change this based on the response format
                    }).then(data => {
                        console.log('Success:', data);
                    // Handle the response data as needed
                    })
                        .catch(error => {
                            console.error('Error:', error);
                            // Handle errors
                        });
                }else if (event.target.classList.contains("del_data")) {
                    fetch(`/api/allData`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json', // Set the content type if sending JSON data
                        },
                        body: JSON.stringify({postId: event.target.value}) // Convert data to JSON format if needed
                    }).then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    }).then(data => {
                        console.log('Success:', data);
                    }).catch(error => {
                        console.error('Error:', error);
                        // Handle errors
                    });
                    build_page();
                }
            })
        },
    }
})()

document.addEventListener('DOMContentLoaded', function(){main.main_func()});