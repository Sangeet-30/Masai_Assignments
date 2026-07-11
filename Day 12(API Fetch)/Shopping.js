const container = document.getElementById('container');

const filter = document.getElementById("filter") ;
const search = document.getElementById("search") ;
const searchBtn = document.getElementById("searchBtn") ;


let products = [] ;

const api = "https://fakestoreapi.com/products" ;

// fetch(api)
// .then(res => res.json())
// .then(data => {
//     products = data ;
//     Display(products) ;
// });

async function getData(){
    let res = await fetch(api);
    let data = await res.json();

    products = data;
    Display(products);
}
getData();


function Display(data){
    container.innerHTML = ""

    data.forEach(function(element){
        
        let div = document.createElement("div");
        div.classList.add("card")

        let category = document.createElement("h4");
        category.innerHTML = `<span class="label category">Category:</span> ${element.category}`;

        let title = document.createElement("h2");
        title.innerText = element.title ;
        title.classList.add("label", "title")

        let image = document.createElement("img");
        image.src = element.image ;

        let price = document.createElement("h4");
        price.innerHTML = `<span class="label price">Price:</span> $${element.price}`;

        let rating = document.createElement("div") ;
        rating.classList.add("label", "rating")
        let rate = document.createElement("h5") ;
        rate.innerHTML = `<span class="label rate">⭐ Rating:</span> ${element.rating.rate}`;
        let count = document.createElement("h5") ;
        count.innerHTML = `<span class="label review">Reviews:</span> ${element.rating.count}`;


        let shortDesc = element.description.slice(0,80);
        let p = document.createElement("p") ;
        p.innerHTML = `<span class="label description"> About this item : </span> ${shortDesc}...<span class="read-more"> Read More</span>` ;

        let readMore = p.querySelector(".read-more") ;
        
        let expanded = false;

        function toggleDescription() {

            if (!expanded) {
                p.innerHTML = `
                <span class="label description">About this item:</span>
                ${element.description}
                <span class="read-more"> Read Less</span>`;

                expanded = true;
            }

            else {
                p.innerHTML = `
                <span class="label description">About this item:</span>
                ${shortDesc}...
                <span class="read-more"> Read More</span>`;

                expanded = false;
            }
            p.querySelector(".read-more")
            .addEventListener("click", toggleDescription);
        }

        readMore.addEventListener("click", toggleDescription);

        rating.append(rate,count) ;
        div.append(category,title,image,price,rating,p) ;
        container.append(div) ;
    })
}


filter.addEventListener("change", function() {
    let selected = filter.value;

    if (selected == "") {
        Display(products);
        return;
    }

    let filteredProducts = products.filter(product => {
        return product.category == selected;
    });

    Display(filteredProducts);
});


searchBtn.addEventListener("click", function () {

    let keyword = search.value.toLowerCase().trim();

    if (keyword == "") {
        Display(products);
        return;
    }

    let searchedProducts = products.filter(product => {
        return product.title.toLowerCase().includes(keyword);
    });

    Display(searchedProducts);
});




