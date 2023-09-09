// Added this line because loadNotes was not loading
window.onload = loadNotes;

function addNote() {
    const note = document.getElementById("note").value;
    if (note.trim() === "") {
        return;
    }

    const notesContainer = document.getElementById("notesContainer");
    const noteElement = document.createElement("p");

    const currentNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const noteNumber = currentNotes.length + 1;

    noteElement.textContent = `${noteNumber}. ${note}`;
    notesContainer.appendChild(noteElement);

    currentNotes.push(note);
    localStorage.setItem("notes", JSON.stringify(currentNotes));

    document.getElementById("note").value = "";
}

function loadNotes() {
    const notesContainer = document.getElementById("notesContainer");
    notesContainer.innerHTML = "";
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    for (let i = 0; i < notes.length; i++) {
        const noteElement = document.createElement("p");
        noteElement.textContent = `${i + 1}. ${notes[i]}`;
        notesContainer.appendChild(noteElement);
    }
}

function saveList() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    const doc = new jsPDF('p', 'mm', 'a4');

    const image = new Image();
    image.src = '/Imagenes/PDF.jpg';

    image.onload = function() {
        const imgWidth = 120;
        const aspectRatio = image.width / image.height;
        const imgHeight = imgWidth / aspectRatio;

        const centerX = (210 - imgWidth) / 2;
        doc.addImage(image, 'PNG', centerX, 20, imgWidth, imgHeight);

        const lineHeight = 10;
        const startX = 20;
        const startY = imgHeight + 40;
        for (let i = 0; i < notes.length; i++) {
            const noteText = `${i + 1}. ${notes[i]}`;
            doc.text(startX, startY + i * lineHeight, noteText);
        }

        doc.save("lista_de_compras.pdf");
    };
}

function clearList() {
    localStorage.removeItem("notes");
    loadNotes();
}
