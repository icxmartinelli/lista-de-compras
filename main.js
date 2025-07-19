// variável nomeObjeto = { chave: valor }
let listaItens = [];
let itemAEditar;

const form = document.getElementById('form-itens');
const itensInput = document.getElementById('receber-item');
const ulItens = document.getElementById('lista-de-itens');
const ulItensComprados = document.getElementById('itens-comprados');
const listaRecuperada = localStorage.getItem('listaItens');

function atualizaLocalStorage() {
    localStorage.setItem('listaItens', JSON.stringify(listaItens));
}

// false = valores omitidos, 0, null, NaN, undefined, "", false
if (listaRecuperada) {
    listaItens = JSON.parse(listaRecuperada);
    mostrarItem();
} else {
    listaItens = [];
}

form.addEventListener('submit', function (evento) {
    evento.preventDefault();
    salvarItem();
    mostrarItem();
    itensInput.focus();
});

function salvarItem() {
    const comprasItem = itensInput.value;
    const checarDuplicado = listaItens.some((elemento) => elemento.valor.toUpperCase() === comprasItem.toUpperCase());

    if (checarDuplicado) {
        alert('Item já existente');
    } else {
        listaItens.push({
            valor: comprasItem,
            checar: false
        });
    }

    itensInput.value = '';
}

function mostrarItem() {
    ulItens.innerHTML = '';
    ulItensComprados.innerHTML = '';

    listaItens.forEach((elemento, index) => {
        if (elemento.checar) {
            ulItensComprados.innerHTML += `<li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" checked class="is-clickable" />  
            <span class="itens-comprados is-size-5">${elemento.valor}</span>
        </div>
        <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li>`;
        } else {
            ulItens.innerHTML += `<li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" value="${elemento.valor}" ${index !== Number(itemAEditar) ? 'disabled' : ''}></input>
        </div>
        <div>
            ${ index === Number(itemAEditar) ? '<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li>`;
        }
    });

    const inputsCheck = document.querySelectorAll('input[type="checkbox"]');
    inputsCheck.forEach(i => {
        i.addEventListener('click', (evento) => {
            const valorElemento = evento.target.parentElement.parentElement.getAttribute('data-value');
            listaItens[valorElemento].checar = evento.target.checked;
            mostrarItem();
        });
    });

    const deletarObjetos = document.querySelectorAll('.deletar');
    deletarObjetos.forEach(i => {
        i.addEventListener('click', (evento) => {
            const valorElemento = evento.target.parentElement.parentElement.getAttribute('data-value');
            listaItens.splice(valorElemento, 1); // poderia também substituir o elemento por outro objeto
            mostrarItem();
        });
    });

    const editarItens = document.querySelectorAll('.editar');
    editarItens.forEach(i => {
        i.addEventListener('click', (evento) => {
            itemAEditar = evento.target.parentElement.parentElement.getAttribute('data-value');
            mostrarItem();
        });
    });
    
    atualizaLocalStorage();
}

function salvarEdicao() {
    const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`);
    listaItens[itemAEditar].valor = itemEditado.value;
    itemAEditar = -1;
    mostrarItem();
}