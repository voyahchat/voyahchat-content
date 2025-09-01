---
title: 'Autokit'
published: true
---

Используйте Carlinkit [CPC200-CCPA](https://www.carlinkit.com/ccpa) (беспроводное подключение телефона) или [CPC200-CCPM](https://www.carlinkit.com/ccpm) (проводное подключение телефона).

AutoKit может быть использован без CunBA или VoyahTweaks, в этом случае не будет работать управление музыкой на руле.

1. [Включить USB Debugging](usb-debugging.md)

2. Подключить [USB Type-A — Type-A кабель](cable.md) (на доресте в порт ближе к водителю)

3. Выполнить установку приложения на [Windows](#windows) или [Mac](#mac)

4. [Выключить USB Debugging](usb-debugging.md)

# Windows

1. Скачать [voyahchat-autokit.zip](https://voyahchat.ru/voyahchat-autokit.zip)

2. Разархивировать `voyahchat-autokit.zip` в любую директорию, нажав на файл правой кнопкой в Проводнике и выбрав `Извлечь всё`

3. Войти в директорию `voyahchat-autokit`

4. Запустить пакетный файл Windows `voyahchat-autokit.bat`

5. Если AutoKit неправильно вписывается в экран (установлен без использования CunBA или VoyahTweaks, или используется версия VoyahTweaks меньше 2.2.2):
  * удалить файл `config.xml` в директории `voyahchat-autokit`
  * переменовать файл `config-clean.xml` в `config.xml`
  * запустить ещё раз пакетный файл Windows `voyahchat-autokit.bat`

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
  * Если AutoKit неправильно вписывается в экран (установлен без использования CunBA или VoyahTweaks, или используется версия VoyahTweaks меньше 2.2.2), то выполнить
```
mv config-clean.xml config.xml
```
```
sh ./voyahchat-autokit.sh
```

