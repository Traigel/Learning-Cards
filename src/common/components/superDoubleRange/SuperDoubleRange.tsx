import {Box} from '@mui/material'
import Slider from '@mui/material/Slider'
import React from 'react'

type SuperDoubleRangePropsType = {
    onChangeRange: (value: [number, number]) => void
    value: [number, number]
    width?: number
    className?: string
}

export const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {
        onChangeRange,
        value,
        width,
        className
    }
) => {

    const handleChange = (event: Event, newValue: number | number[]) => {
        onChangeRange && onChangeRange(newValue as [number, number]);
    };

    return (
        <div style={{display: 'inline-block'}}>
            <Box width={width ? width : 200}>
                <Slider
                    getAriaLabel={() => 'Range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    className={className}
                />
            </Box>
        </div>

    )
}
