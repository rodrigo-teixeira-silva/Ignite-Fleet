
const LICENSE_PLATE_REGEX = '[A-Z]{3}[0-9][0-9A-Z][0-9]{2}';

export function licencePlateValidate(lincensePlate: string){
    const license = lincensePlate.toUpperCase();

    const isValid = license.match( LICENSE_PLATE_REGEX );

    return isValid;
}

