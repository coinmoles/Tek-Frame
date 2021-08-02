let characterList

const panelRefresh = function(hidePanel, str){
    for (charId in characterList) {
        const panel = document.getElementById(charId);
        
        if (characterList[charId].indexOf(str) == -1 || hidePanel){
            panel.style.display = "none";
        }
        else {
            panel.style.display = "inline-block";
        }
    }
};


(function() {
    let hidePanel = false;

    const searchBar = document.getElementById("search-bar");
    searchBar.addEventListener('keyup', function() {
        panelRefresh(hidePanel, this.value);
    });

    const toggleHide = document.getElementById("toggle-hide");
    toggleHide.addEventListener('click', function(){
        console.log("pika");
        if (!hidePanel){
            hidePanel = true;
            this.innerHTML = "캐릭터 패널 표시하기"
        }
        else{
            hidePanel = false;
            this.innerHTML = "숨기기"
        }
        panelRefresh(hidePanel, searchBar.value);
    });

    let request = new XMLHttpRequest();
    request.open('GET', "json/character_list.json");
    request.send();
    
    request.onload = function() {
        characterList = JSON.parse(request.response);
    };

}());
