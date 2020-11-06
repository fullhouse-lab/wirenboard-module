Command to quick install modules for wirenboard

##  Preparation

Please connect your device to the internet

Install NodeJS, if it is not yet
```
curl -sL https://deb.nodesource.com/setup_12.x | bash -
apt-get install -y nodejs git make g++ gcc build-essential
```

##  Install

To install this packet use `wirenboard-module` command. Install it if necessary
```
npm i -g wirenboard-module
```

To add module type
```
wirenboard-module MODULE_NAME
```

Available modules
```
wirenboard-module ebus
wirenboard-module heater
wirenboard-module greenhouse
wirenboard-module zigbee
wirenboard-module ledstrip
wirenboard-module sms
wirenboard-module email
wirenboard-module guard
wirenboard-module gas
wirenboard-module smoke
wirenboard-module smoke-adc
wirenboard-module siren
wirenboard-module flood
wirenboard-module terneo
```

----

Best regards
- **FullHouse team**
- https://fullhouse-online.ru
- support@fullhouse-online.ru
