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
    const build_page = ()=> {
        console.log('Build page function called');
        fetch(`/api/posts`)
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
                            </div>`
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return{
        main_func: function () {
            // Initial call to build_page
            build_page();

            // Set up interval to call build_page every 5 seconds
            setInterval(build_page, 5000);
            }
    }
})()

document.addEventListener('DOMContentLoaded', function(){main.main_func()});