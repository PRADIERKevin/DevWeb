document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById('add-button');
    const notesBoard = document.querySelector('.notes-board');
    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Chargement des notes depuis le localStorage
    notes.forEach(note => {
        const noteElement = createNoteElement(note.title, note.content);
        notesBoard.appendChild(noteElement);
    });

    addButton.addEventListener('click', function () {
        const newNote = { title: `New Note ${notes.length}`, content: "This is a new note." };
        notes.push(newNote);
        localStorage.setItem('notes', JSON.stringify(notes));
        
        const noteElement = createNoteElement(newNote.title, newNote.content);
        notesBoard.appendChild(noteElement);
    });

    function createNoteElement(title, content) {
        const noteBlock = document.createElement('div');
        noteBlock.classList.add('notes-block');
        const noteBlockColor = "#DDDDDD"
        noteBlock.style.backgroundColor = noteBlockColor

        const titleElement = document.createElement('div');
        titleElement.classList.add('notes-block-text');
        titleElement.innerHTML = `<strong>${title}</strong>`;
        noteBlock.appendChild(titleElement);

        const contentElement = document.createElement('div');
        contentElement.classList.add('task');
        contentElement.innerHTML = `<span>${content}</span>`;
        noteBlock.appendChild(contentElement);

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('notes-button');

        const editButton = document.createElement('button');
        editButton.classList.add('button');
        editButton.innerText = 'Edit';
        editButton.addEventListener('click', () => editNoteContent(titleElement, contentElement, noteBlockColor));
        buttonContainer.appendChild(editButton);

        const labelButton = document.createElement('button');
        labelButton.classList.add('button');
        labelButton.innerText = 'Add label';
        buttonContainer.appendChild(labelButton);

        const removeButton = document.createElement('button');
        removeButton.classList.add('button');
        removeButton.innerText = 'Remove';
        removeButton.onclick = () => removeNote(noteBlock, title);
        buttonContainer.appendChild(removeButton);

        noteBlock.appendChild(buttonContainer);
        return noteBlock;
    }

    function removeNote(noteBlock, title) {
        notes = notes.filter(note => note.title !== title);
        localStorage.setItem('notes', JSON.stringify(notes));
        noteBlock.remove();
    }

    function editNoteContent(titleElement, contentElement, noteBlockColor) {
        const originalTitle = titleElement.innerText;
        const originalContent = contentElement.innerText;
        const originalColor = noteBlockColor;

        window.location.href = `./editNote.html?title=${encodeURIComponent(originalTitle)}&content=${encodeURIComponent(originalContent)}&color=${encodeURIComponent(originalColor)}`;
    }
});