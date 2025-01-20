
// Access Key: e_2NtH6n3IqgMrL7sJC5bZvy4dgB89L7Kcc5zz8gQcg


const photoContainer = document.getElementById("photo-container");

let page = 2;
async function fetchRandomPhoto() {
    try {
        const response = await fetch(
            `https://api.unsplash.com/photos/random?client_id=e_2NtH6n3IqgMrL7sJC5bZvy4dgB89L7Kcc5zz8gQcg`
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
            
            const likeButton = document.createElement('button');
            likeButton.textContent = `Поставить лайк`;

            // если в локальном хранилище сохранилась информация лайкнуто, то убираем возможность еще раз лайкнуть
            if(localStorage.getItem(idPhoto) === 'liked'){
                likeButton.textContent = `Вы уже лайкнули`;
                likeButton.setAttribute('disabled', '');
                likesCount++;
            }

            numberOfLikes.textContent = `Количество лайков: ${likesCount}`;

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

                localStorage.setItem(idPhoto, 'liked')

                //Попытка реализовать лайк на самом unsplash
                
                // postData(`https://api.unsplash.com/photos/${idPhoto}/like?client_id=nzos-QT_ADALz265JpcHZ6QxIe1TKH6Cjtkq3rX7_-U`);
            });
          

    } catch (error) {
        console.error("Ошибка при чтении:", error);
    }
}

loadPhoto();


