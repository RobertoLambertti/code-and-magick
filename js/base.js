var fireballSize = 22;
var wizardSpeed = 3;
var wizardWidth = 70;

function getFireballSpeed (isFairWind) {
  return (isFairWind) ? 5 : 2;
}

function getWizardHeight () {
  return 1.337 * wizardWidth;
}

function getWizardX (windowWidth) {
  return windowWidth / 2 - wizardWidth / 2;
}

function getWizardY (windowHeight) {
 return windowHeight / 3;
}
