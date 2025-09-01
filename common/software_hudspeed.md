---
title: 'HUD Speed'
published: true
---

1. [Включить USB Debugging](usb-debugging.md)

2. Подключить [USB Type-A — Type-A кабель](cable.md) (на доресте в порт ближе к водителю)

3. Выполнить установку приложения на [Windows](#windows) или [Mac](#mac)

# Windows

1. Скачать [voyahchat-hudspeed.zip](https://voyahchat.ru/voyahchat-hudspeed.zip)

2. Разархивировать `voyahchat-hudspeed.zip` в любую директорию, нажав на файл правой кнопкой в Проводнике и выбрав `Извлечь всё`

3. Войти в директорию `voyahchat-hudspeed`

4. Запустить пакетный файл Windows `voyahchat-hudspeed.bat`

# Mac

Запустить `Терминал` (стандартное приложение на Маке), выполнить последовательность команд. Копировать и вставлять в терминал по одной строке, после каждой команды нажимать `Enter`:
  * Перейти в директорию `Downloads`
```
cd ~/Downloads
```
  * Скачать voyahchat-hudspeed-mac.zip
```
curl -O https://voyahchat.ru/voyahchat-hudspeed-mac.zip
 ```
  * Разархивировать
```
unzip -o voyahchat-hudspeed-mac.zip
```
  * Выполнить скрипт установки
```
sh ./voyahchat-hudspeed.sh
```

