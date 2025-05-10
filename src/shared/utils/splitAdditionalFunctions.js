export default function splitAdditionalFunctions(funcString) {
  return funcString?.split(",").map((func) => func.trim()) || [];
}
