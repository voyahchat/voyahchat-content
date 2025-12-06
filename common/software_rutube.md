1. [Включить USB Debugging](usb-debugging.md)

2. Подключить [кабель](cable.md) в порт USB Type-A внизу между водителем и пассажиром. Если в машине два USB Type-A — в левый, ближе к водителю

3. Выполнить установку приложения на [Windows](#windows) или [Mac](#mac)

4. В настройках включить русский язык и переключить на тёмную тему (если у вас тёмная тема интерфейса машины)

# Windows

1. Скачать [voyahchat-rutube.zip](https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahchat-rutube.zip)

2. Разархивировать `voyahchat-rutube.zip` в любую директорию, нажав на файл правой кнопкой в Проводнике и выбрав `Извлечь всё`

3. Войти в директорию `voyahchat-rutube`

4. Запустить пакетный файл Windows `voyahchat-rutube.bat`

# Mac

Запустить `Терминал` (стандартное приложение на Маке), выполнить последовательность команд. Копировать и вставлять в терминал по одной строке, после каждой команды нажимать `Enter`:
  * Перейти в директорию `Downloads`
```
cd ~/Downloads
```
  * Скачать voyahchat-rutube-mac.zip
```
curl -O https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahchat-rutube-mac.zip
 ```
  * Разархивировать
```
unzip -o voyahchat-rutube-mac.zip
```
  * Выполнить скрипт установки
```
sh ./voyahchat-rutube.sh
```

