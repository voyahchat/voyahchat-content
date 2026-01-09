Если у вас не работает RuTube или какие-то ещё приложения не могут подключиться к своим серверам — возможно проблема в DNS, его надо исправить в машине.

1. [Включить USB Debugging](usb-debugging.md)

2. Подключить [кабель](cable.md) в порт USB Type-A внизу между водителем и пассажиром. Если в машине два USB Type-A — в левый, ближе к водителю

3. Запустить скрипт на [Windows](#windows) или [Mac](#mac)

4. [Перезагрузить машину](reboot.md#приборка) для применения изменений

# Windows

1. Скачать [voyahchat-dns.zip](https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahchat-dns.zip)

2. Разархивировать `voyahchat-dns.zip` в любую директорию, нажав на файл правой кнопкой в Проводнике и выбрав `Извлечь всё`

3. Войти в директорию `voyahchat-dns`

4. Запустить пакетный файл Windows `voyahchat-dns.bat`

# Mac

Запустить `Терминал` (стандартное приложение на Маке), выполнить последовательность команд. Копировать и вставлять в терминал по одной строке, после каждой команды нажимать `Enter`:
- Перейти в директорию `Downloads`
```
cd ~/Downloads
```
- Скачать voyahchat-dns-mac.zip
```
curl -O https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahchat-dns-mac.zip
```
- Разархивировать
```
unzip -o voyahchat-dns-mac.zip
```
- Выполнить скрипт установки
```
sh ./voyahchat-dns.sh
```
