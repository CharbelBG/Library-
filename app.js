(function(){
    let library = [];
    class Book{
        constructor(name,author,pages,dataIndex){
            this.name = name;
            this.author = author;
            this.pages = pages;
            this.dataIndex = dataIndex;
        }
    }
    let middle = document.querySelector(".main");
    function displayBooks(){
        for(let bookDetails in library){
            let placeHolder = document.createElement("div");
            placeHolder.setAttribute("class","book_placeholder");
            middle.appendChild(placeHolder);

            let namePlaceholder = document.createElement('div');
            namePlaceholder.innerText = library[bookDetails].name;
            placeHolder.appendChild(namePlaceholder);

            let authorPlaceHolder = document.createElement('div');
            authorPlaceHolder.innerText = library[bookDetails].author;
            placeHolder.appendChild(authorPlaceHolder);

            let pagesPlaceHolder = document.createElement('div');
            pagesPlaceHolder.innerText = library[bookDetails].pages;
            placeHolder.appendChild(pagesPlaceHolder);

            let pagesRead = document.createElement('input');
            pagesRead.setAttribute("type","number");
            pagesRead.setAttribute("placeholder","pages Read");
            pagesRead.setAttribute("min","0");
            placeHolder.appendChild(pagesRead);
            let removeButton = document.createElement("button");
            removeButton.classList.add("button");
            
            removeButton.classList.add("removeButton");
            removeButton.innerText = "Remove Book";
            removeButton.addEventListener("click",(event)=>{
               deleteFromList(event.target.parentNode);
            })
            placeHolder.appendChild(removeButton);
            placeHolder.setAttribute("dataIndex",library[bookDetails].dataIndex);
        }
    }
    function deleteFromList(value){
        let deleteCard = value.getAttribute("dataIndex");
        for(let bookDetails in library){
            if(library[bookDetails].dataIndex == deleteCard){
                let anchor = library.indexOf(library[bookDetails]);
                library.splice(anchor,1);
                saveState();
            }
        }
        resetbooks();
        displayBooks();
    }
    displayBooks();
    let newBookButton = document.querySelector("#add_book");
    let addBookForm = document.querySelector("#form");
    let section = document.querySelector("section");
    let xbutton = document.querySelector("#form div");
    xbutton.onclick = ()=>{
        closePopUp();
    }
    function closePopUp(){
        addBookForm.classList.remove("visible");
        addBookForm.classList.add("hidden");
        section.classList.remove("blur");
    }
    newBookButton.onclick = () =>{
        if(addBookForm.className == "hidden"){
                addBookForm.classList.remove("hidden");
                addBookForm.classList.add("visible");
                section.classList.add("blur");
        } else if(addBookForm.className == "visible"){
                closePopUp();
        }
    }
    let addBookButton = document.querySelector("form");
    addBookButton.onsubmit = () =>{
       let input_name = document.querySelector("form input:nth-child(1)").value;
       let input_author = document.querySelector("form input:nth-child(2)").value;
       let input_pages = document.querySelector("form input:nth-child(3)").value;
       var dataIndex = uniqueInteger();
       let newbook = new Book(input_name,input_author,input_pages, dataIndex);
       library[dataIndex] = newbook;
       console.log("dataindex is " + dataIndex);
       saveState();
       resetbooks();
       displayBooks();
       resetInput();
       
    }
    function resetInput(){
        document.querySelector("form").reset();
    }
    function resetbooks(){
        middle.innerHTML = ""; 
        addBookForm.classList.remove("visible");
        addBookForm.classList.add("hidden");
        section.classList.remove("blur");
        
    }
    uniqueInteger.count = 0;
    function uniqueInteger(){
        return uniqueInteger.count++;
    }
    function saveState(){
        localStorage.setItem("saved_lib_state", JSON.stringify(library));
        console.log(localStorage.getItem("saved_lib_state"));
    }
    let loaded_lib;
    function loadState(){
      loaded_lib = JSON.parse(localStorage.getItem("saved_lib_state"));
    }
    window.onload = () =>{
        loadState();
        if(loaded_lib){
            library = loaded_lib;
        }
        displayBooks();
    }
}());
