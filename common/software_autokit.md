---
title: 'Autokit'
published: true
---

Если вы используете Cunba, то после установки приложения AutoKit нужно в лаунчере Cunba сделать долгое нажатие на иконку приложения и убрать вписывание приложения в экран, чтобы избежать его двойного сдвига.

1. [Включить USB Debugging](https://voyahchat.ru/common/usb-debugging)

2. Подключить [USB Type-A — Type-A кабель](https://voyahchat.ru/common/cable) (на доресте в порт ближе к водителю)

3. Выполнить установку приложения на [Windows](#windows) или [Mac](#mac)

# Windows

1. Скачать [voyahchat-autokit.zip](/voyahchat-autokit.zip)

2. Разархивировать `voyahchat-autokit.zip` в любую директорию, нажав на файл правой кнопкой в Проводнике и выбрав `Извлечь всё`

3. Войти в директорию `voyahchat-autokit`

4. Запустить пакетный файл Windows `voyahchat-autokit.bat`

# Mac

Запустить `Терминал` (стандартное приложение на Маке), выполнить последовательность команд. Копировать и вставлять в терминал по одной строке, после каждой команды нажимать `Enter`:
  * Перейти в директорию `Downloads`
```
cd ~/Downloads
```
  * Скачать voyahchat-autokit-mac.zip
```
curl -O https://voyahchat.ru/voyahchat-autokit-mac.zip
 ```
  * Разархивировать
```
unzip -o voyahchat-autokit-mac.zip
```
  * Выполнить скрипт установки
```
sh ./voyahchat-autokit.sh
```

