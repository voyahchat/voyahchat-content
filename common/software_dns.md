Если у вас не работает RuTube или какие-то ещё приложения не могут подключиться к своим серверам — возможно проблема в DNS.

DNS можно сменить на [Yandex](#yandex) или [one.one.one.one](#one). Так же можно вернуть к настройкам [по умолчанию](#default).

# Yandex

1. [Включить USB Debugging](usb-debugging.md)

2. Подключить [USB Type-A — Type-A кабель](cable.md) (на доресте в порт ближе к водителю)

3. Запустить скрипт на [Windows](#windows) или [Mac](#mac)

4. [Перезагрузить машину](reboot.md#мультимедиа) для применения изменений

## Windows

1. Скачать [voyahchat-dns-yandex.zip](https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahchat-dns-yandex.zip)

2. Разархивировать `voyahchat-dns-yandex.zip` в любую директорию, нажав на файл правой кнопкой в Проводнике и выбрав `Извлечь всё`

3. Войти в директорию `voyahchat-dns-yandex`

4. Запустить пакетный файл Windows `voyahchat-dns-yandex.bat`

## Mac

Запустить `Терминал` (стандартное приложение на Маке), выполнить последовательность команд. Копировать и вставлять в терминал по одной строке, после каждой команды нажимать `Enter`:
  * Перейти в директорию `Downloads`
```
cd ~/Downloads
```
  * Скачать voyahchat-dns-yandex-mac.zip
```
curl -O https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahchat-dns-yandex-mac.zip
```
  * Разархивировать
```
unzip -o voyahchat-dns-yandex-mac.zip
```
  * Выполнить скрипт установки
```
sh ./voyahchat-dns-yandex.sh
```

# One

1. [Включить USB Debugging](usb-debugging.md)

2. Подключить [USB Type-A — Type-A кабель](cable.md) (на доресте в порт ближе к водителю)

3. Запустить скрипт на [Windows](#windows-1) или [Mac](#mac-1)

4. [Перезагрузить машину](reboot.md#мультимедиа) для применения изменений

## Windows

1. Скачать [voyahchat-dns-one.zip](https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahchat-dns-one.zip)

2. Разархивировать `voyahchat-dns-one.zip` в любую директорию, нажав на файл правой кнопкой в Проводнике и выбрав `Извлечь всё`

3. Войти в директорию `voyahchat-dns-one`

4. Запустить пакетный файл Windows `voyahchat-dns-one.bat`

## Mac

Запустить `Терминал` (стандартное приложение на Маке), выполнить последовательность команд. Копировать и вставлять в терминал по одной строке, после каждой команды нажимать `Enter`:
  * Перейти в директорию `Downloads`
```
cd ~/Downloads
```
  * Скачать voyahchat-dns-one-mac.zip
```
curl -O https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahchat-dns-one-mac.zip
```
  * Разархивировать
```
unzip -o voyahchat-dns-one-mac.zip
```
  * Выполнить скрипт установки
```
sh ./voyahchat-dns-one.sh
```

# Default

1. [Включить USB Debugging](usb-debugging.md)

2. Подключить [USB Type-A — Type-A кабель](cable.md) (на доресте в порт ближе к водителю)

3. Запустить скрипт на [Windows](#windows-2) или [Mac](#mac-2)

4. [Перезагрузить машину](reboot.md#мультимедиа) для применения изменений

## Windows

1. Скачать [voyahchat-dns-default.zip](https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahchat-dns-default.zip)

2. Разархивировать `voyahchat-dns-default.zip` в любую директорию, нажав на файл правой кнопкой в Проводнике и выбрав `Извлечь всё`

3. Войти в директорию `voyahchat-dns-default`

4. Запустить пакетный файл Windows `voyahchat-dns-default.bat`

## Mac

Запустить `Терминал` (стандартное приложение на Маке), выполнить последовательность команд. Копировать и вставлять в терминал по одной строке, после каждой команды нажимать `Enter`:
  * Перейти в директорию `Downloads`
```
cd ~/Downloads
```
  * Скачать voyahchat-dns-default-mac.zip
```
curl -O https://github.com/voyahchat/voyahchat-install/raw/refs/heads/main/voyahchat-dns-default-mac.zip
```
  * Разархивировать
```
unzip -o voyahchat-dns-default-mac.zip
```
  * Выполнить скрипт установки
```
sh ./voyahchat-dns-default.sh
```
