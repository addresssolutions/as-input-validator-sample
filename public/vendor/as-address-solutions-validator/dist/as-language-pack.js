module.exports = {
  // Germany
  conversion_messages_de: {
    status0: 'Unbekannter Fehler. Bitte Prüfen Sie erneut die Eingabe',
    status1: 'Der Name konnte validiert werden. Mit [OK und weiter] gelangen Sie zur Eingabe der Anschrift.',
    status2: 'Der Name ist valide, es wurden aber leichte Normkorrekturen durchgeführt. Überprüfen Sie Ihre Eingabe und betätigen Sie [OK und weiter] wenn alles korrekt ist.',
    status3: 'Es wurden Namenselemente verschoben bzw. Korrekturen durchgeführt. Überprüfen Sie das Ergebnis und betätigen Sie [OK und weiter] wenn alles korrekt ist.',
    status4: 'Ihre Angaben konnten nicht validiert und korrigiert werden. Überprüfen Sie Ihre Eingabe und betätigen Sie [OK und weiter] wenn alles korrekt ist.',
    status5: 'Unbekannter Fehler. Bitte Prüfen Sie erneut die Eingabe',
    status6: 'Wir haben eine Personengemeinschaft erkannt. Es kann nur eine Einzelperson registriert werden. Überprüfen Sie Ihre Eingabe und betätigen Sie [OK und weiter] wenn alles korrekt ist.',
    status7: 'Wir haben einen Personennamen erkannt, allerdings ist das Ergebnis unsicher. Überprüfen Sie Ihre Eingabe und betätigen Sie [OK und weiter] wenn alles korrekt ist.',
    status8: 'Wir haben unbekannte Namenselemente gefunden oder der Name ist nicht strukturierbar. Überprüfen Sie Ihre Eingabe und betätigen Sie [OK und weiter] wenn alles korrekt ist.',
    status9: 'Wir haben einen Hinweis auf einen Firmennamen gefunden. Es kann nur eine natürliche Einzelperson registriert werden. Überprüfen Sie Ihre Eingabe und betätigen Sie [OK und weiter] wenn alles korrekt ist.',
  },

  error_messages_de: {
    status901: 'AS ConvertBox Service nicht verfügbar. Überprüfen Sie Ihre Eingabe sorgfältig und betätigen Sie [OK und weiter] wenn alles korrekt ist.',
    status902: 'AS ConvertBox Service antwortet nicht korrekt. Überprüfen Sie Ihre Eingabe sorgfältig und betätigen Sie [OK und weiter] wenn alles korrekt ist.',
  },

  field_titles_de: {
    salutation: "Anrede*",
    title: "Titel",
    firstname: "Vorname*",
    lastname: "Nachname*"
  },

  salutations_de: {
    mr: "Herr",
    mrs: "Frau"
  },

  buttons_de: {
    check: " Prüfen",
    ok: " OK und weiter",
    myentry: " Meine Eingabe",
  },


  // Great Britain / Englisch
  conversion_messages_gb: {
    status0: 'Unexpected Error. Please try to check again.',
    status1: 'Name was validated successfully. Press [OK and next] to jump to the mask for the postal address.',
    status2: 'Name was valid, but there have been made some slightly corrections. Please check the result and press [OK and next] if everything is correct.',
    status3: 'Name elements have been moved or corrected. Please check the result and press [OK and next] if everything is correct.',
    status4: 'Your entry could not be validated or corrected successfully. Please check the name fields and press [OK and next] if everything is correct.',
    status5: 'Unexpected Error. Please try to check again.',
    status6: 'We have detected a group of persons. We just accept a single person. Please check the name fields and press [OK and next] if everything is correct.',
    status7: 'We have found a persons name, but the result is not sure. Please check the name fields and press [OK and next] if everything is correct.',
    status8: 'We have found unknown name elements or the name cannot be well structured. Please check the name fields and press [OK and next] if everything is correct.',
    status9: 'We have fouud a hint to a company name. We just accept a single person. Please check the name fields and press [OK and next] if everything is correct.',
  },

  error_messages_gb: {
    status901: 'AS ConvertBox Service not available. Please check the name fields carefully and press [OK and next] if everything is correct.',
    status902: "AS ConvertBox Service doesn't answer in a proper manner. Please check the name fields carefully and press [OK and next] if everything is correct.",
  },

  field_titles_gb: {
    salutation: "Salut.*",
    title: "Title",
    firstname: "Firstname*",
    lastname: "Surname*"
  },

  salutations_gb: {
    mr: "Mr.",
    mrs: "Mrs"
  },

  buttons_gb: {
      check: " Check",
      ok: " OK and next",
      myentry: " My Entry",
  },

  hints: {
    de: [
    '(generiert)',
    '(standardisiert)',
    '(korrigiert)',
    '(in anderem Feld gefunden)',
    '(in anderes Feld verschoben)'
  ],
    gb: [
    '(generated)',
    '(standardized)',
    '(corrected)',
    '(found in other field)',
    '(moved to other field)',
    ]
  },

};
