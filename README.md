# as-input-validator-sample
Implementierungsbeispiel für das Modul "as-address-solutions-validator" (https://github.com/addresssolutions/as-address-solutions-validator). 

Web-Serverseite zur Namens- und Adressprüfung auf Basis von NodeJS, Bootstrap 3, Bootstrap-Validator u. a.

Umfangreiche Informationen zum Anwendungsbereich, Hintergrund und Installation finden Sie im Wiki: https://github.com/addresssolutions/as-address-solutions-validator/wiki

## Installation

Voraussetzung: Installiertes NodeJS und Basiskenntnisse zu NodeJS, Express, npm

Clonen des repository https://github.com/addresssolutions/as-input-validator-sample.git oder einfach das ZIP-File downloaden und entpacken. Dann in das entpackte Verzeichnis (z.B. as-input-validator-sample-master/) wechseln und dort 

**$ npm install**

ausführen. Dadurch wird ein Unterverzeichnis node-modules/ mit den benötigten node Komponenten erstellt.

Anschließend mit

**$ node as-input-validator-sample.js** 

den Webserver starten. Dieser läuft auf Port 9001. Wenn dieser Port nicht verwendet werden kann/soll, dann in der js-Source die Zeilen 
    
    // ports can be changed here
    // to use standard ports 80 and 443 the server must be started with root permission (or sudo)
    app.set('port', process.env.PORT || 9001); 
 
auf den gewünschten Port umstellen. 
 
Nach dem Start des Servers erscheint nur die Meldung

    Server started in development mode on port 9001 (no ssl/https)
    press Ctrl-C to terminate.
    
Anschließend starten Sie Ihren Browser und geben in die Adresszeile 
http://localhost:9001/address_validation_mask
ein. Ersetzen Sie localhost durch die IP-Adresse des Servers, auf dem Sie den Service gestartet haben, falls Browser und Server auf unterschiedlichen Systemen laufen.


## Referenz
Wenn alles funktioniert hat, dann sollten Sie eine Webseite sehen, die wie diese aussieht: http://185.82.86.101:9001/address_validation_mask



Author


**Ralf Geerken**  
**http://www.address-solutions.de**    
**r.geerken@address-solutions.de**  


Copyright and license

Copyright 2017 AS Address Solutions under the MIT license.
