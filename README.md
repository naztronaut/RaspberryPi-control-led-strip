# Raspberry Pi - Control Kitchen Cabinet lights

Controlling kitchen cabinet lights from your browser with a Raspberry Pi Zero.

<center>
<img src="./img/thumbnail.png" width="700px" alt="Kitchen Cabinet Raspberry Pi Lights">
</center>


## Configurable Branch

This branch allows you to configure whether or not you want to control a single Pi or two Pis (Kitchen Left and Right). You can configure the options on `script.js` as follows:
```javascript
let config = {
    multi: true,
    kitchenRight: 'http://{{ip_addr}',
    kitchenLeft: 'http://{{ip_addr}' // Optional - only required if `multi` is true
};
```

If you don't want to control multiple lights, change `multi` to `false` and only fill out the `kitchenRight` property with the address. If you want both, make sure 
`multi` is true and that both `kitchenRight` and `kitchenLeft` have valid Pi IP addresses. The smaller buttons will either show or be hidden based on your settings.

## Getting Started

This project contains the tutorial files for EasyProgramming.net. 

This is a different implementation of the following Github repo: https://github.com/naztronaut/RaspberryPi-browser-led-control

In the previous repo, I showed you how to control an LED remotely from a browser using your Raspberry Pi. This tutorial will help you
implement what we've learned into practice and control an LED strip installed under our kitchen cabinets using a simple
relay. 

## Contents

1. Front end - index.html, script.js, and style.css make up a very simple frontend UI for our app
2. led - this directory contains the Flask app that will act as our back end app. This also has the required `wsgi`
required by Apache to function.  Also contains a `status.txt` which will be used to store the state of the light. 
3. Utils - this directory contains the apache config you can use for your Pi. Feel free to modify it as you see fit. 

## Tutorial
This is currently in progress And it is a newer version of the following repo: https://github.com/naztronaut/RaspberryPi-browser-led-control
A full video tutorial can be found on YouTube at https://www.youtube.com/watch?v=c6FOpPXbLjs
<a href="https://www.youtube.com/watch?v=c6FOpPXbLjs" target="_blank"><img src="https://www.easyprogramming.net/img/ledBrowserControl.png" width="700px" alt="Control an LED from a browser"></a>

More information on the tutorial can be found at https://www.easyprogramming.net/raspberrypi/browser_control_led.php

### Hardware

In order to complete this project, you will need some of these hardware:

* [ ] Raspberry Pi - can use Zero, Zero W, 2, 3, 4
* [ ] *(Optional)* Wireless dongle - If you are using the basic Pi 0 like I am, you will need to be able to connect to your local network using a Dongle. 
This is not necessary for the other versions of the Pi.
* [ ] LED Strip - Strips with only power and ground will work for this project. RGB or RGBW/W will not work. 
* [ ] Pi Power Supply - need 5V to your Pi
* [ ] LED Strip Power Supply - 12V power adapter passing 1-2 Amps of current will be sufficient. This should also work with a 24V LED Strip.
* [ ] Relay module - This is the electromechanical switch that your Pi will control. You can use a Transistor if you want! It'll be faster and without the clicking noise.
* [ ] Wiring - a simple power/ground wire will do. Most will use a red and black combo. 
* [ ] *(Optional)* Aluminum Extrusion - although not necessary, an aluminum extrusion will help dissipate heat as well as make your installation more sturdy.
* [ ] *(Optional)* Pi Case - Something to house your Pi and Relay. You can make your own or if you want, you can just leave it as is but be careful of shorts 
and electric shocks!
* [ ] *(Optional)* Soldering Iron - if you are comfortable, it is best to solder the lights and connections in place so they don't disconnect easily. 
* [ ] Tools - a wire cutter/stripper would be most helpful to you.  

### Prerequisites
The prerequisites for this tutorial is the same as the last because everything in this tutorial is the end product of what we've learned so far about 
the Raspberry Pi and some things we learned with JavaScript and jQuery. If you get stuck anywhere, take a look at these tutorials:

