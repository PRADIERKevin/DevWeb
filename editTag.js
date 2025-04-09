document.addEventListener("DOMContentLoaded", function () {
    const tagTitleInput = document.getElementById("tagTitle");
    const tagColorInput = document.getElementById("tagColor");
    const addTagButton = document.getElementById("addTagButton");
    const tagsBoard = document.querySelector(".tags-board");

    let tags = JSON.parse(localStorage.getItem("tags")) || [];

    function displayTags() {
        tagsBoard.innerHTML = "";
        tags.forEach(tag => {
            const tagElement = createTagElement(tag);
            tagsBoard.appendChild(tagElement);
        });
    }

    function createTagElement(tag) {
        const tagBlock = document.createElement("div");
        tagBlock.classList.add("tag-block");
        tagBlock.style.backgroundColor = tag.color;

        const titleElement = document.createElement("span");
        titleElement.innerText = tag.title;
        titleElement.classList.add("tag-text");

        const removeButton = document.createElement("button");
        removeButton.innerText = "X";
        removeButton.classList.add("remove-tag-button");
        removeButton.onclick = () => removeTag(tag.title);

        tagBlock.appendChild(titleElement);
        tagBlock.appendChild(removeButton);
        return tagBlock;
    }

    function addTag() {
        const title = tagTitleInput.value.trim();
        const color = tagColorInput.value;

        if (title === "") {
            alert("Le titre du tag ne peut pas être vide !");
            return;
        }

        const newTag = { title, color };
        tags.push(newTag);
        localStorage.setItem("tags", JSON.stringify(tags));

        tagsBoard.appendChild(createTagElement(newTag));

        tagTitleInput.value = "";
        tagColorInput.value = "#000000";
    }

    function removeTag(title) {
        tags = tags.filter(tag => tag.title !== title);
        localStorage.setItem("tags", JSON.stringify(tags));
        displayTags();
    }

    addTagButton.addEventListener("click", addTag);

    displayTags();
});
