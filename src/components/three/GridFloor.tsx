import { Grid } from '@react-three/drei'

export type GridFloorProps = {
  position?: [number, number, number]
}

const GridFloor = ({ position = [0, -2, 0] }: GridFloorProps) => (
  <Grid
    position={position}
    args={[40, 40]}
    cellColor="#63f3ff"
    cellSize={0.9}
    cellThickness={0.55}
    fadeDistance={30}
    fadeStrength={1.7}
    followCamera={false}
    infiniteGrid
    sectionColor="#ff4fd8"
    sectionSize={4}
    sectionThickness={1.3}
  />
)

export default GridFloor
