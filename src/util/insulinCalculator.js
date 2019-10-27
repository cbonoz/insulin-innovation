const MEDICINE_DEXAMETHASONE = "DEXAMETHASONE";
const MEDICINE_METHYLPREDNISOLONE = "METHYLPREDNISOLONE";
const MEDICINE_PREDNISONE = "PREDNISONE";
// let insulin = 0;
const kg = 45;
const medicationMultiplier = 1.2;

const insulinResistantEthnicity = ["asian_american", "african_american", "native_american", "hispanic/latino"];
const medicationInsulin = (carbs, insulinToCarb, insulinSensitivity = 50, premealBloodSugar, actualBloodSugar, medication, ethnicity) => {
    if (
        medication.includes(MEDICINE_DEXAMETHASONE) ||
        medication.includes(MEDICINE_METHYLPREDNISOLONE) ||
        medication.includes(MEDICINE_PREDNISONE)
    ) {
        const insulinCalculatedFromCarbs = Math.round(carbs * insulinToCarb);
        const insulinCalculatedFromGlucose = (actualBloodSugar - premealBloodSugar) / insulinSensitivity;


        setTimeout(() => {
            if (insulinResistantEthnicity.includes(ethnicity)) {
                console.log("Make sure the check determine if they have higher insulin resistance");
            }
        }, 1000);

        return insulinCalculatedFromCarbs + insulinCalculatedFromGlucose + medicationMultiplier * kg;
    }
}

export default { medicationInsulin };
