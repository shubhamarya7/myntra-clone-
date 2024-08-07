let bag_items_object;/**we have ids in the bag now we will retrieve the complete element with that id so for storing those we have this */
const CONVENIENCE_FEES = 99;
onload();


function onload(){
    loadbagitemobjects(); /**we will map the array of ids to array of objects */
    displaybagcontainer();
    bagsummary()
}


function loadbagitemobjects(){
    bag_items_object = bagitems.map(itemid => {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id == itemid) {
                return items[i]; }   
        }
    });
}


function displaybagcontainer(){
    let container_element = document.querySelector(`.bag-items-container`)
    let innerHTML = '';
    bag_items_object.forEach(element => {
        innerHTML += generatecontainerhtml(element)
        
    });
    container_element.innerHTML = innerHTML;
}
function removecontainer(itemid){
    bagitems = bagitems.filter(e => e != itemid); /**we will remove from the main list and generate bag item object again */
    localStorage.setItem('bagitems',JSON.stringify(bagitems));/**will update the local storage */
    loadbagitemobjects();
    display_bag_count();
    displaybagcontainer();
    bagsummary()
}

function bagsummary(){
    let bagsummaryelement = document.querySelector('.bag-summary');
    let totalItem = bag_items_object.length;
    let totalMRP = 0;
    let totalDiscount = 0;

    bag_items_object.forEach(bagitem => {
        totalMRP += bagitem.original_price;
        totalDiscount += bagitem.original_price - bagitem.current_price;
      });
    
    let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;

    bagsummaryelement.innerHTML = `<div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">₹${totalMRP}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">₹99</span>
    </div>
    <hr>
    <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">₹${finalPayment}</span>
    </div>
  </div>
  <button class="btn-place-order">
    <div class="css-xjhrni">PLACE ORDER</div>
  </button>
  `;
}


function generatecontainerhtml(item){ /**this time we are not using items array but bag_items_object array thus we can use item argument here which passes to element argument above */
    return `<div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.image}" alt="item image">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="strike-price">Rs ${item.current_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick = "removecontainer(${item.id})">X</div>
          </div>`  ;
}
