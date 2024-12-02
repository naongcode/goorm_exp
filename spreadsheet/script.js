const spreadSheetContainer = document.querySelector("#spreadsheet-container")
const alphabets = [
    "A","B","C","D","E","F","G","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
]
const exportBtn = document.querySelector("#export-btn")
// 헤더만들기
class Cell {
    constructor(isheader, disabled, data, row, column, rowName, columnName, active = false) {
        this.isheader = isheader;
        this.disabled = disabled;
        this.data = data;
        this.row = row;
        this.column = column;
        this.rowName = rowName;
        this.columnName = columnName;
        this.active = active;
    }
}

//기본 셋팅
COLS = 10
ROWS = 10
const spreadsheet = []

initSpreadsheet()
function initSpreadsheet() {
    for (let i = 0; i < ROWS; i++) {
        let spreadsheetRow = []
        for (let j =0; j < COLS; j++) {
            let cellData = "";
            let isheader = false;
            let disabled = false;
            if (j ===0) {
                cellData = i;
                isheader = true;
                disabled = true;
            }
            if (i ===0) {
                cellData = alphabets[j-1];
                isheader = true;
                disabled = true;
            }
            if (!cellData) {
                cellData = ""
            }
            if (cellData <= 0) {
                cellData = "";
            }
            const rowName = i;
            const columnName = alphabets[j-1]
            //기본값으로 객체 생성
            const cell = new Cell(isheader,disabled,cellData,i,j,rowName, columnName, false)
            spreadsheetRow.push(cell)

            
        }
        spreadsheet.push(spreadsheetRow)
    }
    drawSheet();
    console.log("spreadsheet", spreadsheet)
}

//셀 생성하기
function createCellEl(cell) {
    const cellEl = document.createElement("input")
    cellEl.className = "cell" //css에서 .cell을 의미
    cellEl.id = "cell_" + cell.row + cell.column //id 부여
    cellEl.value = cell.data //셀의 데이터를 input값으로 설정
    cellEl.disabled = cell.disabled

    if (cell.isheader) {
        cellEl.classList.add("header");
    }
    cellEl.onclick = () => handleCellClick(cell);
    cellEl.onchange = (e) => handleOnChange(e.target.value, cell);

    return cellEl
}

function handleOnChange(data, cell) {
    cell.data = data;
}

function handleCellClick(cell) {
    clearHeaderActiveStates();
    const columnHeader = spreadsheet[0][cell.column]
    const rowHeader = spreadsheet[cell.row][0]
    const columnHeaderEl = getElFromRowCol(columnHeader.row, columnHeader.column)
    const rowHeaderEl = getElFromRowCol(rowHeader.row, rowHeader.column)
    columnHeaderEl.classList.add('active');
    rowHeaderEl.classList.add('active');

    // 선택셀 주소 나타내기
    document.querySelector("#cell-status").innerHTML = cell.columnName +""+cell.rowName
}

function clearHeaderActiveStates() {
    const headers = document.querySelectorAll('.header');
    headers.forEach((header) => {
        header.classList.remove('active')
    })
}
function getElFromRowCol(row, col) {
    return document.querySelector("#cell_" + row + col);
}
// cell 렌더링
//10개셀 마다 row div로 감싸기
function drawSheet() {
    for (let i = 0; i < spreadsheet.length; i++) {
        const rowContainerEl = document.createElement("div");
        rowContainerEl.className = "cell-row";

        for (let j = 0; j < spreadsheet[i].length; j++) {
            const cell = spreadsheet[i][j]
            rowContainerEl.append(createCellEl(cell));
            //createCellEl은 input요소를 갖고있고, 그걸 div에 넣어줌
        }
        spreadSheetContainer.append(rowContainerEl)        
    }
}
// class Cell로 틀을 만들고, 
// initSpreadsheet()함수로 class를 이용하여 2차원 배열에 채워넣기(인스턴스생성), 
// createCellEl함수로 각 인스턴스에 내용전달,
// html로 렌더링

// 엑셀로 보내기
exportBtn.onclick = function (e) {
    console.log('spreadsheet', spreadsheet)
}

// 데이터를 쉼표 형태로
exportBtn.onclick = function (e) {
    let csv = ""
    for (let i = 0; i <spreadsheet.length; i++) {
        csv += spreadsheet[i].filter((item) => !item.isheader)
            .map(item => item.data)
            .join(',')+"\r\n";
    }
    const csvObj = new Blob([csv])
    const csvUrl = URL.createObjectURL(csvObj)
    console.log(csvUrl)

    const a = document.createElement("a")
    a.href = csvUrl
    a.download = "Spreadsheet File Name.csv"
    a.click()
}