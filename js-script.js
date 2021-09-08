let mainInfo = document.querySelector('.main')
function getJSON(url) {
    return new Promise(function(resolve, reject) {
        let  xhr = new XMLHttpRequest();

        xhr.open('get', url, true);

        xhr.responseType = 'json';

        xhr.onload = function() {
            let status = xhr.status;

            if (status === 200) {
                resolve(xhr.response);
            } else {
                reject(status);
            }
        };
        xhr.onerror = function(e) {
            reject("Error fetching " + url);
        };
        xhr.send();
    });
};


getJSON('http://localhost:3000/posts').then((result) => {
    result.forEach(element => {
        let objectTitle = element.title
        let objectAuthor = element.author
        
        mainInfo.append(`    ${objectTitle}_____________________${objectAuthor}`) 
        // как перенести на другую строку автора? ни через \n, ни через <br> не работает :(
            
        // let resddd = JSON.parse(`${objectTitle}, ${objectAuthor}`)
        // mainInfo.append(resddd)
        console.log(element)
    });
    
})

let submitButton = document.querySelector('#button')
let titleInput = document.querySelector('#title')
let authorInput = document.querySelector('#author')

function saveJSON(url, data) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.open('post', url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        xhr.responseType = 'json';

        xhr.onload = function() {
            var status = xhr.status;

            resolve(xhr.response);
        };
        xhr.onerror = function(e) {
            reject("Error fetching " + url);
        };
        xhr.send(data);
    });
};

function makeNewPost(postTitle, postAuthor) {
    let post = {};
    post.title = postTitle.value;
    post.author = postAuthor.value;
    
    return post;
}


submitButton.addEventListener('click', (event) => {
    event.preventDefault();
   
    saveJSON('http://localhost:3000/posts', JSON.stringify(makeNewPost(titleInput, authorInput)))
    // .then(getJSON('http://localhost:3000/posts'))
    .then((result) => { 
        mainInfo.append(`    ${result.title}_____________________${result.author}`)
    })
    .catch(error=> console.log(error))
    titleInput.value = '';
    authorInput.value = '';

})