import { useSphere } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { Vector3 } from 'three'
import { useKeyboard } from '../hooks/useKeyboard.js'

const CHARACTER_SPEED = 5
const CHARACTER_JUMP_FORCE = 4


export const Player1 = () => {
    const {
        moveBackward,
        moveForward,
        moveLeft,
        moveRight,
        jump
    } = useKeyboard()

    const { camera } = useThree()
    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: "Dynamic",
        position: [0, 0.5, 0]
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

        const direction = new Vector3()

        const frontVector = new Vector3(
            0,
            0,
            (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
          )
      
          const sideVector = new Vector3(
            (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
            0,
            0
          )

        direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(CHARACTER_SPEED)
        .applyEuler(camera.rotation)

        api.velocity.set(
            direction.x,
            velPlayer.current[1],
            direction.z
        )
            if (jump && Math.abs(velPlayer.current[1]) < 0.05) {
                api.velocity.set(
                    velPlayer.current[0],
                    CHARACTER_JUMP_FORCE,
                    velPlayer.current[2]
                )
            }
    })

    return (
        <mesh ref={ref} />
          
    )
}