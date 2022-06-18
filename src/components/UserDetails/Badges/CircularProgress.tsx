export interface CircularProgressProps {
  progress: number
}

export const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  }
}

export const getArcAttributes = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) => {
  const start = polarToCartesian(x, y, radius, endAngle)
  const end = polarToCartesian(x, y, radius, startAngle)
  const arcSweep = endAngle - startAngle <= 180 ? '0' : '1'

  const arcSting = [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    arcSweep,
    0,
    end.x,
    end.y,
  ].join(' ')

  return arcSting
}

const CircularProgress = ({ progress }: CircularProgressProps) => {
  const endAngle = progress * 3.6

  return (
    <>
      <svg viewBox="0 0 100 100">
        <path
          id="arc1"
          fill="none"
          stroke="#00BCD4"
          strokeWidth="10"
          d={getArcAttributes(50, 50, 30, 0, endAngle - 0.0001)}
        />
      </svg>
    </>
  )
}

export default CircularProgress
