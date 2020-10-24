onload = showList

// Carrega a lista na tela se houver algo gravado na LOCALSTORAGE

function showList() {

    let load_list = localStorage.getItem("my_list");
    let list_items = document.getElementById("ol_list");

    let array = JSON.parse(load_list);

    list_items.innerHTML = "";
    ol_list.style.display = "none";

    if ((localStorage.getItem("my_list") == null) || (localStorage.getItem("my_list") == "undefined")) {
        hide_Erase_Buttons()
    } else {

        show_Erase_Buttons()

        for (let item in array) {

            li = document.createElement("li");
            li.innerHTML = array[item];
            ol_list.appendChild(li)

            ol_list.style.display = "inline-block"
        }
    }

}

// Cria a lista item a item inseridos pelo usuário

function create_list() {
    if (typeof (Storage) !== "undefined") {

        let field_content = document.getElementById("task_input");
        let data = field_content.value;

        let ol_list = document.getElementById("ol_list");

        li = document.createElement("li");

        if (localStorage.getItem("my_list") == null) {

            if (data == "") {
                showAlert("To start your list, type something first.\nPlease, use the INPUT field to do so.")
            } else {

                li.innerHTML = data
                ol_list.appendChild(li)

                var array = data.split(" ");

                let list = localStorage.setItem("my_list", JSON.stringify(array));
                show_Erase_Buttons()
            }

            field_content.value = ""


        } else {

            if (data == "") {
                showAlert("The INPUT field cannot be BLANK. =]")
            } else {

                // Trazendo o array armazenado na LOCALSTORAGE de volta.

                let load_list = localStorage.getItem("my_list")
                let list_items = JSON.parse(load_list)

                list_items.push(data);

                let list = localStorage.setItem("my_list", JSON.stringify(list_items));
                show_Erase_Buttons()
            }

            field_content.value = ""


        }
        showList()

    } else {
        showAlert("We're sorry! Your current web browser doesn't support Web Storage.")
    }
}

// Mostra os botões ERASE TASK e ERASE LIST

function show_Erase_Buttons() {
    let buttons = document.getElementById("erase_btn");
    buttons.style.display = "inline-block"
}

// Oculta os botões ERASE TASK e ERASE LIST

function hide_Erase_Buttons() {
    let buttons = document.getElementById("erase_btn");
    buttons.style.display = "none"
}


// Mostra ou Oculta o INPUT para escolher a tarefa a ser apagada

function show_erase_field() {

    let field_label = document.getElementById("task_eraser_label")
    let field_content = document.getElementById("task_eraser")
    let erase_btn = document.getElementById("erase_btn")

    if (erase_btn.style.display == "none") {
        field_label.style.display = "none"
        field_content.style.display = "none";
    } else {

        if (localStorage.getItem("my_list") == null) {
        } else {

            if (field_content.style.display == "inline-block") {
                field_label.style.display = "none"
                field_content.style.display = "none";
            } else {
                field_label.style.display = "inline-block"
                field_content.style.display = "inline-block";
            }

            field_content.value = "";
        }
    }
}


// Apaga tarefa específica escolhida pelo usuário

function erase_task(item) {

    let field_content = document.getElementById("task_eraser");
    let load_list = localStorage.getItem("my_list");
    let list_items = JSON.parse(load_list);

    if (item.value == "") {
    } else {

        if (list_items.length < Number(item.value)) {
            showAlert("This task doesn't exist. Try Again. =]")
        } else {

            delete list_items[Number(item.value) - 1];
            list_items.sort()
            list_items.pop()

            localStorage.setItem("my_list", JSON.stringify(list_items))

            showList()
        }

        field_content.value = ""
    }
}


// Apaga a lista por COMPLETO da LOCALSTORAGE

function erase_List() {

    localStorage.clear("my_list")
    let list_items = document.getElementById("ol_list");
    let alert_message = document.getElementById("alert_message")

    alert_message.innerHTML = "The list was erased!"

    list_items.style.display = "none"

    list_items.innerHTML = "";

    hide_Erase_Buttons()
    show_erase_field()

}

// Mostra o Alerta no DIV Alert Message

function showAlert(alert_message) {

    let message = document.getElementById("alert_message")
    message.innerText = alert_message

}


// Limpa os Alertas escritos no DIV Alert Message

function clearAlert() {

    let message = document.getElementById("alert_message")
    message.innerText = ""

}

// Adiciona Tarefa ao pressionar ENTER

var input = document.getElementById("task_input");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("add_Task").click();
    }
});