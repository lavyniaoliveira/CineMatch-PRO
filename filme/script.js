class Filme {
    constructor(titulo, genero, duracao, imagem, youtube) {
        this.titulo = titulo;
        this.genero = genero;
        this.duracao = duracao;
        this.imagem = imagem;
        this.youtube = youtube;
    }
}

const form = document.getElementById("filmeForm");

if (form) {

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        const titulo = document.getElementById("titulo").value;
        const genero = document.getElementById("genero").value;
        const duracao = Number(document.getElementById("duracao").value);
        const imagem = document.getElementById("imagem").value;
        const youtube = document.getElementById("youtube").value;

        const filme = new Filme(
            titulo,
            genero,
            duracao,
            imagem,
            youtube
        );

        const filmes =
            JSON.parse(localStorage.getItem("filmes")) || [];

        filmes.push(filme);

        localStorage.setItem(
            "filmes",
            JSON.stringify(filmes)
        );

        alert("Filme cadastrado com sucesso!");

        form.reset();
    });
}

const catalogo = document.getElementById("catalogo");

if (catalogo) {

    const filmes =
        JSON.parse(localStorage.getItem("filmes")) || [];

    filmes.forEach(filme => {

        catalogo.innerHTML += `
        <div class="card">

            <img
                src="${filme.imagem}"
                alt="Capa do filme ${filme.titulo}"
            >

            <div class="card-content">

                <h3>${filme.titulo}</h3>

                <p><strong>Gênero:</strong> ${filme.genero}</p>

                <p><strong>Duração:</strong> ${filme.duracao} min</p>

                <iframe
                    src="https://www.youtube.com/embed/${filme.youtube}">
                </iframe>

            </div>

        </div>
        `;
    });

    document.getElementById("totalFilmes").textContent =
        `Total de Filmes: ${filmes.length}`;

    const totalMinutos = filmes.reduce(
        (total, filme) => total + Number(filme.duracao),
        0
    );

    document.getElementById("totalMinutos").textContent =
        `Total de Minutos Assistidos: ${totalMinutos}`;
}