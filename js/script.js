let bagitems;
onload();

function onload(){
    let bagitemsstring = localStorage.getItem('bagitems'); /** using local storage so that when we go to next page the data stays the same */
    bagitems = bagitemsstring ? JSON.parse(bagitemsstring) : []; /*if string comes then parse otherwise set bagitems to empty */
    display_items_on_home_page();
    display_bag_count();
}

function addtobag(itemsid){
    bagitems.push(itemsid);
    localStorage.setItem('bagitems',JSON.stringify(bagitems));
    display_bag_count();
}

function display_bag_count(){
    let item_count = document.querySelector(`.item-count`);
    if (bagitems.length>0) {
        item_count.innerText = bagitems.length;    
        item_count.style.visibility='visible';
    }
    else{
        item_count.style.visibility='hidden';
    }
}

function display_items_on_home_page(){
let items_container = document.querySelector(`.items-container`);

// when we link the script file to bag.html then the display item () also starts rendering due to which the item container is not found on the bag.html so it throws error so to deal with it we make it optional to find item container...if not found that is the case of bag.html then work normally (we are doing this so that the previously saved localstorage works on the next page as well)
if (!items_container) {
    return;
}

let innerHTML = "";
items.forEach(item => {
    innerHTML += `
    <div class="item-container">
        <div class="product-image">
            <img src="${item.image}" alt="item image" class="product-image">
        </div>
        <div class="product-rating">
            <span class="rating">${item.rating.stars} ⭐| ${item.rating.count}</span>
        </div>
        <div class="brand-name">
            ${item.company}
        </div>
        <div class="product-name">
            ${item.item_name}
        </div>
        <div class="product-price">
            <span class="original-price">Rs ${item.current_price}</span>
            <span class="strike-price"> RS ${item.original_price}</span>
            <span class="discount">(${item.discount_percentage} % OFF)</span>
        </div>
        <div class="add-button">
            <button class="add-to-bag" onclick="addtobag(${item.id})">Add to Bag</button>
        </div>
    </div>`
});
items_container.innerHTML= innerHTML;
}
           
 