document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById('add-button');
    const notesBoard = document.querySelector('.notes-board');
    let noteCount = 0

    addButton.addEventListener('click', function () {
        const newNote = createNoteElement("New Note", "This is a new note.");
        notesBoard.appendChild(newNote);
    });

    function createNoteElement(title, content) {
        const noteBlock = document.createElement('div');
        noteBlock.classList.add('notes-block');

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
        editButton.addEventListener('click', () => editNoteContent(titleElement, contentElement));
        buttonContainer.appendChild(editButton);

        const labelButton = document.createElement('button');
        labelButton.classList.add('button');
        labelButton.innerText = 'Add label';
        buttonContainer.appendChild(labelButton);

        const removeButton = document.createElement('button');
        removeButton.classList.add('button');
        removeButton.innerText = 'Remove';
        removeButton.onclick = () => noteBlock.remove();
        buttonContainer.appendChild(removeButton);

        localStorage.setItem(noteCount,`note${noteCount}` );
        console.log(localStorage.getItem(`${noteCount}`));
        console.log(noteCount);
        noteCount +=1

        noteBlock.appendChild(buttonContainer);
        return noteBlock;
    }

    function editNoteContent(titleElement, contentElement) {
        const originalTitle = titleElement.innerText;
        const originalContent = contentElement.innerText;

        window.location.href = `./editNote.html?title=${encodeURIComponent(originalTitle)}&content=${encodeURIComponent(originalContent)}`;
    }

});