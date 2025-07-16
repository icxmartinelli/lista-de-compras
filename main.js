// variável nomeObjeto = { chave: valor }
let listaItens = [];

const form = document.getElementById('form-itens');
const itensInput = document.getElementById('receber-item');
const ulItens = document.getElementById('lista-de-itens');

form.addEventListener('submit', function (evento) {
    evento.preventDefault();
    salvarItem();
    mostrarItem();
});

function salvarItem() {
    const comprasItem = itensInput.value;
    const checarDuplicado = listaItens.some((elemento) => elemento.valor.toUpperCase() === comprasItem.toUpperCase());

    if (checarDuplicado) {
        alert('Item já existente');
    } else {
        listaItens.push({
            valor: comprasItem
        });
    }
}

function mostrarItem() {
    ulItens.innerHTML = '';
    listaItens.forEach((elemento, index) => {
        ulItens.innerHTML += `<li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" value="${elemento.valor}"></input>
        </div>
        <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li>`;
    });
}