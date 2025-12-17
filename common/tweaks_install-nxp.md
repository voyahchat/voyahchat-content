ЭТО НЕ ОФИЦИАЛЬНАЯ ИНСТРУКЦИЯ ПО УСТАНОВКЕ, [официальная инструкция по установке](https://voyahtweaks.ru/instruction) доступна на сайте VoyahTweaks.

NXP это старый чип на дорест33, прежде чем начинать установку [убедитесь, что у вас именно NXP, а не 8155](https://t.me/voyahchat/32898/92496).

Если у вас 8155 — [используйте другую инструкцию](tweaks_install.md).

1. Если была установлена Кунба и она не нужна — сделать [factory reset](reset.md)

2. Включить [USB Debugging](usb-debugging.md)

3. Подключить [USB Type-A — Type-A кабель](cable.md) в порт USB Type-A ближе к водителю

4. Выполнить установку версии 2.1.2 на [Windows](#windows) или [Mac](#mac) или версии 2.2.4 на [Windows](#windows-1) или [Mac](#mac-1)

5. После запуска скрипта мультимедиа пару раз перезагрузится во время установки, на машине запуститься `VoyahTweaks`

6. Нажать любую клавишу в окне запуска скрипта, мультимедия перезагрузится ещё раз, на машине запуститься `VoyahTweaks`

7. На центральном экране нажать в левой панели «четыре квадратика», откроется лаунчер приложений

   Лаунчер со стандартными приложениями доступен по долгому нажатию на четыре квадратика.

   Дальше можно воспользоваться [инструкцией по настройке приложений на NXP](software_setup-nxp.md).

8. После установки всех приложений [выключить USB Debugging](usb-debugging.md)

# 2.1.2

## Windows

1. Скачать [voyahtweaks-2.1.2.zip](https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahtweaks-2.1.2.zip)

2. Разархивировать `voyahtweaks-2.1.2.zip` в корень диска `C:`

3. Зайти в директорию `C:\VoyahTweaks`

4. Запустить `install.bat`

## Mac

Запустить `Терминал` (стандартное приложение на Маке), выполнить последовательность команд. Копировать и вставлять в терминал по одной строке, после каждой команды нажимать `Enter`:
- Перейти в директорию `Downloads`
```
cd ~/Downloads
```
- Скачать voyahtweaks-2.1.2.zip
```
curl -O https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahtweaks-2.1.2.zip
```
- Разархивировать
```
unzip -o voyahtweaks-2.1.2.zip
```
- Перейти в директорию `VoyahTweaks`
```
cd VoyahTweaks
```
- Выполнить скрипт установки
```
sh ./install.sh
```

# 2.2.4

## Windows

1. Скачать [voyahtweaks-2.2.4.zip](https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahtweaks-2.2.4.zip)

2. Разархивировать `voyahtweaks-2.2.4.zip` в корень диска `C:`

3. Зайти в директорию `C:\VoyahTweaks`

4. Запустить `install.bat`

## Mac

Запустить `Терминал` (стандартное приложение на Маке), выполнить последовательность команд. Копировать и вставлять в терминал по одной строке, после каждой команды нажимать `Enter`:
- Перейти в директорию `Downloads`
```
cd ~/Downloads
```
- Скачать voyahtweaks-2.2.4.zip
```
curl -O https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahtweaks-2.2.4.zip
```
- Разархивировать
```
unzip -o voyahtweaks-2.2.4.zip
```
- Перейти в директорию `VoyahTweaks`
```
cd VoyahTweaks
```
- Выполнить скрипт установки
```
sh ./install.sh
```

