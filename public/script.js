const data = {
	produtos: [
		{
			id: 1,
			nome: "Mochila de Trilha 40L",
			preco: 349.90,
			categoria: "Mochilas",
			imagem: "https://picsum.photos/id/29/400/250",
			descricao: "Mochila resistente com suporte lombar e compartimento para hidratação.",
			emEstoque: true
		},
		{
			id: 2,
			nome: "Mochila Urbana 20L",
			preco: 189.90,
			categoria: "Mochilas",
			imagem: "https://picsum.photos/id/28/400/250",
			descricao: "Mochila leve e compacta, ideal para caminhadas curtas.",
			emEstoque: true
		},
		{
			id: 3,
			nome: "Bota de Trilha Impermeável",
			preco: 499.00,
			categoria: "Calçados",
			imagem: "https://picsum.photos/id/11/400/250",
			descricao: "Bota com solado antiderrapante e proteção contra água.",
			emEstoque: true
		},
		{
			id: 4,
			nome: "Tênis de Caminhada",
			preco: 279.00,
			categoria: "Calçados",
			imagem: "https://picsum.photos/id/137/400/250",
			descricao: "Tênis leve com amortecimento para longas caminhadas.",
			emEstoque: false
		},
		{
			id: 5,
			nome: "Cantil 1L",
			preco: 79.90,
			categoria: "Acessórios",
			imagem: "https://picsum.photos/id/167/400/250",
			descricao: "Cantil de alumínio resistente e leve para trilhas.",
			emEstoque: true
		},
		{
			id: 6,
			nome: "Bastão de Trekking",
			preco: 129.90,
			categoria: "Acessórios",
			imagem: "https://picsum.photos/id/250/400/250",
			descricao: "Bastão regulável com empunhadura de cortiça.",
			emEstoque: true
		},
		{
			id: 7,
			nome: "Barraca para 2 Pessoas",
			preco: 699.00,
			categoria: "Camping",
			imagem: "https://picsum.photos/id/15/400/250",
			descricao: "Barraca leve com proteção UV e resistência à chuva.",
			emEstoque: false
		},
		{
			id: 8,
			nome: "Saco de Dormir -5°C",
			preco: 389.00,
			categoria: "Camping",
			imagem: "https://picsum.photos/id/10/400/250",
			descricao: "Saco de dormir compacto para baixas temperaturas.",
			emEstoque: true
		}
	]
};

var productList = document.getElementById("product-list");
var productDetails = document.getElementById("product-details");
var searchInput = document.querySelector("#search");
var categorySelect = document.querySelector("#category");

function formatPrice(preco) {
	return "R$ " + preco.toFixed(2);
}

function createProductCard(produto) {
	var card = document.createElement("div");

	card.setAttribute("data-id", produto.id);
	card.classList.add("card", "h-100", "shadow-sm");
	card.style.border = "1px solid #ddd";

	card.innerHTML = `
		<img src="${produto.imagem}" alt="${produto.nome}" class="card-foto">
		<div class="card-body d-flex flex-column p-3">
			<h3 class="card-title-verde fs-5">${produto.nome}</h3>
			<p class="fw-bold">${formatPrice(produto.preco)}</p>
			<p class="text-muted small">${produto.categoria}</p>
			<button class="btn-verde mb-2" onclick="showProductDetails(${produto.id})">
				Ver detalhes
			</button>
			<button class="btn-verde" onclick="destacar(this)">
				Destacar
			</button>
		</div>
	`;

	return card;
}

function renderProducts(produtos) {
	productList.innerHTML = "";

	for (var i = 0; i < produtos.length; i++) {
		var col = document.createElement("div");

		col.classList.add("col-12", "col-sm-6", "col-lg-4");
		col.appendChild(createProductCard(produtos[i]));

		productList.appendChild(col);
	}
}

function renderCategories() {
	var categorias = [];

	for (var i = 0; i < data.produtos.length; i++) {
		var cat = data.produtos[i].categoria;

		if (categorias.indexOf(cat) === -1) {
			categorias.push(cat);
		}
	}

	categorySelect.innerHTML = "<option value=''>Todas</option>";

	for (var j = 0; j < categorias.length; j++) {
		var option = document.createElement("option");

		option.value = categorias[j];
		option.innerHTML = categorias[j];

		categorySelect.appendChild(option);
	}
}

function showProductDetails(id) {
	var produto = null;

	for (var i = 0; i < data.produtos.length; i++) {
		if (data.produtos[i].id === id) {
			produto = data.produtos[i];
		}
	}

	var estoque = produto.emEstoque ? "Em estoque" : "Fora de estoque";

	productDetails.innerHTML = `
		<h2>${produto.nome}</h2>
		<p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
		<p><strong>Categoria:</strong> ${produto.categoria}</p>
		<p><strong>Estoque:</strong> ${estoque}</p>
		<p><strong>Descrição:</strong> ${produto.descricao}</p>
	`;
}

function destacar(botao) {
	var card = botao.parentElement.parentElement;
	card.classList.toggle("highlight");
}

function filterProducts() {
	var texto = searchInput.value.toLowerCase();
	var categoria = categorySelect.value;

	var filtrados = [];

	for (var i = 0; i < data.produtos.length; i++) {
		var produto = data.produtos[i];

		var nomeContem = produto.nome.toLowerCase().includes(texto);
		var categoriaCorreta = categoria === "" || produto.categoria === categoria;

		if (nomeContem && categoriaCorreta) {
			filtrados.push(produto);
		}
	}

	renderProducts(filtrados);
}

searchInput.addEventListener("input", filterProducts);
categorySelect.addEventListener("change", filterProducts);
document.getElementById("btnRender").addEventListener("click", filterProducts);

renderCategories();
renderProducts(data.produtos);