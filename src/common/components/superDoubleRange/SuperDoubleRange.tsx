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
    onChangeCommitted?: (value: [number, number]) => void
}

export const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {
        onChangeRange,
        onChangeCommitted,
        value,
        className,
        minMax
    }
) => {

    const handleChange = (event: Event, newValue: number | number[]) => {
        onChangeRange && onChangeRange(newValue as [number, number]);
    };

    const onChangeCommittedHandler = (event: React.SyntheticEvent | Event, value: number | number[]) => {
        onChangeCommitted && onChangeCommitted(value as [number, number])
    }

    return (
        <div className={styles.range}>
            <Box>
                <Slider
                    getAriaLabel={() => 'Range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    className={className}
                    min={minMax[0]}
                    max={minMax[1]}
                    onChangeCommitted={onChangeCommittedHandler}
                />
            </Box>
        </div>

    )
}
