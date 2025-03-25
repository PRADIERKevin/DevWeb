// Fonction pour obtenir les paramètres de l'URL
function getQueryParams() {
    const params = {};
    window.location.search.substring(1).split("&").forEach(param => {
        const [key, value] = param.split("=");
        params[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return params;
}

const queryParams = getQueryParams();
const title = queryParams.title || '';
const content = queryParams.content || '';
const color = queryParams.color || '';

// Maintenant, vous pouvez utiliser `title` et `content` pour initialiser vos champs
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("noteTitle").value = title;
    document.getElementById("noteContent").value = content;
    document.getElementById("noteColor").value = color;
});