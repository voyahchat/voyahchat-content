1. [Включить USB Debugging](usb-debugging.md)

2. Подключить [кабель](cable.md) в порт USB Type-A внизу между водителем и пассажиром. Если в машине два USB Type-A — в левый, ближе к водителю

3. Выполнить установку приложения на [Windows](#windows) или [Mac](#mac)

4. В настройках выключить загрузку только по Wi-Fi и переключить на тёмную тему (если у вас тёмная тема интерфейса машины)

Кинопоиск не показывает Каналы и Спорт из-за отсутствия в машине кодеков, необходимых для декодирования этого потокового видео. Если вам нужно смотреть ТВ на машине — установите [Эфир ТВ](software_efirtv.md).

# Windows

1. Скачать [voyahchat-kinopoisk.zip](https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahchat-kinopoisk.zip)

2. Разархивировать `voyahchat-kinopoisk.zip` в любую директорию, нажав на файл правой кнопкой в Проводнике и выбрав `Извлечь всё`

3. Войти в директорию `voyahchat-kinopoisk`

4. Запустить пакетный файл Windows `voyahchat-kinopoisk.bat`

# Mac

Запустить `Терминал` (стандартное приложение на Маке), выполнить последовательность команд. Копировать и вставлять в терминал по одной строке, после каждой команды нажимать `Enter`:
  * Перейти в директорию `Downloads`
```
cd ~/Downloads
```
  * Скачать voyahchat-kinopoisk-mac.zip
```
curl -O https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahchat-kinopoisk-mac.zip
 ```
  * Разархивировать
```
unzip -o voyahchat-kinopoisk-mac.zip
```
  * Выполнить скрипт установки
```
sh ./voyahchat-kinopoisk.sh
```

