/// 추가하기 버튼 누를때, 생성하기

// 버튼 선택, 버튼 클릭하면 함수 실행
const list = document.getElementById('list')
const createBtn = document.getElementById('create-btn')

//데이터를 넣어줄 빈 배열
let todos = [];

createBtn.addEventListener('click', createNewTodo); 

// 버튼눌렀을 때, 실행할 함수
function createNewTodo() {

    // 1) 배열에 넣을 객체(아이템)을 생성하기
    const item = {
        id: new Date().getTime(),
        text:'',
        complete: false
    }
    // 2) 배열 처음에 아이템 추가
    todos.unshift(item);

    // 3) 요소 생성하는 함수
    const {itemEl, inputEl, editBtnEl, removeBtnEl} = createTodoElement(item)

    // 4) 리스트 안에 아이템요소를 추가
    list.prepend(itemEl)
    
    inputEl.removeAttribute('diabled')

    inputEl.focus()
    saveToLocalStorage();
}


/// 버튼들 생성하기 (입력값 받아서 3)요소생성에 넣어줘야함)
function createTodoElement(item) {
    // 틀 생성
    const itemEl = document.createElement('div')
    itemEl.classList.add('item')

    // 체크박스 생성
    const checkboxEl = document.createElement('input')
    checkboxEl.type = 'checkbox'
    checkboxEl.checked = item.complete


    // complete을 전달받으면 complete이라고 해주기
    if (item.complete) {
        itemEl.classList.add('complete')
    }

    // 텍스트박스 생성
    const inputEl = document.createElement('input')
    inputEl.type = 'text'
    inputEl.value = item.text;

    // div생성해서 수정버튼이랑 삭제버튼을 담기
    const actionEl = document.createElement('div')
    actionEl.classList.add('action')

    const editBtnEl = document.createElement('button')
    editBtnEl.classList.add('material-icons')
    editBtnEl.innerText = 'edit';

    const removeBtnEl = document.createElement('button')
    removeBtnEl.classList.add('material-icons', 'remove-btn')
    removeBtnEl.innerText = 'remove_circles'

    // check표시 반영하기
    checkboxEl.addEventListener('change', () => {
        item.complete = checkboxEl.checked
        if (item.complete) {
            item.classList.add('complete')
        } else {
            item.classList.remove('complete')
        }
        saveToLocalStorage();
    })

    inputEl.addEventListener('blur', () => {
        inputEl.setAttribute('disabled','');
        saveToLocalStorage();
    })

    // 텍스트 받아오기
    inputEl.addEventListener('input', () => {
        item.text = inputEl.value
    })

    // 수정버튼 클릭할때
    editBtnEl.addEventListener('click', () => {
        inputEl.removeAttribute('disabled')
        inputEl.focus()
    })

    // 제거버튼 클릭할때
    removeBtnEl.addEventListener('click', () => {
        todos = todos.filter(t => t.id !== item.id)
        itemEl.remove()
        saveToLocalStorage()
    })

    // 각각을 알맞은 곳에 넣어주기
    actionEl.append(editBtnEl)
    actionEl.append(removeBtnEl)

    itemEl.append(checkboxEl)
    itemEl.append(inputEl)
    itemEl.append(actionEl)

    return {itemEl, inputEl, editBtnEl, removeBtnEl}
}

// 로컬스토리지에 추가하기
// createNewTodo()에서 실행
function saveToLocalStorage() {
    const data = JSON.stringify(todos);
    window.localStorage.setItem('my_todos', data);
}

// 로컬스토리지에서 data 가져오기
function loadFromLocalStorage() {
    const data = localStorage.getItem('my_todos')

    if(data) {
        todos = JSON.parse(data);
    }
}

loadFromLocalStorage();

// 저장한거 화면에 보여주기
function displayTodos() {
    loadFromLocalStorage();
    for (let i = 0; i < todos.length; i++) {
        const item = todos[i];
        const {itemEl} = createTodoElement(item)
        list.append(itemEl)
    }
}

displayTodos();