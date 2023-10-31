import { useSphere } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { Vector3 } from 'three'

export { useThree } from '@react-three/fiber'

export const Player = () => {
    const { camera } = useThree()
    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: "Dynamic",
        position: [0, 1, 0]
    }))

    const posPlayer = useRef([0, 0, 0])
    useEffect(() => {
        api.position.subscribe(p => {
            posPlayer.current = p
        })
    }, [api.position])

    const velPlayer = useRef([0, 0, 0])
    useEffect(() => {
        api.velocity.subscribe(p => {
            velPlayer.current = p
        })
    }, [api.velocity])

 
    useFrame(() => {
        camera.position.copy(
            new Vector3(
                posPlayer.current[0],
                posPlayer.current[1],
                posPlayer.current[2]
            )
        )
        api.velocity.set(0, 0, -1)
    })

    return (
        <mesh ref={ref} />
          
    )
}