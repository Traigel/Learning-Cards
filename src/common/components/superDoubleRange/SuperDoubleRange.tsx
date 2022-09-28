import {Box} from '@mui/material'
import Slider from '@mui/material/Slider'
import React from 'react'
import styles from './SuperDoubleRange.module.css'

type SuperDoubleRangePropsType = {
    onChangeRange: (value: [number, number]) => void
    value: [number, number]
    minMax: [number, number]
    width?: number
    className?: string
}

export const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {
        onChangeRange,
        value,
        width,
        className,
        minMax
    }
) => {

    const handleChange = (event: Event, newValue: number | number[]) => {
        onChangeRange && onChangeRange(newValue as [number, number]);
    };

    return (
        <div className={styles.range}>
            <Box width={width ? width : 200}>
                <Slider
                    getAriaLabel={() => 'Range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    className={className}
                    min={minMax[0]}
                    max={minMax[1]}
                />
            </Box>
        </div>

    )
}
