ЭТО НЕ ОФИЦИАЛЬНАЯ ИНСТРУКЦИЯ ПО УСТАНОВКЕ, [официальная инструкция по установке](https://voyahtweaks.ru/instruction) доступна на сайте VoyahTweaks.

У вас в машине должен быть интернет во время установки.

Если у вас машина ОД РФ, то перед установкой VoyahTweaks нужно отключить VoyahStore через [ADB](adb.md):

1. Включить [USB Debugging](usb-debugging.md)

2. Подключить [USB Type-A — Type-A кабель](cable.md) в USB Type-A, если портов два — в порт USB Type-A ближе к водителю

3. Выполнить установку приложения на [Windows](#windows) или [Mac](#mac)

4. Если у вас машина ОД РФ, то нужно отключить VoyahStore через [ADB](adb.md):

    ```
    adb root
    adb shell
    su
    pm disable ru.mi.voyahstore
    ```

5. [Перезагрузить мультимедиа](reboot.md#мультимедиа) для применения изменений

Дальше можно воспользоваться [инструкцией по настройке приложений](software_setup.md).

# Windows

1. Скачать [VoyahTweaks_2.7.0.zip](https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/VoyahTweaks_2.7.0.zip)

2. Разархивировать `VoyahTweaks_2.7.0.zip`

3. Зайти в директорию `VoyahTweaks_2.7.0`

4. Запустить `install_Win.bat`

# Mac

Запустить `Терминал` (стандартное приложение на Маке), выполнить последовательность команд. Копировать и вставлять в терминал по одной строке, после каждой команды нажимать `Enter`:
- Перейти в директорию `Downloads`
```
cd ~/Downloads
```
- Скачать VoyahTweaks_2.7.0.zip
```
curl -O https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/VoyahTweaks_2.7.0.zip
```
- Разархивировать
```
unzip -o VoyahTweaks_2.7.0.zip
```
- Перейти в директорию `VoyahTweaks_2.7.0`
```
cd VoyahTweaks_2.7.0
```
- Выполнить скрипт установки
```
sh ./install_Mac.sh
```

