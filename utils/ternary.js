export default function ternary (
  condition,
  trueOp,
  falseOp = null
) {
  return condition ? trueOp : falseOp
}
