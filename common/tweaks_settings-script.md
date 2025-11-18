Скрипт для быстрой настройки VoyahTweaks 2.5.x.

1. [Включить USB Debugging](usb-debugging.md)

2. Подключить [USB Type-A — Type-A кабель](cable.md) (на доресте в порт ближе к водителю)

3. Запустить скрипт на [Windows](#windows) или [Mac](#mac)

4. [Перезагрузить машину](reboot.md#мультимедиа) для применения изменений

## Windows

1. Скачать [voyahchat-voyahtweaks-settings.zip](https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahchat-voyahtweaks-settings.zip)

2. Разархивировать `voyahchat-voyahtweaks-settings.zip` в любую директорию, нажав на файл правой кнопкой в Проводнике и выбрав `Извлечь всё`

3. Войти в директорию `voyahchat-voyahtweaks-settings`

4. Запустить пакетный файл Windows `voyahchat-voyahtweaks-settings.bat`

## Mac

Запустить `Терминал` (стандартное приложение на Маке), выполнить последовательность команд. Копировать и вставлять в терминал по одной строке, после каждой команды нажимать `Enter`:
  * Перейти в директорию `Downloads`
```
cd ~/Downloads
```
  * Скачать voyahchat-voyahtweaks-settings-mac.zip
```
curl -O https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahchat-voyahtweaks-settings-mac.zip
```
  * Разархивировать
```
unzip -o voyahchat-voyahtweaks-settings-mac.zip
```
  * Выполнить скрипт установки
```
sh ./voyahchat-voyahtweaks-settings.sh
```

