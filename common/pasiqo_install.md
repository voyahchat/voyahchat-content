У вас в машине должен быть интернет во время установки.

1. Включить [USB Debugging](usb-debugging.md)

2. Подключить [кабель](cable.md) в USB Type-A, если портов два — в порт USB Type-A ближе к водителю

3. Выполнить установку приложения на [Windows](#windows) или [Mac](#mac)

# Windows

1. Скачать [pasiqo-1.4.3.zip](https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/pasiqo-1.4.3.zip)

2. Разархивировать `pasiqo-1.4.3.zip`

3. Зайти в директорию `pasiqo-1.4.3`

4. Запустить `install.bat`

# Mac

Запустить `Терминал` (стандартное приложение на Маке), выполнить последовательность команд. Копировать и вставлять в терминал по одной строке, после каждой команды нажимать `Enter`:
- Перейти в директорию `Downloads`
```
cd ~/Downloads
```
- Скачать pasiqo-1.4.3.zip
```
curl -O https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/pasiqo-1.4.3.zip
```
- Разархивировать
```
unzip -o pasiqo-1.4.3.zip
```
- Перейти в директорию `pasiqo-1.4.3`
```
cd pasiqo-1.4.3
```
- Выполнить скрипт установки
```
sh ./install.sh
```

