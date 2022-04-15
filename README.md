# FileIngester
looks like: https://dropmefiles.com/

На главной странице расположены следующие элементы:
1) Админка: /admin
 
При на "Войти" открывается страница с формой входа, куда необходимо ввести логин и пароль
При нажатии на "Загрузить файл анонимно" открывается страница загрузки файла. Файл можно загрузить переносом в выделенную зону, либо нажатием на эту зону (в таком случае откроется диалог выбора файла)
 
## Guest:
1) Перетаскивание файла (загрузка до 100 Мб).
2) Выбор expired time(1-7 down, 5 min - 14 days) для ссылки к файлу
3) На странице скачивания должна быть кнопка "Report"
4) 
5) /admin авторизация для админа
6) Функционал админа: просмотр жалоб (переход на страничку всех жалоб), возможноть удалить файл


## Страничка скачивания
После загрузки файла создается новая ссылка, ведущая на страницу с загруженным файлом. На странице с файлом должны отображаться следующие данные:
1) Название файла
2) Формат файла
3) Количество скачиваний
5) Дата загрузки файла 
6) Кнопка "Пожаловаться". При нажатии на нее открывается модальное окно, куда можно ввести текст жалобы. В данном модальном окне должны быть кнопки "Отмена" и "Отправить"

8) Дата, когда файл будет удален
Время жизни файла можно ограничить каким-то одним значением (напр. 30 дней), либо дать пользователю выбрать среди нескольких вариантов.
 
Зарегистрированный пользователь может загружать файлы от имени своего аккаунта, просматривать загруженные файлы и удалять их.
У администратора должна быть возможность удалить файл любого пользователя. Кнопку удаления файла можно сделать на странице с загруженным файлом. Также у администратора должна быть возможность заблокировать пользователя. Кнопку блокировки можно сделать на странице аккаунта пользователя, либо можно сделать отдельную страницу для админов, где можно найти пользователя по логину и заблокировать/разблокировать. При блокировке автоматически удаляются все загруженные пользователем файлы.
 
Также на сайте должна быть возможность найти файл по названию.


![image](https://user-images.githubusercontent.com/38386052/163622686-042cb455-2d05-457f-b8d9-802b90f1ecdf.png)
