let userD = document.querySelector("#theUserD")
let ownerD = document.querySelector("#theOwnerD")

document.addEventListener("click", function(e){
    if((e.target.id === "owner" || e.target.id === "user")&& (e.target.className !== "active") ){
      e.target.parentNode.children[0].classList.remove("active")
      e.target.parentNode.children[1].classList.remove("active")
      e.target.classList.add("active")
      let active = document.querySelector(".active")
      userD.style.display="none"
      ownerD.style.display="none"
      
      if(active.id ==="user"){
        userD.style.display="inline"
      }else{
        ownerD.style.display="inline"
      }
    }
})

function defaultColor(inputField){
  inputField.style.borderColor  = 'black'
  details.style.color = 'blue'
}
function errorColor (inputField){
  inputField.style.borderColor  = 'red'
  details.style.color = 'red'
}

let details = document.querySelector("#details")

let IDInput = document.querySelector("#IDInput")
let bookTitleInput = document.querySelector("#bookTitleInput")
let athorIput = document.querySelector("#athorIput")
let priceInput = document.querySelector("#priceInput")
let QuantityInput = document.querySelector("#QuantityInput")

let bookStore = [
  [1, "The happy brain", "Dain branit", 35, 10],
  [2, "Zecola land", "Amr Abdahameed", 20, 3], // لماذا لا يكتب هذا الكود
  [3, "Book Title", "Author Name", 0, 0]
];

let Tbody = document.querySelector(".Tbody");


//اضافه كتاب
let addButton = document.querySelector(".add")
addButton.onclick = function(){
  addbook(bookTitleInput.value,athorIput.value,priceInput.value,QuantityInput.value)
}

function addbook(bookT, Author, price, quantity) {
  bookStore.push([bookStore.length + 1, bookT, Author, price, quantity]);
  refreshthebooks()
}

//تعديل الكتاب
let modiButton = document.querySelector(".modi")
modiButton.onclick = function(){
  Modifbook(IDInput.value,bookTitleInput.value,athorIput.value,priceInput.value,QuantityInput.value)
}

function Modifbook(id, bookT, Author, price, quantity) {
  for (let arr of bookStore) {
    if (arr[0] == id) {
      console.log("bbmbmnb")
      bookStore[id - 1][1] = bookT;
      bookStore[id - 1][2] = Author;
      bookStore[id - 1][3] = price;
      bookStore[id - 1][4] = quantity;
      break;
    }
  }
  refreshthebooks()
}

//حذف الكتاب باستخدام ال  id

let deletButton = document.querySelector(".delet")

deletButton.onclick = function (){
deletbooks(IDInput.value)
}
function deletbooks(id) {
  bookStore.splice(id - 1, 1);
  for (; id < bookStore.length + 1; id++) {
    bookStore[id - 1][0] = bookStore[id - 1][0] - 1;
  }
  refreshthebooks()
}

//معرفه الكتاب من خلال ال id
let showIDInput = document.querySelector("#showIDInput")
let showIDbutton = document.querySelector("#showID")

showIDbutton.onclick = function(){
  showdetails(showIDInput.value);
}

function showdetails(id) {
  if (id > 0 && id <=bookStore.length){
    defaultColor(showIDInput)
    details.innerText=(`The id is: ${id}
    The book title is: ${bookStore[id - 1][1]}
    The Author is: ${bookStore[id - 1][2]}
    The price is: ${bookStore[id - 1][3]}
    The Quantity is: ${bookStore[id - 1][4]}`);
  }else{
    errorColor(showIDInput)
    details.innerText=`Enter a number under ${bookStore.length}`
  }
}

//القدرة على الاستعلام عن كتاب
// عن كتاب خلال:
// رقم الكتاب Book Id
// عنوان الكتاب Title
// اسم المؤلف Author

let showAInput = document.querySelector("#showAInput")
let showAbutton = document.querySelector("#showA")

showAbutton.onclick = function(){
  bookInform(showAInput.value);
}

function bookInform(detail) {
  let undone = true
  for (let book of bookStore) {
    if (book[0] == detail || book[1] === detail || book[2] === detail) {
      defaultColor(showAInput)
      details.innerText = `The id is: ${book[0]}
      The book title is: ${book[1]}
      The Author is: ${book[2]}
      The price is: ${book[3]}
      The Quantity is: ${book[4]}`;
      undone = false
      console.log(99)
    }
  }
  if(undone){
    errorColor(showAInput)
    details.innerText = `Enter a right ID , title or author name`
  }
}

let yourMoneyInput = document.querySelector("#yourMoneyInput")
let theNameInput = document.querySelector("#theNameInput")
let quantityInput = document.querySelector("#quantityInput")

let buyButton = document.querySelector(".buy")

buyButton.onclick = function(){
  buybook(theNameInput.value,quantityInput.value,yourMoneyInput.value)
}

function buybook(nameB, quantity, yourmoney) {
  let isbook;
  let isquanity;
  let isyourmoney;
  
    for (book of bookStore) {
      if (nameB === book[1]) {
        isbook = true;
        if (quantity <= book[4]) {
          isquanity = true;
          if (yourmoney >= quantity * book[3]) {
            isyourmoney = true;
            if(quantity !=0){
              details.innerText =`you have bought "${nameB}"
              The quantity is ${quantity}
              The total price is ${quantity} * ${book[3]} = ${quantity * book[3]}`;
              break;
            }else{
              details.innerText =`enter the number of books`
            }
          }
        }
      }
    }
    if (!isbook) {
      details.innerText =`Sorry, We don't have the book`;
    } else if (!isquanity) {
      details.innerText =`Sorry, We don't have the Required quantity`;
    } else if (!isyourmoney) {
      details.innerText =`Sorry, you don't have enough money`;
    }

    refreshthebooks()
  }
  
  //إعادة ترتيب الكتب وإضافتها 
  function refreshthebooks(){
    
    for (let i = 0; i <bookStore.length; i++){
      let therow = document.createElement("tr");
      if(i == 0){
        Tbody.innerHTML = ""
      }
      
      let theid = document.createTextNode(bookStore[i][0])
      let thetitle = document.createTextNode(bookStore[i][1])
      let theauthor = document.createTextNode(bookStore[i][2])
      let theprice = document.createTextNode(bookStore[i][3])
      let thequantity = document.createTextNode(bookStore[i][4])
      
      let idC = document.createElement("td");
      let booktitleC = document.createElement("td");
      let authorC = document.createElement("td");
      let priceC = document.createElement("td");
      let quantityC = document.createElement("td");
      

      idC.append(theid)
      booktitleC.append(thetitle)
      authorC.append(theauthor)
      priceC.append(theprice)
      quantityC.append(thequantity)
      
      therow.append(idC);
      therow.append(booktitleC);
      therow.append(authorC);
      therow.append(priceC);
      therow.append(quantityC);
      
      Tbody.append(therow)
    }
  }
  
  addbook("Clean Code", "Robert Cencil Martin", 50, 5);
  addbook("But how do it know", "J.Clark Scott", 59, 22);
  addbook("start with why", "Simon Sinek", 80, 13);
  addbook("prog", "abdalrahman", 39, 4);