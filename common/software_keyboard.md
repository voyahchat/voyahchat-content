---
title: 'Клавиатура'
published: true
---

Для получения клавиатуры с русскими буквами, нужно установить стороннее приложение клавиатуры и настроить его.

Клавиатура будет работать только на центральном экране, на экране пассажира будет китайская клавиатура.

Инструкция написана для Яндекс Клавиатуры. Яндекс Клавиатура не может быть установлена, если у вас установлен [Яндекс Навигатор для NXP](../yandex-navi-nxp).

Вместо Яндекс Клавиатуры можно установить Google Gboard или Microsoft Swiftkey из APKPure и сделать аналогичные настройки.

1. [Включить USB Debugging](https://voyahchat.ru/common/usb-debugging)

2. Подключить [USB Type-A — Type-A кабель](https://voyahchat.ru/common/cable) (на доресте в порт ближе к водителю)

3. Выполнить установку приложения на [Windows](#windows) или [Mac](#mac)

4. В VoyahTweaks [выбрать и включить клавиатуру](/common/tweaks/settings#настройки), в Cunba в настройках выбрать `Отключить китайскую клавиатуру`

5. Переключиться в лаунчер приложений, нажав на центральном экране четыре квадратика внизу

6. Запустить Yandex Keyboard, в правом нижнем углу нажать на значок клавиатуры. Она не появится с первого раза. Нажать на значок ещё раз, чтобы её скрыть. И ещё раз, чтобы её показать, а потом нажать ещё раз, чтобы скрыть.

7. Включить цифровой ряд клавиш

8. В темах выбрать тёмную тему клавиатуры с синей кнопкой (если у вас тёмный интерфейс машины)

9. В настройках интерфейса клавиатуры выбрать масштаб кнопок 150%

10. Загрузить русскую раскладку

# Windows

1. Скачать [voyahchat-keyboard-yandex.zip](/voyahchat-keyboard-yandex.zip)

2. Разархивировать `voyahchat-keyboard-yandex.zip` в любую директорию, нажав на файл правой кнопкой в Проводнике и выбрав `Извлечь всё`

3. Войти в директорию `voyahchat-keyboard-yandex`

4. Запустить пакетный файл Windows `voyahchat-keyboard-yandex.bat`

# Mac

Запустить `Терминал` (стандартное приложение на Маке), выполнить последовательность команд. Копировать и вставлять в терминал по одной строке, после каждой команды нажимать `Enter`:
  * Перейти в директорию `Downloads`
```
cd ~/Downloads
```
  * Скачать voyahchat-keyboard-yandex-mac.zip
```
curl -O https://voyahchat.ru/voyahchat-keyboard-yandex-mac.zip
 ```
  * Разархивировать
```
unzip -o voyahchat-keyboard-yandex-mac.zip
```
  * Выполнить скрипт установки
```
sh ./voyahchat-keyboard-yandex.sh
```
