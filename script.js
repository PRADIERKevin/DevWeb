document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-button");
    const notesBoard = document.querySelector(".notes-board");
    const searchInput = document.getElementById("search");
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let tags = JSON.parse(localStorage.getItem("tags")) || [];

    function renderNotes(filteredNotes = notes) {
        notesBoard.innerHTML = "";
        filteredNotes.forEach(note => {
            notesBoard.appendChild(createNoteElement(note));
        });
    }

    function createNoteElement({ title, content, color = "#DDDDDD", tags = [] }) {
        const noteBlock = document.createElement("div");
        noteBlock.classList.add("notes-block");
        noteBlock.style.backgroundColor = color;

        noteBlock.innerHTML = `
            <div class="notes-block-text"><strong>${title}</strong></div>
            <div class="task"><span>${content}</span></div>
            <div class="note-tags">${tags.map(tag => `<span class="note-tag" style="background-color: ${getTagColor(tag)}">${tag}</span>`).join(" ")}</div>
            <div class="notes-button">
                <button class="edit-button">Modifier</button>
                <button class="label-button">Ajouter un tag</button>
                <button class="remove-button">Supprimer</button>
            </div>
        `;

        noteBlock.querySelector(".edit-button").addEventListener("click", () => editNote(title, content, color, tags));
        noteBlock.querySelector(".remove-button").addEventListener("click", () => removeNote(title));
        noteBlock.querySelector(".label-button").addEventListener("click", () => openTagPopup(title));

        return noteBlock;
    }

    function getTagColor(tagTitle) {
        const tag = tags.find(t => t.title === tagTitle);
        return tag ? tag.color : "#ccc";
    }

    function addNote() {
        const newNote = { title: `Nouvelle Note ${notes.length + 1}`, content: "Ceci est une nouvelle note.", color: "#DDDDDD", tags: [] };
        notes.push(newNote);
        localStorage.setItem("notes", JSON.stringify(notes));
        renderNotes();
    }

    function removeNote(title) {
        notes = notes.filter(note => note.title !== title);
        localStorage.setItem("notes", JSON.stringify(notes));
        renderNotes();
    }

    function editNote(title, content, color, tags) {
        window.location.href = `editNote.html?title=${encodeURIComponent(title)}&content=${encodeURIComponent(content)}&color=${encodeURIComponent(color)}&tags=${encodeURIComponent(JSON.stringify(tags))}`;
    }    

    function openTagPopup(noteTitle) {
        let existingPopup = document.querySelector(".popup");
        if (existingPopup) existingPopup.remove(); // Supprime l'ancienne popup si elle existe

        const tagPopup = document.createElement("div");
        tagPopup.classList.add("popup");

        tagPopup.innerHTML = `
            <div class="popup-content">
                <span class="close">&times;</span>
                <h3>Choisissez un tag :</h3>
                <div id="popupTagList">${tags.map(tag => `
                    <div class="tag-item">
                        <input type="checkbox" value="${tag.title}" ${notes.find(n => n.title === noteTitle)?.tags.includes(tag.title) ? "checked" : ""}>
                        <label style="background-color: ${tag.color}">${tag.title}</label>
                    </div>
                `).join("")}</div>
                <button id="validateTags">Valider</button>
            </div>
        `;

        document.body.appendChild(tagPopup);

        // Gérer la fermeture de la popup
        tagPopup.querySelector(".close").addEventListener("click", () => tagPopup.remove());

        // Validation des tags sélectionnés
        tagPopup.querySelector("#validateTags").addEventListener("click", () => {
            const selectedTags = Array.from(tagPopup.querySelectorAll("input:checked")).map(input => input.value);
            const noteIndex = notes.findIndex(n => n.title === noteTitle);
            if (noteIndex > -1) {
                notes[noteIndex].tags = selectedTags;
                localStorage.setItem("notes", JSON.stringify(notes));
                renderNotes();
            }
            tagPopup.remove();
        });
    }

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        renderNotes(notes.filter(note => note.title.toLowerCase().includes(searchTerm)));
    });

    addButton.addEventListener("click", addNote);
    renderNotes();
});