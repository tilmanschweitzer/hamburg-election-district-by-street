

export function parseStreetData(content, options) {
  const entries = [];

  content.trim().split(options.lineDelimiter).forEach(line => {
    const columns = line.split(options.columnDelimiter);

    const entry = {};
    columns.forEach((column, index) => {
      const fieldName = options.fieldNames[index];
      const value = parseField(options.fieldParsers, column, fieldName);

      checkConstraints(options.constraints, value, fieldName)

      entry[fieldName] = value;
    })

    entries.push(entry);
  });

  return entries;
}



function parseField(fieldParsers, value, fieldName) {
  if (!fieldParsers[fieldName]) {
    return value;
  }
  return fieldParsers[fieldName](value)
}

function checkConstraints(constraints, value, fieldName) {
  const constraint = constraints[fieldName];
  if (!constraint) {
    return;
  }
  if (!constraint(value)) {
    throw new Error(`Constraint for '${fieldName}' was violated by value '${value}'`);
  }
}
