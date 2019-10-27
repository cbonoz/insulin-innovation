const MEDICINE_DEXAMETHASONE = "DEXAMETHASONE";
const MEDICINE_METHYLPREDNISOLONE = "METHYLPREDNISOLONE";
const MEDICINE_PREDNISONE = "PREDNISONE";
// let insulin = 0;
const kg = 45;
const medicationMultiplier = 1.2;

const medicationInsulin = (insulin, medication) => {
    if (
        medication.includes(MEDICINE_DEXAMETHASONE) ||
        medication.includes(MEDICINE_METHYLPREDNISOLONE) ||
        medication.includes(MEDICINE_PREDNISONE)
    ) {
        return insulin * medicationMultiplier * kg;
    }
    return insulin;
}

export default { medicationInsulin };
