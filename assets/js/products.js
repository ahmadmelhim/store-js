const getProducts = async(page) => {
    const skip = (page - 1) * 15;
    const { data } = await axios.get(`https://dummyjson.com/products?limit=15&skip=${skip}`);
    return data;
}

const displayProducts = async(page = 1) => {
    try {
        const data = await getProducts(page);
        const numberOfpages = Math.ceil(data.total / 15);
        const products = data.products;
        const result = products.map(product =>
            ` <div class="product">
                <h1><span>ID : </span>${product.id}</h1>
                <h2><span>Category : </span>${product.category}</h2>
                <h2><span>Title : </span>${product.title}</h2>
                <img src="${product.thumbnail}" class='product-image' />
                <p><span>Description : </span>${product.description} </p>
                <p><span>Price : </span>${product.price}$</p>
                <p> <span>Discount Percentage : </span>${product.discountPercentage} </p>
                <p><span>Rating : </span>${product.rating} </p>
                <p><span>Stock : </span>${product.stock} </p>
                <p><span>Brand : </span>${product.brand} </p>
                <p><span> Sku : </span>${product.sku} </p>
                <p><span> Weight : </span>${product.weight} </p>
                <p><span> Rating : </span>${product.rating} </p>
                <p><span> Return Policy : </span>${product.returnPolicy} </p>
                <button class="Add-to-Char"> Add to Char  <i class="fa-solid fa-cart-plus"></i> </button>
            </div>`
        ).join('');
        document.querySelector(".products .row").innerHTML = result;
        customModal();

        let paginationLink = ` `;
        if (page > 1) {
            paginationLink = `<li><button onclick=displayProducts(${page-1})>&lt;</button></li>`;
        } else {
            paginationLink = `<li><button disabled>&lt;</button></li>`;
        }
        for (let i = 1; i <= numberOfpages; i++) {
            paginationLink += `<li><button onclick=displayProducts(${i})>${i}</button></li>`;
        }
        if (page < numberOfpages) {
            paginationLink += `<li><button onclick=displayProducts(${parseInt(page)+1})>&gt;</button></li>`;
        } else {
            paginationLink += `<li><button disabled>&gt;</button></li>`;
        }
        document.querySelector(".pagination").innerHTML = paginationLink;
    }
    catch (error) {
        document.querySelector(".categories .row").innerHTML = "<p> Please Try Again Later ... </p>";
    }
    finally {
        document.querySelector(".loading").classList.add("d-none");
    }
}
displayProducts();

function customModal() {
    const modal = document.querySelector(".my-modal");
    const closeBtn = document.querySelector(".close-btn");
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");
    const images = Array.from(document.querySelectorAll(".product-image"));
    let currentIndex = 0;
    images.forEach(function(img) {
        img.addEventListener('click', (e) => {
            modal.classList.remove('d-none');
            modal.querySelector("img").setAttribute("src", e.target.src);
            const currentImg = e.target;
            currentIndex = images.indexOf(currentImg);
            console.log(currentIndex);
        });
    });

    closeBtn.addEventListener("click", (e) => {
        modal.classList.add('d-none');
    });

    rightBtn.addEventListener('click', (e) => {
        currentIndex++;
        if (currentIndex >= images.length) {
            currentIndex = 0;
        }
        const src = images[currentIndex].getAttribute('src');
        modal.querySelector('img').setAttribute('src', src);
    });

    leftBtn.addEventListener('click', (e) => {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = images.length - 1;
        }
        const src = images[currentIndex].getAttribute('src');
        modal.querySelector('img').setAttribute('src', src);
    });

    document.addEventListener('keydown', (e) => {
        if (e.code == 'ArrowRight') {
            currentIndex++;
            if (currentIndex >= images.length) {
                currentIndex = 0;
            }
            const src = images[currentIndex].getAttribute('src');
            modal.querySelector('img').setAttribute('src', src);
        }
        else if (e.code == 'ArrowLeft') {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = images.length - 1;
            }
            const src = images[currentIndex].getAttribute('src');
            modal.querySelector('img').setAttribute('src', src);
        }
        else if (e.code == 'Escape') {
            modal.classList.add('d-none');
        }
    });
}
