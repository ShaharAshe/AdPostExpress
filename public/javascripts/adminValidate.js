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
                                        <a href="#" class="btn btn-primary">approve</a>
                                        <a href="#" class="btn btn-primary">delete</a>
                                    </div>
                                </div>
                            </div>`
                    })
                })
                .catch((error) => {
                    console.log(error);
                });



        },
    }
})()

document.addEventListener('DOMContentLoaded', function(){main.main_func()});