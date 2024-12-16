---
title: 'Обновление'
published: true
---

Обновление китайской прошивки делается «по воздуху» (OTA, Over The Air). Для получения прошивки по воздуху в машине должна быть установлена SIM-карта, по Wi-Fi обновление невозможно.

Альтернативные варианты обновления:

  * [Самостоятельно](manual) «протолкнуть» застрявшую прошивку
  * [Платно](paid) «протолкнуть» застрявшую прошивку
  * По проводу в сервисе, где есть такая услуга

# Загрузка

МА для обновлений НЕ нужен.

В машине должна быть установлена сим-карта, через Wi-Fi не обновится. Обновления скачивает TBOX, это блок со своей операционной системой. Нет, мы не знаем, как поставить в него VPN, чтобы китайские сервера считали, что машина в Китае.

Больше всего успехов в чате с обновлениями на МТС. Но и на SIM других операторов обновления тоже приходят.

Иногда помогает сменить оператора, чтобы началась загрузка (например, поставить SIM из телефона).

Прошивка качается, когда машина включена.

Есть [предположение](https://t.me/voyahchat/11800/395349), что блокируется HTTP DNS на стороне оператора.

Иногда помогает [написать в поддержку](/common/support) просьбу об обновлении на китайском с обязательным указанием VIN.

В поддержку [можно написать](https://t.me/voyahchat/11800/424618), что был в сервисе и там сбросили все ошибки, пришлите обновление ещё раз.

```
嗨！ 请将我的车更新到5.0.4。
VIN：12345…

Привет! Обновите, пожалуйста, мою машину до 5.0.4.
VIN: 12345…
```

(нужно подтверждение этого) Раздать машине интернет с телефона и [Перезагружать TBOX](https://t.me/voyahchat/11800/378658) — [подробное описание](https://t.me/voyahchat/11800/394228)

# Установка

Условия, при которых происходит установка обновления:

  * Авто закрыто и селектор находится в положении "Р"
  * Зажигание выключено
  * Заряд ВВБ более или равен 60%
  * Порт зарядки закрыт, т.е. машина не на зарядке
  * SoC АКБ12 не менее чем на 75%
  * Напряжение на 12В аккумуляторе больше 12В
  * Нет ошибок по высоковольтной части
  * К диагностическому разъёму ничего не подключено