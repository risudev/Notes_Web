console.log('Welcome to the notes app');
showNotes();
// If user adds a note, add it to the localStorge
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e){
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if (notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    console.log(notesObj);
    showNotes();
});

// Function to show Elements from localStorage
function showNotes(){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function(element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title">Note ${index +1}</h5>
            <p class="card-text">${element}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
          </div>
        </div>`
    });
    let notesElement = document.getElementById('notes');
    if (notesObj.length != 0){
        notesElement.innerHTML = html;
    }
    else{
        notesElement.innerHTML = `Nothing to Show "Add a Note" section above to add notes.`;
    }
}

// Function to delete a Note
function deleteNote(index){
    // console.log('I am deleting', index);

    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// search button search your notes
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){
    
    let inputVal = search.value.toLowerCase(); 
    // console.log('Input Event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})

