const search = document.getElementById("search");
const matchList = document.getElementById("match-list");


const searchCollection = async searchText => {
    const res = await fetch('../data/search.json');
    const data = await res.json();

    let matches = data.filter(archivo => {
        const regex = new RegExp (`^${searchText}`, 'gi');
        return archivo.collection.match(regex);
    });

    if(searchText.length === 0) { 
        matches = [];
        matchList.innerHTML ='';
    }
    outputHtml(matches);
};

const outputHtml = matches => {
    if(matches.length > 0) {
        const html = matches.map(match => `
        <div class= "card card-body mb-1" id="resultadosBusqueda">
        <a href=${match.html}> ${match.collection} </a>
        <small> ${match.year} - ${match.medio} - ${match.tipo} </small>
        <hr class="dropdown-divider">
        </div>
        `
        )
        .join('');
    matchList.innerHTML = html;
    }
}

search.addEventListener('input', () => searchCollection (search.value));