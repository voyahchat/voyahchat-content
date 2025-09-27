Работает на Voyah Free 2021/2023 (дорест33, дорест39) и Voyah Free 2024/2025 (рест, 318) с шестой версией прошивки.

1. [Включить USB Debugging](usb-debugging.md)

2. Подключить [USB Type-A — Type-A кабель](cable.md) (на доресте в порт ближе к водителю)

3. Выполнить установку приложения на [Windows](#windows) или [Mac](#mac)

# Windows

1. Скачать [voyahchat-rustore.zip](https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahchat-rustore.zip)

2. Разархивировать `voyahchat-rustore.zip` в любую директорию, нажав на файл правой кнопкой в Проводнике и выбрав `Извлечь всё`

3. Войти в директорию `voyahchat-rustore`

4. Запустить пакетный файл Windows `voyahchat-rustore.bat`

# Mac

Запустить `Терминал` (стандартное приложение на Маке), выполнить последовательность команд. Копировать и вставлять в терминал по одной строке, после каждой команды нажимать `Enter`:
  * Перейти в директорию `Downloads`
```
cd ~/Downloads
```
  * Скачать voyahchat-rustore-mac.zip
```
curl -O https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahchat-rustore-mac.zip
 ```
  * Разархивировать
```
unzip -o voyahchat-rustore-mac.zip
```
  * Выполнить скрипт установки
```
sh ./voyahchat-rustore.sh
```

