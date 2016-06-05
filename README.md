# krepstroy
krepstroy site with backend

# Схемы данных

### GLO
```javascript
  {
    contactsData : {
      text : <STRING> // Текст в контактах
    }
  }
```



### Feedback
```javascript
{
  who         : <STRING>,           // Кто
  message     : <STRING>,           // Текст сообщения
  contacts    : <STRING>            // Обратные данные
}
```



### GOODS
```javascript
{
  id          : <NUMBER>,
  cid         : <STRING>,           // id в CRM
  name        : <STRING>,
  measure     : <STRING>,           // Единицы измерения
  price       : <NUMBER|STRING>,    //Прайс
  photo       : <STRING>,           // Ссылка на фото для списка товаров
  status      : <NUMBER>            // Наличие. 1 - в наличии, 0 - нет в наличии.
}
```


### GROUPS 
####RAW
```javascript
{
  id          : <NUMBER>,
  cid         : <STRING>,           // id в CRM
  name        : <STRING>,
  image       : <STRING>,           // Ссылка на картинку для тайлов
  parentId    : <NUMBER>,           // id родителя или null
}
```

#####TREE
```javascript
{
  id          : <NUMBER>,
  cid         : <STRING>,           // id в CRM
  name        : <STRING>,
  list        : [<GROUPITEM>, <GROUPITEM>, ...]
}
```

####TILES
```javascript
{
  id          : <NUMBER>,
  cid         : <STRING>,           // id в CRM
  name        : <STRING>,
  image       : <STRING>,           // Картинка
  count       : <NUMBER>            // Количество товаров в этой категории
}
```

### NEWS
```javascript
{
  id          : <NUMBER>,
  title       : <STRING>,           
  date        : <STRING>,           // Дата в формате 00/00
  alias       : <STRING>,           // Для ссылки в адресной строке
  short       : <STRING>,           // Короткое описание на главной
  desc        : <HTMLSTRING>,       // Полное описание с HTML
}
```

