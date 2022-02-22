const requestURL = 'https://www.googleapis.com/books/v1/volumes?q=search+terms'
function sendRequest(method, url, body = null){
    return fetch(url).then(res => {
        return res.json()
    })
}
var column = document.getElementById('column')
var sidebar = document.querySelector('.sidebar')
// console.log(sidebar)
let  cards = document.getElementById("cards");
function getRender(data){
    // console.log(data)
    data.items.forEach(element =>{
        // console.log(element)
        let card =document.createElement("div")
        card.setAttribute("class", "card mb-3");
        let imgDiv = document.createElement("div");
        imgDiv.setAttribute("class", "img-div");
        let img = document.createElement("img");
        img.setAttribute("src", `${element.volumeInfo.imageLinks?.thumbnail}`);
        img.className = 'card-img'
        let bookTitle = document.createElement('p')
        if(element.volumeInfo.title.length > 50){
            bookTitle.textContent = element.volumeInfo.title.substring(0, 50) + '...'
        }
        else{
            bookTitle.textContent = element.volumeInfo.title
        }
        bookTitle.className = 'mt-3 book-title'
        let bookAuthor = document.createElement('p')
        bookAuthor.textContent = element.volumeInfo.authors
        bookAuthor.className = 'book-author'
        let publishedDate = document.createElement('p')
        publishedDate.textContent = element.volumeInfo.publishedDate
        publishedDate.className = 'published-date'
        let buttonDiv = document.createElement('div')
        let bookmarkBtn = document.createElement('button')
        bookmarkBtn.textContent = 'Bookmark'
        bookmarkBtn.className = 'bookmark-button';
        bookmarkBtn.addEventListener('click', () =>{
            localStorage.setItem(element.id, element.volumeInfo.title)
            let ulEl = document.createElement('ul')     
            let li = document.createElement('li')
            li.className = 'list-item'
            let divEl = document.createElement('div')
            let title = document.createElement('p')
            title.textContent = element.volumeInfo.title
            title.className = 'title'
            let author = document.createElement('p')
            author.textContent = element.volumeInfo.authors
            author.className = 'author'
            let deleteBtn = document.createElement('button')
            deleteBtn.className = 'delete'
            deleteBtn.addEventListener('click', () => {
                let liRemove = li
                liRemove.remove()
                localStorage.removeItem(element.id)
            })
            let deleteImage = document.createElement('img')
            deleteImage.src = './image/del.svg'

            let bookBtn = document.createElement('a')
            bookBtn.className = 'book-open'
            let bookImage = document.createElement('img')
            bookImage.setAttribute('src', './image/bookopen.svg')
            bookImage.addEventListener('click',()=>{
                
                bookBtn.href = element.volumeInfo.previewLink
            })
            

            divEl.appendChild(title)
            divEl.appendChild(author)
            li.appendChild(divEl)
            bookBtn.appendChild(bookImage)
            deleteBtn.appendChild(deleteImage)
            li.appendChild(bookBtn)
            li.appendChild(deleteBtn)
            ulEl.appendChild(li)
            sidebar.appendChild(ulEl)
        })
        let moreInfoBtn = document.createElement('button')
        moreInfoBtn.className = 'more-info'
        moreInfoBtn.textContent = 'More Info'
    
        let modalElement = document.getElementById('modalEl')
        moreInfoBtn.addEventListener('click', () => {
            let modal = document.createElement('div')
            modal.className = 'overlay modal modal--overlay'
            let modalContent = document.createElement('div')
            modalContent.className = 'modal__content'
            let modalExit = document.createElement('button')
            modalExit.textContent = 'X'
            modalExit.className = 'modal-exit'
            modalExit.addEventListener('click', () =>{
                modal.className = '--overlay'
                modalElement.removeChild(modal)
            })
            let modalImg = document.createElement('img')
            modalImg.src = element.volumeInfo.imageLinks?.thumbnail
            modalImg.className = 'modal-image'
            let modalDesc = document.createElement('p')
            modalDesc.textContent = element.volumeInfo.description
            modalDesc.className = 'modal-desc'

            let coverDiv = document.createElement('div')
            coverDiv.className = 'cover-div'

            let divEl = document.createElement('div')
            divEl.className = 'div-class'
            let modalAuthor = document.createElement('p')
            modalAuthor.textContent = `Author: `

            let modalPub = document.createElement('p')
            modalPub.textContent = `Published: `

            let modalPublishers = document.createElement('p')
            modalPublishers.textContent = `Publishers: `

            let modalCategories = document.createElement('p')
            modalCategories.textContent = `Categories: `

            let modalPages = document.createElement('p')
            modalPages.textContent = `Pages Count: `

            let infoDiv = document.createElement('div')
            infoDiv.className = 'info-div'
            let authorName = document.createElement('p')
            authorName.textContent = element.volumeInfo.authors

            let publishedDate = document.createElement('p')
            publishedDate.textContent = element.volumeInfo.publishedDate
            publishedDate.setAttribute("class", "badge badge-primary");
            let publishers = document.createElement('p')
            publishers.textContent = element.volumeInfo.publisher
            
            let categories = document.createElement('p')
            categories.textContent = element.volumeInfo.categories

            let pagesCount = document.createElement('p')
            pagesCount.textContent = element.volumeInfo.pageCount

            let readBtn = document.createElement('a')
            readBtn.textContent = 'Read'
            readBtn.className = 'read-btn';
            readBtn.setAttribute('target', 'blank')

            readBtn.addEventListener('click', ()=>{
                readBtn.href = `${element.volumeInfo.previewLink}`
            });
            modalContent.appendChild(modalImg)
            modalContent.appendChild(modalDesc)
            

            divEl.appendChild(modalAuthor)
            divEl.appendChild(modalPub)
            divEl.appendChild(modalPublishers)
            divEl.appendChild(modalCategories)
            divEl.appendChild(modalPages)
            coverDiv.appendChild(divEl)

            infoDiv.appendChild(authorName)
            infoDiv.appendChild(publishedDate)
            infoDiv.appendChild(publishers)
            infoDiv.appendChild(categories)
            infoDiv.appendChild(pagesCount)
            coverDiv.appendChild(infoDiv)
            modalContent.appendChild(coverDiv)
            modalContent.appendChild(readBtn)
            modal.appendChild(modalExit)
            modal.appendChild(modalContent)
            modalElement.appendChild(modal)
         })  

        let readButton = document.createElement('a')
        readButton.className = 'read-button'
        readButton.textContent = 'Read'
        readButton.href = element.volumeInfo.previewLink
        imgDiv.appendChild(img)
        card.appendChild(imgDiv)
        card.appendChild(bookTitle)
        card.appendChild(bookAuthor)
        card.appendChild(publishedDate)
        card.appendChild(buttonDiv)
        buttonDiv.appendChild(bookmarkBtn)
        buttonDiv.appendChild(moreInfoBtn)
        card.appendChild(readButton)
        cards.appendChild(card)
    })

}


let logout = document.getElementById('logout');

logout.addEventListener("click", ()=>{
    window.localStorage.removeItem('TokenId')
    window.location.replace('login.html')
})


sendRequest('GET', requestURL)
    .then(data => getRender(data))
    .catch(err => console.log(err))