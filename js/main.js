let characterList

//페이지 로딩 및 검색 시 패널들 새로고침
const panelRefresh = function(hidePanel, search_str){
    for (let charId in characterList) {
        const panel = document.getElementById(charId);
        
        if (characterList[charId].indexOf(search_str) == -1 || hidePanel){
            panel.style.display = "none";
        }
        else {
            panel.style.display = "inline-block";
        }
    }
};

//페이지 로딩 시 기술 리스트 새로고침
const moveListRefresh = function(charId){
    const moveList = document.getElementById("move-list");

    if (charId === "") {
        moveList.style.display = "none";
    }
    else {
        moveList.style.display = "table";
        deleteRows(moveList);
        let request = new XMLHttpRequest();
        request.open('GET', `json/${charId}.json`);
        request.send();
        
        request.onload = function() {
            moveRef = JSON.parse(request.response);
            for (i in moveRef){
                appendRow(moveList, moveRef[i]);
            };
        };
    }
}

//페이지 로딩 시 기술 리스트와 패널들 새로고침
const renderPage = function() {
    charId = location.hash.replace("#", "");
    if (charId === "") {
        panelRefresh(false, "");
    }
    else {
        panelRefresh(true, "");
    }
    moveListRefresh(charId);
};

// 아래 두 함수는 복붙+alpha 코드!!
// append row to the HTML table
function appendRow(tbl, content) {
    const keyword = ["command", "hit-level", "damage", "startup", "blocked", "hit", "counter", "note"];
    // create DIV element and append to the table cell
    function createCell(cell, text, style) {
        let div = document.createElement('div'), // create DIV element
            txt = document.createTextNode(text); // create text node
        div.appendChild(txt);                    // append text node to the DIV
        div.setAttribute('class', style);        // set DIV class attribute
        div.setAttribute('className', style);    // set DIV class attribute for IE (?!)
        cell.appendChild(div);                   // append DIV to the table cell
    }
    let row = tbl.insertRow(tbl.rows.length),      // append table row
        i;
    // insert table cells to the new row
    for (i = 0; i < tbl.rows[0].cells.length; i++) {
        createCell(row.insertCell(i), content[keyword[i]], 'other-lines');
    }
}

// delete table rows with index greater then 0
function deleteRows(tbl) {
    let lastRow = tbl.rows.length - 1,             // set the last row index
        i;
    // delete rows with index greater then 0
    for (i = lastRow; i > 0; i--) {
        tbl.deleteRow(i);
    }
}

(function() {
    let hidePanel = false;

    let request = new XMLHttpRequest();
    request.open('GET', "json/character_list.json");
    request.send();
    
    request.onload = function() {
        characterList = JSON.parse(request.response);
        //각 캐릭터 패널을 누를 시 그 캐릭터의 페이지로 이동
        for (let charId in characterList){
            panel = document.getElementById(charId);
            panel.addEventListener('click', function(i) {
                return function() {
                    location.href = `/#${i}`;
                }
            }(charId));
        }
    };
    
    //검색창 구현
    const searchBar = document.getElementById("search-bar");
    searchBar.addEventListener('keyup', function() {
        panelRefresh(hidePanel, this.value);
    });

    //캐릭터 버튼 숨기기/표시하기 버튼
    const toggleHide = document.getElementById("toggle-hide");
    toggleHide.addEventListener('click', function(){
        if (!hidePanel){
            hidePanel = true;
            this.innerHTML = "캐릭터 패널 표시하기"
        }
        else{
            hidePanel = false;
            this.innerHTML = "캐릭터 패널 숨기기"
        }
        panelRefresh(hidePanel, searchBar.value);
    });

    //홈페이지 제목 누를 시 새로고침
    const header = document.getElementById("main-header");
    header.addEventListener('click', function() {
        location.replace('/')
    });

    window.addEventListener('hashchange', e => {
        renderPage();
    });

    renderPage('/');
}());
