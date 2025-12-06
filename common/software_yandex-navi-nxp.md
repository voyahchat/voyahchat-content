NXP это старый чип на дорест33, прежде чем начинать установку [убедитесь, что у вас именно NXP, а не 8155](https://t.me/voyahchat/32898/92496).

Если у вас 8155 — установите [другую версию Яндекс Навигатора](software_yandex-navi.md).

1. [Включить USB Debugging](usb-debugging.md)

2. Подключить [кабель](cable.md) в порт USB Type-A внизу между водителем и пассажиром. Если в машине два USB Type-A — в левый, ближе к водителю

3. Выполнить установку приложения на [Windows](#windows) или [Mac](#mac)

# Windows

1. Скачать [voyahchat-yandex-navi-nxp.zip](https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahchat-yandex-navi-nxp.zip)

2. Разархивировать `voyahchat-yandex-navi-nxp.zip` в любую директорию, нажав на файл правой кнопкой в Проводнике и выбрав `Извлечь всё`

3. Войти в директорию `voyahchat-yandex-navi-nxp`

4. Запустить пакетный файл Windows `voyahchat-yandex-navi-nxp.bat`

# Mac

Запустить `Терминал` (стандартное приложение на Маке), выполнить последовательность команд. Копировать и вставлять в терминал по одной строке, после каждой команды нажимать `Enter`:
  * Перейти в директорию `Downloads`
```
cd ~/Downloads
```
  * Скачать voyahchat-yandex-navi-nxp-mac.zip
```
curl -O https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahchat-yandex-navi-nxp-mac.zip
 ```
  * Разархивировать
```
unzip -o voyahchat-yandex-navi-nxp-mac.zip
```
  * Выполнить скрипт установки
```
sh ./voyahchat-yandex-navi-nxp.sh
```
