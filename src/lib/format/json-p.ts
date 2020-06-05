/**
 * Returns a padded json-string for a given json-object.
 *
 * @param obj - the object
 */
const toJSONP = (obj: object) => JSON.stringify(obj, null, 2);

export default toJSONP;
