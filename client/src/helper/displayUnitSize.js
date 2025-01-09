const extractNumericAndUnit = (servingUnit) => {
  const match = servingUnit.match(/(\d+)([a-zA-Z]+)/);
  if (match) {
    const [, numericPart, unitPart] = match;
    return { numeric: parseInt(numericPart, 10), unit: unitPart };
  }
  return { numeric: null, unit: servingUnit };
};

export const displayServingSize = (item) => {
  const { numeric, unit } = extractNumericAndUnit(item.serving_unit);
  const servingSize = numeric
    ? parseInt(item.serving_size) * numeric
    : item.serving_size;
  return `${servingSize} ${unit}`;
};
