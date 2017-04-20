module.exports = {
  // Germany
  get_conversion_message_de: function(message_number) {
    var message = [];
    message[0] = "Unbekannter Fehler. Bitte Prüfen Sie erneut die Eingabe";
    message[1] = "Der Name konnte validiert werden. Mit [OK und weiter] gelangen Sie zur Eingabe der Anschrift.";
    message[2] = "Der Name ist valide, es wurden aber leichte Normkorrekturen durchgeführt. Überprüfen Sie Ihre Eingabe und betätigen Sie [OK und weiter] wenn alles korrekt ist.";
    message[3] = "Es wurden Namenselemente verschoben bzw. Korrekturen durchgeführt. Überprüfen Sie das Ergebnis und betätigen Sie [OK und weiter] wenn alles korrekt ist.";
    message[4] = "Unbekannter Fehler. Bitte Prüfen Sie erneut die Eingabe";
    message[5] = "Ihre Angaben konnten nicht validiert und korrigiert werden. Überprüfen Sie Ihre Eingabe und betätigen Sie [OK und weiter] wenn alles korrekt ist.";
    message[6] = "Wir haben eine Personengemeinschaft erkannt. Es kann nur eine Einzelperson registriert werden. Überprüfen Sie Ihre Eingabe und betätigen Sie [OK und weiter] wenn alles korrekt ist.";
    message[7] = "Wir haben einen Personennamen erkannt, allerdings ist das Ergebnis unsicher. Überprüfen Sie Ihre Eingabe und betätigen Sie [OK und weiter] wenn alles korrekt ist.";
    message[8] = "Wir haben unbekannte Namenselemente gefunden oder der Name ist nicht strukturierbar. Überprüfen Sie Ihre Eingabe und betätigen Sie [OK und weiter] wenn alles korrekt ist.";
    message[9] = "Wir haben einen Hinweis auf einen Firmennamen gefunden. Es kann nur eine natürliche Einzelperson registriert werden. Überprüfen Sie Ihre Eingabe und betätigen Sie [OK und weiter] wenn alles korrekt ist.";
    if (message_number < 10) return message[message_number];
    else return 'unbekannter Statuscode: ' + message_number;
  },

  get_postbox_message_de: function(message_number) {
    var message = [];
    message[0] = "Es konnte in unserem Verzeichnis keine ausreichend ähnliche Adresse gefunden werden. Überprüfen Sie Ihre Eingabe und betätigen Sie [Speichern] wenn alles korrekt ist.";
    message[1] = "Die Adresse konnte eindeutig validiert werden. Mit [Speichern] gelangen Sie zur Kontrollanzeige Ihrer gesamten Eingaben.";
    message[2] = "Die Adresse konnte eindeutig validiert werden, es wurden aber leichte Normkorrekturen durchgeführt. Überprüfen Sie die Daten und betätigen Sie [Speichern] wenn alles korrekt ist.";
    message[3] = "Die Adresse konnte eindeutig validiert werden, es wurden aber Korrekturen durchgeführt. Überprüfen Sie die Daten und betätigen Sie [Speichern] wenn alles korrekt ist.";
    message[4] = "Ihre Angaben konnten nicht eindeutig validiert oder korrigiert werden, die erste Stelle der PLZ ist aber OK. Überprüfen Sie Ihre Eingabe und betätigen Sie [Speichern] wenn alles korrekt ist.";
    message[5] = "Ihre Angaben konnten nicht eindeutig validiert oder korrigiert werden, PLZ und Ort sind aber korrekt. Überprüfen Sie Ihre Eingabe im Straßenfeld und betätigen Sie [Speichern] wenn alles korrekt ist.";
    message[6] = "Ihre Angaben konnten nicht eindeutig validiert oder korrigiert werden. Es existieren mindestens zwei Adressen, die den selben Score liefern";
    message[7] = "Ihre Angaben konnten nicht eindeutig validiert oder korrigiert werden. Die gefundenen Adressen sind aber in PLZ, Ort, Straße und Hausnummer identisch. Überprüfen Sie Ihre Eingabe und betätigen Sie [Speichern] wenn alles korrekt ist.";
    message[8] = "unbekannter Statuscode";
    message[9] = "Die Adresssuche lieferte kein Ergebnis. Überprüfen Sie Ihre Eingabe und betätigen Sie [Speichern] wenn alles korrekt ist.";
    if (message_number < 10) return message[message_number];
    else return 'unbekannter Statuscode: ' + message_number;
  },

  error_messages_de: {
    status491: "AS ConvertBox Service nicht verfügbar. Überprüfen Sie Ihre Eingabe sorgfältig und betätigen Sie [OK und weiter] wenn alles korrekt ist.",
    status492: "AS ConvertBox Service antwortet nicht korrekt. Überprüfen Sie Ihre Eingabe sorgfältig und betätigen Sie [OK und weiter] wenn alles korrekt ist.",
    mandatory: "ist Pflichtfeld",
    hnr_missing: "Hinweis: Hausnummer fehlt!",
    hnr_not_ok: "Hinweis: Hausnummer (in dieser PLZ) ungültig",
    hnr_not_numeric: "nur Ziffern erlaubt",
  },

  field_titles_de: {
    salutation: "Anrede*",
    title: "Titel",
    firstname: "Vorname*",
    lastname: "Nachname*",
    zip: "PLZ*",
    city: "Ort*",
    street: "Straße*",
    hnr: "HNr",
    hnradd: "Zusatz"
  },

  salutations_de: {
    mr: "Herr",
    mrs: "Frau"
  },

  buttons_de: {
    check_name: {
      btn: " Prüfen",
      hint: "Prüfen, Korrigieren und Strukturieren der Namensteile"
    },
    ok_name: {
      btn: " OK und weiter",
      hint: "Namen übernehmen und weiter zur Eingabe der Adresse",
    },
    check_address: {
      btn: " Prüfen",
      hint: "Prüfen, Korrigieren und Strukturieren der postalischen Anschrift"
    },
    myentry: {
      btn: " Meine Eingabe",
      hint: "Die ursprüngliche Eingabe wieder zurückholen",
    },
    submit: {
      btn: " Speichern",
      hint: "Adressdaten speichern und Zusammenfassung anzeigen"
    },
    clear: {
      btn: " Beenden",
      hint: "Eingabemaske leeren und zurück"
    }
  },

  various_text_de: {
    head1: "Adress-Validierung",
    head2: "Sichere und korrekte Erfassung von Adreßdaten",
    head3: "powered by AS Address Solutions (c) 2017",
    head_name_box: "Person/Name",
    head_address_box: "Anschrift",
    head_result_box: "Zusammenfassung",
    success_message: "Wir haben Ihre folgenden Adressdaten empfangen",
    address_collapse_disabled: "Bitte zuerst Namen eingeben und prüfen. Danach können Sie die Anschrift eingeben.",
    result_collapse_disabled: "Die Aktivierung und Anzeige der Zusammenfassung erfolgt automatisch nach vollständiger Eingabe von Name und Anschrift und Abspeichern der Daten",
  },


  // Great Britain / Englisch
  get_conversion_message_gb: function(message_number) {
    var message = [];
    message[0] = "Unexpected Error. Please try to check again.";
    message[1] = "Name was validated successfully. Press [OK and next] to jump to the mask for the postal address.";
    message[2] = "Name was valid, but there have been made some slightly corrections. Please check the result and press [OK and next] if everything is correct.";
    message[3] = "Name elements have been moved or corrected. Please check the result and press [OK and next] if everything is correct.";
    message[4] = "Your entry could not be validated or corrected successfully. Please check the name fields and press [OK and next] if everything is correct.";
    message[5] = "Unexpected Error. Please try to check again.";
    message[6] = "We have detected a group of persons. We just accept a single person. Please check the name fields and press [OK and next] if everything is correct.";
    message[7] = "We have found a persons name, but the result is not sure. Please check the name fields and press [OK and next] if everything is correct.";
    message[8] = "We have found unknown name elements or the name cannot be well structured. Please check the name fields and press [OK and next] if everything is correct.";
    message[9] = "We have fouud a hint to a company name. We just accept a single person. Please check the name fields and press [OK and next] if everything is correct.";
    if (message_number < 10) return message[message_number];
    else return 'unknown Statuscode: ' + message_number;
  },

  get_postbox_message_gb: function(message_number) {
    var message = [];
    message[0] = "The postal address could not be found in our reference database. Please check your input and click on [Save] if everything is correct.";
    message[1] = "The postal address was validated successfully. Press [Save] to jump to the final screen.";
    message[2] = "The postal address was validated successfully, but there have been made some slightly corrections. Please check the result and press [Save] if everything is correct.";
    message[3] = "The postal address was validated successfully, but some elements have been moved or corrected. Please check the result and press [Save] if everything is correct.";
    message[4] = "The postal address could not be validated or corrected successfully. Please check the address fields carefully and press [Save] if everything is correct.";
    message[5] = "The postal address could not be validated or corrected successfully. Please check the address fields carefully and press [Save] if everything is correct.";
    message[6] = "The postal address could not be validated or corrected successfully. Please check the address fields carefully and press [Save] if everything is correct.";
    message[7] = "The postal address could not be validated or corrected successfully. Please check the address fields carefully and press [Save] if everything is correct.";
    message[8] = "The postal address could not be validated or corrected successfully. Please check the address fields carefully and press [Save] if everything is correct.";
    message[9] = "The postal address could not be validated or corrected successfully. Please check the address fields carefully and press [Save] if everything is correct.";
    if (message_number < 10) return message[message_number];
    else return 'unknown Statuscode: ' + message_number;
  },

  error_messages_gb: {
    status491: 'AS ConvertBox Service not available. Please check the name fields carefully and press [OK and next] if everything is correct.',
    status492: "AS ConvertBox Service doesn't answer in a proper manner. Please check the name fields carefully and press [OK and next] if everything is correct.",
    mandatory: "is mandatory",
    hnr_missing: "Housenumber missing",
    hnr_not_ok: "Housenummer doesn't fit (to this ZIP)",
    hnr_not_numeric: "just digits allowed",
  },

  field_titles_gb: {
    salutation: "Salut.*",
    title: "Title",
    firstname: "Firstname*",
    lastname: "Surname*",
    zip: "ZIP*",
    city: "City*",
    street: "Street*",
    hnr: "HNo",
    hnradd: "Add."
  },

  salutations_gb: {
    mr: "Mr.",
    mrs: "Mrs"
  },

  buttons_gb: {
    check_name: {
      btn: " Verify",
      hint: "check, correct and structure the name elements"
    },
    ok_name: {
      btn: " OK and Next",
      hint: "get the name and go on to enter the address",
    },
    check_address: {
      btn: " Postal Check",
      hint: "check, correct and structure the postal elements"
    },
    myentry: {
      btn: " My Entry",
      hint: "get back my entry (it was correct)",
    },
    submit: {
      btn: " Save",
      hint: "save name and address and show the summary"
    },
    clear: {
      btn: " End and return",
      hint: "clear mask and back to start page"
    }
  },

  various_text_gb: {
    head1: "Address-Validation",
    head2: "Save and correct input of address data",
    head3: "powered by AS Address Solutions (c) 2017",
    head_name_box: "Person/Name",
    head_address_box: "Address",
    head_result_box: "Summary",
    success_message: "We have received your address data as following",
    address_collapse_disabled: "Please insert name first. After that you are able to enter the postal address.",
    result_collapse_disabled: "Summary will be shown automatically when address data has been saved.",
  },


  // France / french
  get_conversion_message_fr: function(message_number) {
    var message = [];
    message[0] = "Erreur inattendue. S'il vous plaît essayer de vérifier à nouveau.";
    message[1] = "Nom validé avec succès. Cliquez sur [Sauver] pour passer au masque finale.";
    message[2] = "Nom validé avec succès, mais on a fait quelques corrections légèrement. S'il vous plaît vérifier le résultat et cliquez sur [Sauver].";
    message[3] = "Éléments de nom ont été déplacés ou corrigés. S'il vous plaît vérifier le résultat et cliquez sur [Sauver].";
    message[4] = "Votre entrée est impossible de valider ou corriger avec succès. S'il vous plaît vérifier si tout est correct et cliquez sur [Sauver].";
    message[5] = "Erreur inattendue. S'il vous plaît essayer de vérifier à nouveau.";
    message[6] = "Nous avons détecté un groupe de personnes. Nous acceptons une seule personne. S'il vous plaît vérifier si tout est correct et cliquez sur [Sauver].";
    message[7] = "Nous avons trouvé un nom de personnes, mais le résultat est pas sûr. S'il vous plaît vérifier si tout est correct et cliquez sur [Sauver].";
    message[8] = "Nous avons trouvé des éléments de nom inconnu ou le nom ne peut pas être bien structuré. S'il vous plaît vérifier si tout est correct et cliquez sur [Sauver].";
    message[9] = "Nous avons trouvé une allusion à un nom de société. Nous acceptons seulement une seule personne. S'il vous plaît vérifier si tout est correct et cliquez sur [Sauver].";
    if (message_number < 10) return message[message_number];
    else return 'Statuscode inconnu: ' + message_number;
  },

  get_postbox_message_fr: function(message_number) {
    var message = [];
    message[0] = "L'adresse est introuvable dans notre database. Vérifiez votre entrée et cliquez sur [Sauver] si tout est correct.";
    message[1] = "L'adresse validé avec succès. Cliquez sur [Sauver].";
    message[2] = "L'adresse validé avec succès mais les corrections standard légers ont été apportées. Cliquez sur [Sauver] si tout est correct.";
    message[3] = "L'adresse validé avec succès mais des corrections ont été effectuées. Cliquez sur [Sauver] si tout est correct.";
    message[4] = "Vos données ne peuvent pas être clairement validées ou corrigées. Vérifiez votre entrée et cliquez sur [Sauver] si tout est correct ";
    message[5] = "Vos données ne peuvent pas être clairement validées ou corrigées. Vérifiez votre entrée et cliquez sur [Sauver] si tout est correct ";
    message[6] = "Vos données ne peuvent pas être clairement validées ou corrigées. Vérifiez votre entrée et cliquez sur [Sauver] si tout est correct ";
    message[7] = "Vos données ne peuvent pas être clairement validées ou corrigées. Vérifiez votre entrée et cliquez sur [Sauver] si tout est correct ";
    message[8] = "Vos données ne peuvent pas être clairement validées ou corrigées. Vérifiez votre entrée et cliquez sur [Sauver] si tout est correct ";
    message[9] = "Vos données ne peuvent pas être clairement validées ou corrigées. Vérifiez votre entrée et cliquez sur [Sauver] si tout est correct ";
    if (message_number < 10) return message[message_number];
    else return 'Statuscode inconnu: ' + message_number;
  },

  error_messages_fr: {
    status491: "AS ConvertBox Service non disponible. S'il vous plaît vérifier soins entièrement et cliquez sur [OK et continuez] si tout est correct.",
    status492: "AS ConvertBox Service ne répond pas de manière appropriée. S'il vous plaît vérifier et cliquez sur [OK et continuez] si tout est correct",
    mandatory: "est obligatoire",
    hnr_missing: "Numéro de maison manquante",
    hnr_not_ok: "Numéro de la maison invalide (dans ce postal)",
    hnr_not_numeric: "seulment chiffres",
  },

  field_titles_fr: {
    salutation: "Salut.*",
    title: "Titre",
    firstname: "Prénom*",
    lastname: "Nom*",
    zip: "Code postal*",
    city: "Ville*",
    street: "Rue*",
    hnr: "Numéro",
    hnradd: "Annexe"
  },

  salutations_fr: {
    mr: "M.",
    mrs: "Mme"
  },

  buttons_fr: {
    check_name: {
      btn: " Vérifier",
      hint: "verifier, corriger et structurer des parties du nom"
    },
    ok_name: {
      btn: " OK et Continuez",
      hint: "Prenez le nom et continuer à entrer l'adresse",
    },
    check_address: {
      btn: " Vérifier",
      hint: "verifier, corriger et structurer des parties de l'adresse postale"
    },
    myentry: {
      btn: " Mon entrée",
      hint: "Obtenir mon entrée en arrière",
    },
    submit: {
      btn: " Sauver",
      hint: "sauvegarder nom et l'adresse postale et voir les données"
    },
    clear: {
      btn: " Terminer",
      hint: "vide masque et retour"
    }
  },

  various_text_fr: {
    head1: "Validation d'Adresse",
    head2: "Détection sûre et fiable des données d'adresse",
    head3: "powered by AS Address Solutions (c) 2017",
    head_name_box: "Personne/Nom",
    head_address_box: "Adresse",
    head_result_box: "Résumé",
    success_message: "Nous avons reçu vos données d'adresse comme suit",
    address_collapse_disabled: "Tout d'abord s'il vous plaît entrer votre nom et vérifier. Ensuite, vous pouvez saisir l'adresse.",
    result_collapse_disabled: "Résumé apparaît lorsque les données ont été enregistrées.",
  },


  hints: {
    de: [
      '(generiert)',
      '(standardisiert)',
      '(korrigiert)',
      '(gefunden)',
      '(in anderes Feld verschoben)',
    ],
    gb: [
      '(generated)',
      '(standardized)',
      '(corrected)',
      '(found)',
      '(moved to other field)',
    ],
    fr: [
      '(généré)',
      '(normalisé)',
      '(corrigé)',
      '(trouvé)',
      '(déplacé vers un autre champ)',
    ],
  },

};
