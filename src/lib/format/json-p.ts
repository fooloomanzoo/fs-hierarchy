/**
 * Returns a padded json-string for a given json-object.
 *
 * @param obj - the object
 */
export const toJSONP = (obj: object) => JSON.stringify(obj, null, '\t');
