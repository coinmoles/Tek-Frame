let characterList

const characterSearch = function(str){
    console.log("searching");

    for (charId in characterList) {
        const panel = document.getElementById(charId);
        
        console.log(characterList[charId], str);
        
        if (characterList[charId].indexOf(str) == -1){
            panel.style.display = "none";
        }
        else {
            panel.style.display = "inline-block";
        }
    }
    document.refr
};

(function() {
    const searchBar = document.getElementById("search-bar");
    searchBar.addEventListener('keyup', function() {
        characterSearch(this.value);
    });

    let request = new XMLHttpRequest();
    request.open('GET', "json/character_list.json");
    //request.responseType = 'json';
    request.send();
    
    request.onload = function() {
        characterList = JSON.parse(request.response);
    };

}());

console.log(characterList)
for (char in characterList){
    console.log(char);
}

