let productname = document.getElementById('productName');
let sellingprice = document.getElementById('sellingPrice');
let button = document.getElementById('button');
let form = document.getElementById('addProductForm');
let category = document.getElementById('category');
let categoriesContainer = document.getElementById('categoriesContainer');

form.addEventListener("submit", onSubmit);

function onSubmit(e) {
    e.preventDefault();

    const storedetails = {
        productname: productname.value,
        sellingprice: sellingprice.value,
        category: category.value
    };

    axios.post('https://crudcrud.com/api/b901e80eb0f0483fa2f1547724563cc3/ADDPRODUCT', storedetails)
        .then((res) => showonScreen(res.data))
        .catch((err) => console.log(err));

    productname.value = '';
    sellingprice.value = '';
    category.value = '';
}

function showonScreen(storedetails) {
    let categoryHeading = document.getElementById(`${storedetails.category}Heading`);
    if (!categoryHeading) {
        // If category heading does not exist, create one
        categoryHeading = document.createElement('h2');
        categoryHeading.id = `${storedetails.category}Heading`;
        categoryHeading.textContent = storedetails.category.toUpperCase()+" ITEMS";
        categoriesContainer.appendChild(categoryHeading);
    }

    let del = document.createElement('button');
    del.textContent = "DELETE";
    del.style.color = 'red';
    del.style.backgroundColor = 'white';
    del.style.cursor = 'pointer';

    let li = document.createElement('li');
    li.appendChild(
        document.createTextNode(
            `PRODUCT NAME: ${storedetails.productname}  SELLING PRICE: ${storedetails.sellingprice} CATEGORY: ${storedetails.category}`
        )
    );
    li.appendChild(del);
    categoryHeading.appendChild(li);

    del.addEventListener('click', function () {
        const id = storedetails._id; // Assuming the unique identifier is stored in _id

        axios.delete(`https://crudcrud.com/api/b901e80eb0f0483fa2f1547724563cc3/ADDPRODUCT/${id}`)
            .then(() => li.remove())
            .catch((err) => console.log(err));
    });
}

window.addEventListener('load', loadUserDataFromServer);

function loadUserDataFromServer() {
    axios.get(`https://crudcrud.com/api/b901e80eb0f0483fa2f1547724563cc3/ADDPRODUCT`)
        .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                showonScreen(res.data[i]);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}
