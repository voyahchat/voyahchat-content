---
title: 'Изменение имени машины'
published: true
---

Имя машины используется при подключении к машине по Bluebooth и Wi-Fi (режим AP Host).

1. [Включить USB Debugging](usb-debugging.md)

2. Подключить [USB Type-A — Type-A кабель](cable.md) (на доресте в порт ближе к водителю)

3. Запустить скрипт на [Windows](#windows) или [Mac](#mac)

4. [Перезагрузить машину](reboot.md#мультимедиа) для применения изменений

# Windows

1. Скачать [voyahchat-device-name.zip](https://voyahchat.ru/voyahchat-device-name.zip)

2. Разархивировать `voyahchat-device-name.zip` в любую директорию, нажав на файл правой кнопкой в Проводнике и выбрав `Извлечь всё`

3. Войти в директорию `voyahchat-device-name`

4. Имя машины в скрипте выставлено в `FREE`, если хотите его изменить — откройте `voyahchat-device-name.bat` на редактирование и замените

5. Запустить пакетный файл Windows `voyahchat-device-name.bat`

# Mac

Запустить `Терминал` (стандартное приложение на Маке), выполнить последовательность команд. Копировать и вставлять в терминал по одной строке, после каждой команды нажимать `Enter`:
  * Перейти в директорию `Downloads`
```
cd ~/Downloads
```
  * Скачать voyahchat-device-name-mac.zip
```
curl -O https://voyahchat.ru/voyahchat-device-name-mac.zip
```
  * Разархивировать
```
unzip -o voyahchat-device-name-mac.zip
```
  * Имя машины в скрипте выставлено в `FREE`, если хотите его изменить — откройте `voyahchat-device-name.sh` на редактирование и замените
  * Выполнить скрипт установки
```
sh ./voyahchat-device-name.sh
```

