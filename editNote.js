document.addEventListener("DOMContentLoaded", function () {
    const titleInput = document.getElementById("noteTitle");
    const contentInput = document.getElementById("noteContent");
    const colorInput = document.getElementById("noteColor");
    const saveButton = document.getElementById("saveButton");

    // Récupère les paramètres de l'URL
    const queryParams = new URLSearchParams(window.location.search);
    const noteTitle = queryParams.get("title") || "";
    const noteContent = queryParams.get("content") || "";
    const noteColor = queryParams.get("color") || "";

    // Pré-remplissage des champs avec les valeurs de la note
    titleInput.value = noteTitle;
    contentInput.value = noteContent;
    colorInput.value = noteColor;

    saveButton.addEventListener("click", function () {
        const updatedNote = {
            title: titleInput.value,
            content: contentInput.value,
            color: colorInput.value
        };

        let notes = JSON.parse(localStorage.getItem("notes")) || [];
        const existingIndex = notes.findIndex(n => n.title === noteTitle);

        // Si la note existe déjà, on la met à jour, sinon on l'ajoute
        if (existingIndex > -1) {
            notes[existingIndex] = updatedNote;
        } else {
            notes.push(updatedNote);
        }

        // Sauvegarde dans le localStorage et redirection vers la page principale
        localStorage.setItem("notes", JSON.stringify(notes));
        window.location.href = "index.html";
    });
});