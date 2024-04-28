/**
 * Returns JSON stringfy function.
 *
 * @param indention - the length of the padding
 */
export const toJSON =
  (indention?: number | string) =>
  /**
   * Returns a padded json-string for a given json-object.
   *
   * @param obj - the object
   */
  (obj: object) =>
    JSON.stringify(obj, null, indention);