1. [Headless Raspberry Pi](https://www.easyprogramming.net/raspberrypi/headless_raspbery_pi.php)
2. [Using the RPi.GPIO library to turn on an LED](https://www.easyprogramming.net/raspberrypi/gpiozero_rpigpio_led.php)
3. [Run Apache on your Pi](https://www.easyprogramming.net/raspberrypi/pi_apache_web_server.php)
4. [Running a Flask App on your Pi](https://www.easyprogramming.net/raspberrypi/pi_flask_app_server.php)
5. [Run Flask behind Apache](https://www.easyprogramming.net/raspberrypi/pi_flask_apache.php)
6. [Simple AJAX with jQuery/JavaScript](https://www.easyprogramming.net/jQuery/get_data_ajax_method.php)

### Installation 

Follow the tutorial here to learn how to run a Flask app behind Apache: https://www.easyprogramming.net/raspberrypi/pi_flask_apache.php

As stated in the above tutorial and in the [Prerequisites](#prerequisites), here's a very quick checklist for this project:

* [ ] Apache
* [ ] venv (virtual environment)
* [ ] `activate-this.py` inside your venv
* [ ] Mod-WSGI [More info below](#apche-and-wsgi)

Since we are running `RPi.GPIO` from a virtual environment, we need to take one extra step after activating venv and install the package:

```bash
pip3 install RPi.GPIO
```

We need to do this because our virtual environment can't access the globally installed RPi.GPIO package

### Configuration

#### JavaScript - Script.js
The `script.js` has jQuery that calls the Flask app using simple AJAX calls. They assume that the path for the flask app is `/api/kitchen` - 
if you use another path, change this in the JavaScript to avoid getting 404s on your AJAX calls. You can also modify the API endpoints in `led/led.py` - I used 'kitchen'
as the name because these will be controlling my kitchen cabinet lights.

##### Cache Busting

I use a basic cache busting system in the JavaScript by looking at the current time for the request and appending it to the AJAX request looking for `status.txt` because 
I've noticed that browsers love to store this in memory, especially mobile browsers. This ensures that we don't have to worry about caching. 

#### Apache and WSGI

The `led.wsgi` file should be placed in the same directory as `led.py` which contains your Flask controllers. Make sure the paths for `activate_this.py` and `led.py` match
your installation. If you rename the flask controller, you have edit the `wsgi` file to reflect the changes. 

Take the `utils/apache-led.conf` configuration file and place it in the appropriate Apache/sites-available directory and enable it with with:

```bash
sudo a2ensite apache-led.conf
```

Feel free to use your own configuration and name it anything you want! This should be used as a template.
 
Once that's done, restart Apache with:

```bash
sudo service apache2 restart
```

If you get a WSGI error, your Pi may not have Mod-WSGI installed. Run the following and restart apache:

```bash
sudo apt install libapache2-mod-wsgi-py3 -y
``` 

**Note** that the `multi` branch contains a line in the 
configuration to enable `CORS` from all origins. If you don't want to enable CORS and want to handle these requests another way, remove this line in `apache-led.conf`:

```
Header set Access-Control-Allow-Origin "*"
```

Technically,  you only need the above line in any child Raspberry Pi since the calls are being made from the parent to the child. As long as you don't open your Pi
to the outside world, you should be fine. You can also specify which origins are allowed to make requests.  

If everything is set up correctly, the AJAX call will happen with the following url: `http://{{ip_addr}}/api/kitchen?status=on`

Only a status of `on` or `off` are accepted. Anything else will return a simple error message. Open up the JavaScript console for more info.  


### Status.txt

Currently, the `status.txt` file is used to store the status of the lights so that we can detect it and store it in memory. Because of how Flask and Apache works,
the path in `led.py` for the txt file must be an absolute path. Currently it is the following:

```
/var/www/html/kitchenLights/led/status.txt
```

Edit it if your path differs from this repo. 

### API endpoints

#### `/api/kitchen?status=on/off`

## Authors
* **Nazmus Nasir** - [Nazm.us](https://nazm.us) - Owner of EasyProgramming.net

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

# Questions ?
Have questions? You can reach me through several different channels. You can ask a question in the  [issues forum](/../../issues), 
on [EasyProgramming.net](https://www.easyprogramming.net), or on the vide comments on YouTube. 


# Contribute 
I will accept Pull requests fixing bugs or adding new features after I've vetted them. Feel free to create pull requests! 