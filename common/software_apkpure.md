1. [Включить USB Debugging](usb-debugging.md)

2. Подключить [USB Type-A — Type-A кабель](cable.md) (на доресте в порт ближе к водителю)

3. Выполнить установку приложения на [Windows](#windows) или [Mac](#mac)

# Windows

1. Скачать [voyahchat-apkpure.zip](https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahchat-apkpure.zip)

2. Разархивировать `voyahchat-apkpure.zip` в любую директорию, нажав на файл правой кнопкой в Проводнике и выбрав `Извлечь всё`

3. Войти в директорию `voyahchat-apkpure`

4. Запустить пакетный файл Windows `voyahchat-apkpure.bat`

# Mac

Запустить `Терминал` (стандартное приложение на Маке), выполнить последовательность команд. Копировать и вставлять в терминал по одной строке, после каждой команды нажимать `Enter`:
  * Перейти в директорию `Downloads`
```
cd ~/Downloads
```
  * Скачать voyahchat-apkpure-mac.zip
```
curl -O https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahchat-apkpure-mac.zip
 ```
  * Разархивировать
```
unzip -o voyahchat-apkpure-mac.zip
```
  * Выполнить скрипт установки
```
sh ./voyahchat-apkpure.sh
```

