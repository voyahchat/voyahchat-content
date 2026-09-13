Для получения клавиатуры с русскими буквами нужно установить стороннее приложение клавиатуры и настроить его.

Клавиатура будет работать только на центральном экране, на экране пассажира будет китайская клавиатура.

CunBA поддерживает только [Яндекс Клавиатуру](#яндекс), в [VoyahTweaks](tweaks.md) можно выбрать любую установленную стороннюю клавиатуру.

Инструкция написана для [Simple Keyboard](#simple) и [Яндекс Клавиатуры](#яндекс). Вместо них можно установить Google Gboard или Microsoft Swiftkey из [APKPure](software_apkpure.md) и сделать аналогичные настройки.

Для Passion на прошивках 2.1.4.60 / 2.1.4.64 вместо стороннего приложения заменяется штатная клавиатура, см. [Passion](#passion).

# Simple

1. [Включить USB Debugging](usb-debugging.md)

2. Подключить [кабель](cable.md) в порт USB Type-A внизу между водителем и пассажиром. Если в машине два USB Type-A — в левый, ближе к водителю

3. Выполнить установку приложения на [Windows](#windows) или [Mac](#mac)

4. В VoyahTweaks [выбрать и включить клавиатуру](tweaks_settings.md#настройки)

5. Переключиться в лаунчер приложений, нажав на центральном экране на левой панели четыре квадратика внизу

6. Запустить Simple Keyboard

7. Добавить русский или английский язык в раскладку клавиатуры

8. Выключить щелчки клавиш

9. Выбрать тему клавиатуры `Material Dark Border` (если у вас тёмный интерфейс машины)

## Windows

1. Скачать [voyahchat-keyboard-simple.zip](https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahchat-keyboard-simple.zip)

2. Разархивировать `voyahchat-keyboard-simple.zip` в любую директорию, нажав на файл правой кнопкой в Проводнике и выбрав `Извлечь всё`

3. Войти в директорию `voyahchat-keyboard-simple`

4. Запустить пакетный файл Windows `voyahchat-keyboard-simple.bat`

## Mac

Запустить `Терминал` (стандартное приложение на Маке), выполнить последовательность команд. Копировать и вставлять в терминал по одной строке, после каждой команды нажимать `Enter`:
- Перейти в директорию `Downloads`
```
cd ~/Downloads
```
- Скачать voyahchat-keyboard-simple-mac.zip
```
curl -O https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahchat-keyboard-simple-mac.zip
 ```
- Разархивировать
```
unzip -o voyahchat-keyboard-simple-mac.zip
```
- Выполнить скрипт установки
```
sh ./voyahchat-keyboard-simple.sh
```

# Яндекс

1. [Включить USB Debugging](usb-debugging.md)

2. Подключить [кабель](cable.md) в порт USB Type-A внизу между водителем и пассажиром. Если в машине два USB Type-A — в левый, ближе к водителю

3. Выполнить установку приложения на [Windows](#windows) или [Mac](#mac)

4. В VoyahTweaks [выбрать и включить клавиатуру](tweaks_settings.md#настройки), в Cunba в настройках выбрать `Отключить китайскую клавиатуру`

5. Переключиться в лаунчер приложений, нажав на центральном экране четыре квадратика внизу

6. Запустить Yandex Keyboard, в правом нижнем углу нажать на значок клавиатуры. Она не появится с первого раза. Нажать на значок ещё раз, чтобы её скрыть. И ещё раз, чтобы её показать, а потом нажать ещё раз, чтобы скрыть.

7. Включить цифровой ряд клавиш

8. В темах выбрать тёмную тему клавиатуры с синей кнопкой (если у вас тёмный интерфейс машины)

9. В настройках интерфейса клавиатуры выбрать масштаб кнопок 150%

10. Загрузить русскую раскладку

## Windows

1. Скачать [voyahchat-keyboard-yandex.zip](https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahchat-keyboard-yandex.zip)

2. Разархивировать `voyahchat-keyboard-yandex.zip` в любую директорию, нажав на файл правой кнопкой в Проводнике и выбрав `Извлечь всё`

3. Войти в директорию `voyahchat-keyboard-yandex`

4. Запустить пакетный файл Windows `voyahchat-keyboard-yandex.bat`

## Mac

Запустить `Терминал` (стандартное приложение на Маке), выполнить последовательность команд. Копировать и вставлять в терминал по одной строке, после каждой команды нажимать `Enter`:
- Перейти в директорию `Downloads`
```
cd ~/Downloads
```
- Скачать voyahchat-keyboard-yandex-mac.zip
```
curl -O https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahchat-keyboard-yandex-mac.zip
 ```
- Разархивировать
```
unzip -o voyahchat-keyboard-yandex-mac.zip
```
- Выполнить скрипт установки
```
sh ./voyahchat-keyboard-yandex.sh
```

# Passion

Русская клавиатура для Passion на прошивках 2.1.4.60 / 2.1.4.64. Штатная клавиатура заменяется целиком, никакие другие приложения не нужны.

Что работает:
- русская ЙЦУКЕН-раскладка
- английская раскладка
- переключение RU/EN и EN/RU
- русские подписи «Пробел», «Поиск», «Ввод», «Готово»

Для китайской прошивки используется отдельная версия, этот пакет не подойдёт.

1. [Включить USB Debugging](usb-debugging.md)

2. Подключить [кабель](cable.md) в порт USB Type-A внизу между водителем и пассажиром. Если в машине два USB Type-A — в левый, ближе к водителю

3. Выполнить установку на [Windows](#windows) или [Mac](#mac)

4. Дождаться сообщения об успешной установке, машина перезагрузится автоматически

5. После загрузки подождать около минуты и проверить клавиатуру

## Windows

1. Скачать [voyahchat-keyboard-passion.zip](https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahchat-keyboard-passion.zip)

2. Разархивировать `voyahchat-keyboard-passion.zip` в любую директорию, нажав на файл правой кнопкой в Проводнике и выбрав `Извлечь всё`

3. Войти в директорию `voyahchat-keyboard-passion`

4. Запустить пакетный файл Windows `voyahchat-keyboard-passion.bat`

## Mac

Запустить `Терминал` (стандартное приложение на Маке), выполнить последовательность команд. Копировать и вставлять в терминал по одной строке, после каждой команды нажимать `Enter`:
- Перейти в директорию `Downloads`
```
cd ~/Downloads
```
- Скачать voyahchat-keyboard-passion-mac.zip
```
curl -O https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahchat-keyboard-passion-mac.zip
 ```
- Разархивировать
```
unzip -o voyahchat-keyboard-passion-mac.zip
```
- Выполнить скрипт установки
```
sh ./voyahchat-keyboard-passion.sh
```

## Удаление

Для удаления русской клавиатуры и возврата штатной используется тот же архив, что для установки. Машина перезагрузится автоматически, после загрузки подождать около минуты и проверить клавиатуру.

На Windows запустить пакетный файл `voyahchat-keyboard-passion-uninstall.bat` из директории архива.

На Mac выполнить из директории архива:
```
sh ./voyahchat-keyboard-passion-uninstall.sh
```

