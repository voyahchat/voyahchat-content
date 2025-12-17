1. [Включить USB Debugging](usb-debugging.md)

2. Подключить [кабель](cable.md) в порт USB Type-A внизу между водителем и пассажиром. Если в машине два USB Type-A — в левый, ближе к водителю

3. Выполнить установку приложения на [Windows](#windows) или [Mac](#mac)

# Windows

1. Скачать [voyahchat-yandex-music.zip](https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahchat-yandex-music.zip)

2. Разархивировать `voyahchat-yandex-music.zip` в любую директорию, нажав на файл правой кнопкой в Проводнике и выбрав `Извлечь всё`

3. Войти в директорию `voyahchat-yandex-music`

4. Запустить пакетный файл Windows `voyahchat-yandex-music.bat`

# Mac

Запустить `Терминал` (стандартное приложение на Маке), выполнить последовательность команд. Копировать и вставлять в терминал по одной строке, после каждой команды нажимать `Enter`:
- Перейти в директорию `Downloads`
```
cd ~/Downloads
```
- Скачать voyahchat-yandex-music-mac.zip
```
curl -O https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahchat-yandex-music-mac.zip
 ```
- Разархивировать
```
unzip -o voyahchat-yandex-music-mac.zip
```
- Выполнить скрипт установки
```
sh ./voyahchat-yandex-music.sh
```
