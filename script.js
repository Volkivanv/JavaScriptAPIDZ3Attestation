// Application ID 698760
// Access Key: nzos-QT_ADALz265JpcHZ6QxIe1TKH6Cjtkq3rX7_-U

// Secret key: QpmRm46dY1XWMzYheiQESEdWkBmanyJpfw1ypeXOBYQ

const photoContainer = document.getElementById("photo-container");

let page = 2;
async function fetchRandomPhoto() {
    try {
        const response = await fetch(
            `https://api.unsplash.com/photos/random?client_id=nzos-QT_ADALz265JpcHZ6QxIe1TKH6Cjtkq3rX7_-U`
        );
        const photos = await response.json();
        return photos;
    } catch (error) {
        console.error("Ошибка при загрузке фотографий:", error);
        return [];
    }
}

// Определяем функцию, которая принимает в качестве параметров url и данные, которые необходимо обработать 
const postData = async (url = '', data = {}) => {
    // Формируем запрос
    const response = await fetch(url, {
      // Метод, если не указывать, будет использоваться GET
      method: 'POST',
      // Заголовок запроса
      headers: { 'Content-Type': 'application/json' },
      // Данные
      body: JSON.stringify(data)
    });
    return response.json();
  }
  


async function loadPhoto() {
    try {
        const photo = await fetchRandomPhoto();
        const idPhoto = photo.id;

            const divPhoto = document.createElement('div');
            divPhoto.classList.add('photo');
            const imgPhoto = document.createElement('img');
            imgPhoto.src = photo.urls.regular;
            const author = document.createElement('h2');
            author.textContent =`Автор фотографии: ${photo.user.name}`;
            const numberOfLikes = document.createElement('p');

            let likesCount = photo.likes;
            numberOfLikes.textContent = `Количество лайков: ${likesCount}`;
            const likeButton = document.createElement('button');
            likeButton.textContent = `Поставить лайк`;

            // если лайкнуто то убираем возможность еще раз лайкнуть
            if(photo.liked_by_user){
                likeButton.textContent = `Вы уже лайкнули`;
                likeButton.setAttribute('disabled', '');
            }

            //Все добавляем
            divPhoto.append(imgPhoto);
            divPhoto.append(author);
            const divLikes = document.createElement('div');
            divLikes.classList.add('like-block');


            divLikes.append(numberOfLikes);
            divLikes.append(likeButton);
            divPhoto.append(divLikes);

         
            photoContainer.append(divPhoto);
            // навешиваем "лайк"
            likeButton.addEventListener('click', function (e) {
                // body
                likesCount++;
                numberOfLikes.textContent = `Количество лайков: ${likesCount}`;
                this.textContent = `Вы уже лайкнули`;
                this.setAttribute('disabled', '');

                //Попытка реализовать лайк на самом unsplash
                
                // postData(`https://api.unsplash.com/photos/${idPhoto}/like?client_id=nzos-QT_ADALz265JpcHZ6QxIe1TKH6Cjtkq3rX7_-U`);
            });
          

    } catch (error) {
        console.error("Ошибка при чтении:", error);
    }
}

loadPhoto();


