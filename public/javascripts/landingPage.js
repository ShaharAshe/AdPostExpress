const utilities = (function() {
    const posts_place = document.querySelector(".posts_place");
    const spinner = document.querySelector("div.spinner-border");
    return {
        spinner: spinner,
        posts_place:posts_place,
    };
})()

// ===================================================================

const funcs = (function (){
    return {
        build_page: ()=> {
            console.log('Build page function called');
            fetch(`/api/posts`)
                .then((status) => {
                    if (status.status >= 200 && status.status < 300)
                        return Promise.resolve(status)
                    return Promise.reject(new Error(status.statusText))
                })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                    utilities.posts_place.innerHTML = ``
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
                                        <p class="card-text">email: ${post["email"]}</p>
                                        <p class="card-text">phone number: ${post["phone"]}</p>
                                        <p class="card-text">price: ${post["price"]}</p>
                                        <form class="row g-3" method="post" action="/">
                                    </div>
                                </div>
                            </div>`;
                            utilities.posts_place.insertAdjacentHTML('afterbegin', str);
                        })
                    }
                    utilities.spinner.classList.add("d-none");
                })
                .catch((error) => {
                    utilities.posts_place.innerHTML =
                        `<div class="col-12 text-center">
                            <h2>ERROR loading data from server</h2>
                        </div>`
                    console.log(error);
                });
        }
    }
})();

// ======================================================================

const main = (function () {
    return{
        main_func: function () {
            funcs.build_page();
        }
    }
})()

document.addEventListener('DOMContentLoaded', function(){main.main_func()});